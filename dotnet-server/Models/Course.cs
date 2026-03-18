namespace dotnet_server.Models;

public class Course
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string ShortDescription { get; set; } = string.Empty;
    public string ThumbnailUrl { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public decimal? DiscountPrice { get; set; }
    public double AverageRating { get; set; }
    public int TotalRatings { get; set; }
    public int TotalStudents { get; set; }
    public int DurationMinutes { get; set; }
    public string Level { get; set; } = string.Empty;
    public string Language { get; set; } = string.Empty;
    public bool IsFeatured { get; set; }
    public bool IsPublished { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Foreign Keys
    public int CategoryId { get; set; }
    public Category Category { get; set; } = null!;

    public int InstructorId { get; set; }
    public Instructor Instructor { get; set; } = null!;

    public ICollection<CourseTag> CourseTags { get; set; } = new List<CourseTag>();
}
