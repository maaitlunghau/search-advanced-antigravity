import Image from 'next/image';
import { Star } from 'lucide-react';
import { MiniCourse } from '@/types/api';
import { Skeleton } from '../ui/skeleton';

export function CourseMiniListSkeleton() {
    return (
        <div className="flex flex-col gap-3">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-4 items-center p-2 rounded-md transition-colors">
                    <Skeleton className="w-16 h-16 rounded-md flex-shrink-0" />
                    <div className="flex flex-col gap-2 flex-grow">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                    </div>
                </div>
            ))}
        </div>
    );
}

interface Props {
    courses: MiniCourse[];
    onSelect: (id: number) => void;
}

export function CourseMiniList({ courses, onSelect }: Props) {
    if (courses.length === 0) return null;

    return (
        <div className="flex flex-col gap-1">
            {courses.map(course => (
                <div
                    key={course.id}
                    onClick={() => onSelect(course.id)}
                    className="flex gap-4 items-center p-2 rounded-md hover:bg-slate-100 cursor-pointer transition-colors"
                >
                    <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                            src={course.thumbnailUrl || 'https://via.placeholder.com/150'}
                            alt={course.title}
                            fill
                            className="object-cover rounded-md"
                        />
                    </div>
                    <div className="flex flex-col">
                        <h4 className="text-sm font-semibold line-clamp-1">{course.title}</h4>
                        <span className="text-xs text-slate-500">{course.instructorName}</span>
                        <div className="flex items-center gap-1 mt-1">
                            <span className="text-xs font-medium text-amber-600">
                                {course.averageRating.toFixed(1)}
                            </span>
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            <span className="text-xs text-slate-400">
                                ({course.totalRatings.toLocaleString()})
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
