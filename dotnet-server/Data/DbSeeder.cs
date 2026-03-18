using dotnet_server.Models;
using Microsoft.EntityFrameworkCore;

namespace dotnet_server.Data;

public static class DbSeeder
{
    public static void Seed(AppDbContext context)
    {
        context.Database.EnsureCreated();

        if (context.Courses.Any())
        {
            return; // DB has been seeded
        }

        var categories = new Category[]
        {
            new Category { Name = "Data Science", Slug = "data-science", IconUrl = "/icons/data-science.png" },
            new Category { Name = "Business", Slug = "business", IconUrl = "/icons/business.png" },
            new Category { Name = "Computer Science", Slug = "computer-science", IconUrl = "/icons/computer-science.png" },
            new Category { Name = "Information Technology", Slug = "information-technology", IconUrl = "/icons/it.png" },
            new Category { Name = "Language Learning", Slug = "language-learning", IconUrl = "/icons/language.png" },
            new Category { Name = "Deep Learning", Slug = "deep-learning", IconUrl = "/icons/deep-learning.png" },
            new Category { Name = "Graphic Design", Slug = "graphic-design", IconUrl = "/icons/design.png" },
            new Category { Name = "Personal Development", Slug = "personal-development", IconUrl = "/icons/personal.png" }
        };
        context.Categories.AddRange(categories);
        context.SaveChanges();

        var instructors = new Instructor[]
        {
            new Instructor { FullName = "Andrew Ng", AvatarUrl = "https://i.pravatar.cc/150?img=11", Title = "Founder, DeepLearning.AI", Bio = "Andrew Ng is a pioneer in machine learning and online education. He was a co-founder of Coursera and Google Brain.", AverageRating = 4.9, TotalStudents = 8000000 },
            new Instructor { FullName = "Charles Severance", AvatarUrl = "https://i.pravatar.cc/150?img=12", Title = "Clinical Professor", Bio = "Charles Severance is a world-renowned educator specializing in teaching programming and technology to beginners.", AverageRating = 4.8, TotalStudents = 3500000 },
            new Instructor { FullName = "Jose Portilla", AvatarUrl = "https://i.pravatar.cc/150?img=13", Title = "Head of Data Science", Bio = "Jose has taught over 2 million students on data science and Python programming. He is known for clear explanations.", AverageRating = 4.7, TotalStudents = 2000000 },
            new Instructor { FullName = "Colt Steele", AvatarUrl = "https://i.pravatar.cc/150?img=14", Title = "Developer and Bootcamp Instructor", Bio = "Colt is a passionate developer and award-winning bootcamp instructor who has helped thousands launch tech careers.", AverageRating = 4.8, TotalStudents = 1500000 },
            new Instructor { FullName = "Dr. Angela Yu", AvatarUrl = "https://i.pravatar.cc/150?img=15", Title = "Founder, London App Brewery", Bio = "One of the top-rated instructors, known for her iOS and Web Development bootcamps. She simplifies complex logic.", AverageRating = 4.9, TotalStudents = 1200000 },
            new Instructor { FullName = "Max Schwarzmüller", AvatarUrl = "https://i.pravatar.cc/150?img=16", Title = "Professional Web Developer & Instructor", Bio = "Max specializes in modern web frameworks like React, Vue, and Angular. He has a very clear and engaging teaching style.", AverageRating = 4.8, TotalStudents = 2500000 }
        };
        context.Instructors.AddRange(instructors);
        context.SaveChanges();

        var tags = new Tag[]
        {
            new Tag { Name = "Python", Slug = "python", UsageCount = 1500 },
            new Tag { Name = "Machine Learning", Slug = "machine-learning", UsageCount = 1200 },
            new Tag { Name = "React", Slug = "react", UsageCount = 950 },
            new Tag { Name = "JavaScript", Slug = "javascript", UsageCount = 1800 },
            new Tag { Name = "Data Analysis", Slug = "data-analysis", UsageCount = 800 },
            new Tag { Name = "AI", Slug = "ai", UsageCount = 2000 },
            new Tag { Name = "Web Development", Slug = "web-development", UsageCount = 1100 },
            new Tag { Name = "NFT", Slug = "nft", UsageCount = 450 },
            new Tag { Name = "Blockchain", Slug = "blockchain", UsageCount = 700 },
            new Tag { Name = "Photoshop", Slug = "photoshop", UsageCount = 300 }
        };
        context.Tags.AddRange(tags);
        context.SaveChanges();

        var courses = new List<Course>
        {
            new Course { Title = "Machine Learning Specialization", ShortDescription = "Build machine learning models, neural networks, and decision trees.", ThumbnailUrl = "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=400&q=80", Price = 49.99m, AverageRating = 4.9, TotalRatings = 150000, TotalStudents = 500000, DurationMinutes = 6000, Level = "Beginner", Language = "English", IsFeatured = true, IsPublished = true, CategoryId = categories[0].Id, InstructorId = instructors[0].Id, CreatedAt = DateTime.UtcNow.AddDays(-30) },
            new Course { Title = "Python for Everybody", ShortDescription = "Learn to Program and Analyze Data with Python.", ThumbnailUrl = "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=400&q=80", Price = 39.99m, DiscountPrice = 19.99m, AverageRating = 4.8, TotalRatings = 200000, TotalStudents = 1000000, DurationMinutes = 4500, Level = "Beginner", Language = "English", IsFeatured = true, IsPublished = true, CategoryId = categories[2].Id, InstructorId = instructors[1].Id, CreatedAt = DateTime.UtcNow.AddDays(-60) },
            new Course { Title = "The Web Developer Bootcamp 2024", ShortDescription = "The only course you need to learn web development - HTML, CSS, JS, Node.", ThumbnailUrl = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80", Price = 89.99m, DiscountPrice = 14.99m, AverageRating = 4.7, TotalRatings = 250000, TotalStudents = 800000, DurationMinutes = 3800, Level = "Beginner", Language = "English", IsFeatured = false, IsPublished = true, CategoryId = categories[2].Id, InstructorId = instructors[3].Id, CreatedAt = DateTime.UtcNow.AddDays(-10) },
            new Course { Title = "Deep Learning Specialization", ShortDescription = "Become a deeply learning expert.", ThumbnailUrl = "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=400&q=80", Price = 59.99m, AverageRating = 4.9, TotalRatings = 120000, TotalStudents = 400000, DurationMinutes = 7200, Level = "Intermediate", Language = "English", IsFeatured = true, IsPublished = true, CategoryId = categories[0].Id, InstructorId = instructors[0].Id, CreatedAt = DateTime.UtcNow.AddDays(-90) },
            new Course { Title = "Complete React Developer in 2024", ShortDescription = "Learn React, Redux, Context API, Hooks, and Next.js.", ThumbnailUrl = "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=400&q=80", Price = 79.99m, DiscountPrice = 12.99m, AverageRating = 4.8, TotalRatings = 80000, TotalStudents = 300000, DurationMinutes = 2400, Level = "Intermediate", Language = "English", IsFeatured = false, IsPublished = true, CategoryId = categories[2].Id, InstructorId = instructors[2].Id, CreatedAt = DateTime.UtcNow.AddDays(-5) },
            
            // New 20+ courses
            new Course { Title = "AI for Everyone", ShortDescription = "Non-technical introduction to AI concepts.", ThumbnailUrl = "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=400&q=80", Price = 49.00m, AverageRating = 4.9, TotalRatings = 45000, TotalStudents = 120000, DurationMinutes = 600, Level = "Beginner", Language = "English", IsFeatured = true, IsPublished = true, CategoryId = categories[0].Id, InstructorId = instructors[0].Id },
            new Course { Title = "Successful Negotiation", ShortDescription = "Essential strategies and skills from Michigan.", ThumbnailUrl = "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=400&q=80", Price = 55.00m, AverageRating = 4.8, TotalRatings = 32000, TotalStudents = 95000, DurationMinutes = 800, Level = "Beginner", Language = "English", IsFeatured = false, IsPublished = true, CategoryId = categories[1].Id, InstructorId = instructors[1].Id },
            new Course { Title = "English for Business and Entrepreneurship", ShortDescription = "English language skills for modern workplace.", ThumbnailUrl = "https://images.unsplash.com/photo-1454165833767-131e6d3023e3?auto=format&fit=crop&w=400&q=80", Price = 0.00m, AverageRating = 4.8, TotalRatings = 15000, TotalStudents = 60000, DurationMinutes = 1200, Level = "Beginner", Language = "English", IsFeatured = false, IsPublished = true, CategoryId = categories[4].Id, InstructorId = instructors[2].Id },
            new Course { Title = "Financial Markets", ShortDescription = "Economics and finance theory at Yale.", ThumbnailUrl = "https://images.unsplash.com/photo-1611974714024-462be026636d?auto=format&fit=crop&w=400&q=80", Price = 49.00m, AverageRating = 4.9, TotalRatings = 28000, TotalStudents = 110000, DurationMinutes = 1500, Level = "Beginner", Language = "English", IsFeatured = true, IsPublished = true, CategoryId = categories[1].Id, InstructorId = instructors[0].Id },
            new Course { Title = "Foundations of UX Design", ShortDescription = "Master the design process by Google.", ThumbnailUrl = "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&w=400&q=80", Price = 39.00m, AverageRating = 4.8, TotalRatings = 55000, TotalStudents = 180000, DurationMinutes = 1100, Level = "Beginner", Language = "English", IsFeatured = true, IsPublished = true, CategoryId = categories[6].Id, InstructorId = instructors[4].Id },
            new Course { Title = "Introduction to Data Science", ShortDescription = "Skills to manage projects and datasets.", ThumbnailUrl = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80", Price = 45.00m, DiscountPrice = 25.00m, AverageRating = 4.7, TotalRatings = 21000, TotalStudents = 78000, DurationMinutes = 1800, Level = "Beginner", Language = "English", IsFeatured = false, IsPublished = true, CategoryId = categories[0].Id, InstructorId = instructors[2].Id },
            new Course { Title = "Digital Marketing Specialization", ShortDescription = "SEO, Social Media and Analytics overview.", ThumbnailUrl = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80", Price = 59.00m, AverageRating = 4.6, TotalRatings = 38000, TotalStudents = 92000, DurationMinutes = 3200, Level = "Intermediate", Language = "English", IsFeatured = true, IsPublished = true, CategoryId = categories[1].Id, InstructorId = instructors[5].Id },
            new Course { Title = "The Science of Well-Being", ShortDescription = "Yale's most popular course on happiness.", ThumbnailUrl = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80", Price = 0.00m, AverageRating = 4.9, TotalRatings = 105000, TotalStudents = 320000, DurationMinutes = 2200, Level = "Beginner", Language = "English", IsFeatured = true, IsPublished = true, CategoryId = categories[7].Id, InstructorId = instructors[1].Id },
            new Course { Title = "Bitcoin and Cryptocurrency Technologies", ShortDescription = "Blockchain architecture from Princeton.", ThumbnailUrl = "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=400&q=80", Price = 29.00m, AverageRating = 4.8, TotalRatings = 12000, TotalStudents = 45000, DurationMinutes = 900, Level = "Intermediate", Language = "English", IsFeatured = false, IsPublished = true, CategoryId = categories[2].Id, InstructorId = instructors[3].Id },
            new Course { Title = "Algorithms Part I", ShortDescription = "Data structures and algorithm design.", ThumbnailUrl = "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=400&q=80", Price = 69.00m, AverageRating = 4.9, TotalRatings = 65000, TotalStudents = 145000, DurationMinutes = 4000, Level = "Intermediate", Language = "English", IsFeatured = true, IsPublished = true, CategoryId = categories[2].Id, InstructorId = instructors[4].Id },
            new Course { Title = "Graphic Design Foundations", ShortDescription = "Colors, shapes and modern design theory.", ThumbnailUrl = "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=400&q=80", Price = 35.00m, AverageRating = 4.7, TotalRatings = 8500, TotalStudents = 25000, DurationMinutes = 650, Level = "Beginner", Language = "English", IsFeatured = false, IsPublished = true, CategoryId = categories[6].Id, InstructorId = instructors[4].Id },
            new Course { Title = "Learning How to Learn", ShortDescription = "Powerful mental tools for difficult subjects.", ThumbnailUrl = "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=80", Price = 0.00m, AverageRating = 4.9, TotalRatings = 180000, TotalStudents = 650000, DurationMinutes = 1400, Level = "Beginner", Language = "English", IsFeatured = true, IsPublished = true, CategoryId = categories[7].Id, InstructorId = instructors[1].Id },
            new Course { Title = "Java Programming: Solving Problems", ShortDescription = "Fundamentals of Java and software design.", ThumbnailUrl = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80", Price = 42.00m, AverageRating = 4.6, TotalRatings = 19000, TotalStudents = 58000, DurationMinutes = 2400, Level = "Beginner", Language = "English", IsFeatured = false, IsPublished = true, CategoryId = categories[2].Id, InstructorId = instructors[5].Id },
            new Course { Title = "Natural Language Processing", ShortDescription = "Modern NLP using deep learning methods.", ThumbnailUrl = "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=400&q=80", Price = 85.00m, DiscountPrice = 45.00m, AverageRating = 4.9, TotalRatings = 9200, TotalStudents = 35000, DurationMinutes = 3500, Level = "Advanced", Language = "English", IsFeatured = true, IsPublished = true, CategoryId = categories[5].Id, InstructorId = instructors[0].Id },
            new Course { Title = "Project Management Foundations", ShortDescription = "Initiate and track successful projects.", ThumbnailUrl = "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80", Price = 59.00m, AverageRating = 4.7, TotalRatings = 18500, TotalStudents = 62000, DurationMinutes = 1100, Level = "Beginner", Language = "English", IsFeatured = false, IsPublished = true, CategoryId = categories[3].Id, InstructorId = instructors[4].Id },
            new Course { Title = "Cloud Computing Specialization", ShortDescription = "Architecture for large scale cloud systems.", ThumbnailUrl = "https://images.unsplash.com/photo-1510511459019-5dee995ad3ff?auto=format&fit=crop&w=400&q=80", Price = 99.00m, AverageRating = 4.8, TotalRatings = 11000, TotalStudents = 42000, DurationMinutes = 4800, Level = "Intermediate", Language = "English", IsFeatured = true, IsPublished = true, CategoryId = categories[3].Id, InstructorId = instructors[5].Id },
            new Course { Title = "Data Visualization with Tableau", ShortDescription = "Tell clear stories with visual data.", ThumbnailUrl = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80", Price = 45.00m, AverageRating = 4.8, TotalRatings = 7200, TotalStudents = 28000, DurationMinutes = 1200, Level = "Intermediate", Language = "English", IsFeatured = false, IsPublished = true, CategoryId = categories[0].Id, InstructorId = instructors[2].Id },
            new Course { Title = "Web Design for Everybody", ShortDescription = "Responsive design and front-end essentials.", ThumbnailUrl = "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=400&q=80", Price = 39.00m, AverageRating = 4.7, TotalRatings = 24000, TotalStudents = 89000, DurationMinutes = 1800, Level = "Beginner", Language = "English", IsFeatured = false, IsPublished = true, CategoryId = categories[2].Id, InstructorId = instructors[1].Id },
            new Course { Title = "Introduction to Philosophy", ThumbnailUrl = "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=400&q=80", ShortDescription = "Big questions and historical perspectives.", Price = 0.00m, AverageRating = 4.8, TotalRatings = 15500, TotalStudents = 52000, DurationMinutes = 900, Level = "Beginner", Language = "English", IsFeatured = false, IsPublished = true, CategoryId = categories[7].Id, InstructorId = instructors[4].Id },
            new Course { Title = "Marketing in a Digital World", ShortDescription = "How the digital toolset impacts marketing strategy.", ThumbnailUrl = "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c1d9?auto=format&fit=crop&w=400&q=80", Price = 49.00m, AverageRating = 4.7, TotalRatings = 31000, TotalStudents = 98000, DurationMinutes = 1600, Level = "Beginner", Language = "English", IsFeatured = true, IsPublished = true, CategoryId = categories[1].Id, InstructorId = instructors[3].Id }
        };

        context.Courses.AddRange(courses);
        context.SaveChanges();

        // Assign Tags (Just a few mappings for variety)
        var courseTags = new List<CourseTag>();
        for (int i = 0; i < courses.Count; i++)
        {
            // At least one random tag for every course
            var tagIdx = i % tags.Length;
            courseTags.Add(new CourseTag { CourseId = courses[i].Id, TagId = tags[tagIdx].Id });
            
            // Second tag for even indices
            if (i % 2 == 0) {
                var tagIdx2 = (i + 3) % tags.Length;
                courseTags.Add(new CourseTag { CourseId = courses[i].Id, TagId = tags[tagIdx2].Id });
            }
        }
        context.CourseTags.AddRange(courseTags);
        context.SaveChanges();
    }
}
