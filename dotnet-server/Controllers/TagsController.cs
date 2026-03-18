using dotnet_server.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace dotnet_server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TagsController : ControllerBase
{
    private readonly AppDbContext _context;

    public TagsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("trending")]
    public async Task<IActionResult> GetTrendingTags([FromQuery] int limit = 5)
    {
        var tags = await _context.Tags
            .OrderByDescending(t => t.UsageCount)
            .Take(limit)
            .Select(t => new
            {
                t.Id,
                t.Name,
                t.Slug,
                t.UsageCount
            })
            .ToListAsync();

        return Ok(tags);
    }
}
