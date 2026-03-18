// src/types/api.ts

export interface Category {
    id: number;
    name: string;
    slug: string;
    iconUrl: string;
}

export interface Tag {
    id: number;
    name: string;
    slug: string;
    usageCount: number;
}

export interface MiniCourse {
    id: number;
    title: string;
    thumbnailUrl: string;
    instructorName: string;
    averageRating: number;
    totalRatings: number;
    price: number;
    discountPrice: number | null;
}

export interface Course {
    id: number;
    title: string;
    shortDescription: string;
    thumbnailUrl: string;
    price: number;
    discountPrice: number | null;
    averageRating: number;
    totalRatings: number;
    level: string;
    durationMinutes: number;
    instructorName: string;
    categoryName: string;
    tags: string[];
}

export interface SearchResponse {
    totalItems: number;
    totalPages: number;
    page: number;
    pageSize: number;
    items: Course[];
}

export interface SuggestionResponse {
    keywords: string[];
    courses: MiniCourse[];
}

export interface CourseDetail extends Course {
    totalStudents: number;
    language: string;
    createdAt: string;
    category: {
        id: number;
        name: string;
    };
    instructor: {
        id: number;
        name: string;
        bio: string;
        avatarUrl: string;
    };
}
