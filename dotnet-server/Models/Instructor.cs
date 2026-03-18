namespace dotnet_server.Models;

public class Instructor
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string AvatarUrl { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;
    public double AverageRating { get; set; }
    public int TotalStudents { get; set; }

    public ICollection<Course> Courses { get; set; } = new List<Course>();
}
