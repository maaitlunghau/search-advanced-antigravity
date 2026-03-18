namespace dotnet_server.Models;

public class Tag
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public int UsageCount { get; set; }

    public ICollection<CourseTag> CourseTags { get; set; } = new List<CourseTag>();
}
