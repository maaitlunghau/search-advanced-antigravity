using dotnet_server.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace dotnet_server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CoursesController : ControllerBase
{
    private readonly AppDbContext _context;

    public CoursesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("suggestions")]
    public async Task<IActionResult> GetSuggestions([FromQuery] string q, [FromQuery] int limit = 3)
    {
        if (string.IsNullOrWhiteSpace(q))
        {
            return Ok(new { Keywords = new List<string>(), Courses = new List<object>() });
        }

        var lowerQuery = q.ToLower();

        // 1. Suggest keywords (from tags)
        var keywords = await _context.Tags
            .Where(t => t.Name.ToLower().Contains(lowerQuery))
            .OrderByDescending(t => t.UsageCount)
            .Take(5)
            .Select(t => t.Name)
            .ToListAsync();

        // 2. Suggest mini-course list
        var courses = await _context.Courses
            .Include(c => c.Instructor)
            .Where(c => c.Title.ToLower().Contains(lowerQuery) || c.ShortDescription.ToLower().Contains(lowerQuery))
            .OrderByDescending(c => c.AverageRating)
            .Take(limit)
            .Select(c => new
            {
                c.Id,
                c.Title,
                c.ThumbnailUrl,
                InstructorName = c.Instructor.FullName,
                c.AverageRating,
                c.TotalRatings,
                c.Price,
                c.DiscountPrice
            })
            .ToListAsync();

        return Ok(new { Keywords = keywords, Courses = courses });
    }

    [HttpGet("search")]
    public async Task<IActionResult> SearchCourses(
        [FromQuery] string? q,
        [FromQuery] int? categoryId,
        [FromQuery] string? level,
        [FromQuery] string? language,
        [FromQuery] decimal? minPrice,
        [FromQuery] decimal? maxPrice,
        [FromQuery] double? minRating,
        [FromQuery] string? sortBy = "rating", // rating, price_asc, price_desc, newest
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        var query = _context.Courses
            .Include(c => c.Instructor)
            .Include(c => c.Category)
            .Include(c => c.CourseTags)
                .ThenInclude(ct => ct.Tag)
            .AsQueryable();

        // Filters
        if (!string.IsNullOrWhiteSpace(q))
        {
            var lowerQ = q.ToLower();
            query = query.Where(c => 
                c.Title.ToLower().Contains(lowerQ) || 
                c.ShortDescription.ToLower().Contains(lowerQ) ||
                c.CourseTags.Any(ct => ct.Tag.Name.ToLower().Contains(lowerQ))
            );
        }

        if (categoryId.HasValue)
            query = query.Where(c => c.CategoryId == categoryId.Value);

        if (!string.IsNullOrWhiteSpace(level))
            query = query.Where(c => c.Level.ToLower() == level.ToLower());

        if (!string.IsNullOrWhiteSpace(language))
            query = query.Where(c => c.Language.ToLower() == language.ToLower());

        if (minPrice.HasValue)
            query = query.Where(c => (c.DiscountPrice ?? c.Price) >= minPrice.Value);

        if (maxPrice.HasValue)
            query = query.Where(c => (c.DiscountPrice ?? c.Price) <= maxPrice.Value);

        if (minRating.HasValue)
            query = query.Where(c => c.AverageRating >= minRating.Value);

        // Sorting
        query = sortBy?.ToLower() switch
        {
            "price_asc" => query.OrderBy(c => c.DiscountPrice ?? c.Price),
            "price_desc" => query.OrderByDescending(c => c.DiscountPrice ?? c.Price),
            "newest" => query.OrderByDescending(c => c.CreatedAt),
            _ => query.OrderByDescending(c => c.AverageRating) // default
        };

        // Pagination
        var totalItems = await query.CountAsync();
        var totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);

        var items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(c => new
            {
                c.Id,
                c.Title,
                c.ShortDescription,
                c.ThumbnailUrl,
                c.Price,
                c.DiscountPrice,
                c.AverageRating,
                c.TotalRatings,
                c.Level,
                c.DurationMinutes,
                InstructorName = c.Instructor.FullName,
                CategoryName = c.Category.Name,
                Tags = c.CourseTags.Select(ct => ct.Tag.Name).ToList()
            })
            .ToListAsync();

        return Ok(new
        {
            TotalItems = totalItems,
            TotalPages = totalPages,
            Page = page,
            PageSize = pageSize,
            Items = items
        });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCourseById(int id)
    {
        var course = await _context.Courses
            .Include(c => c.Instructor)
            .Include(c => c.Category)
            .Include(c => c.CourseTags)
                .ThenInclude(ct => ct.Tag)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (course == null) return NotFound();

        return Ok(new
        {
            course.Id,
            course.Title,
            course.ShortDescription,
            course.ThumbnailUrl,
            course.Price,
            course.DiscountPrice,
            course.AverageRating,
            course.TotalRatings,
            course.TotalStudents,
            course.Level,
            course.DurationMinutes,
            course.Language,
            course.CreatedAt,
            category = new { course.Category.Id, course.Category.Name },
            instructor = new { course.Instructor.Id, Name = course.Instructor.FullName, Bio = course.Instructor.Bio, AvatarUrl = course.Instructor.AvatarUrl },
            tags = course.CourseTags.Select(ct => ct.Tag.Name).ToList()
        });
    }

    [HttpGet("featured")]
    public async Task<IActionResult> GetFeaturedCourses([FromQuery] int? categoryId, [FromQuery] int limit = 6)
    {
        var query = _context.Courses
            .Include(c => c.Instructor)
            .AsQueryable();

        if (categoryId.HasValue)
            query = query.Where(c => c.CategoryId == categoryId.Value);

        var courses = await query
            .OrderByDescending(c => c.IsFeatured)
            .ThenByDescending(c => c.AverageRating)
            .Take(limit)
            .Select(c => new
            {
                c.Id,
                c.Title,
                c.ThumbnailUrl,
                InstructorName = c.Instructor.FullName,
                c.AverageRating,
                c.TotalRatings,
                c.Price,
                c.DiscountPrice
            })
            .ToListAsync();

        return Ok(courses);
    }
}
