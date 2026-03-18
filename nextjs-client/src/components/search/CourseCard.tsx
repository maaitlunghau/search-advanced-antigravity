import Image from "next/image";
import Link from "next/link";
import { Star, Clock, BarChart } from "lucide-react";
import { Course } from "@/types/api";

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={`/courses/${course.id}`} className="block group">
      <div className="flex flex-col sm:flex-row gap-4 border border-slate-200 rounded-xl p-4 hover:shadow-xl transition-all duration-300 bg-white ring-1 ring-slate-200/50 hover:ring-blue-500/30">
        {/* Thumbnail */}
        <div className="relative w-full sm:w-64 h-40 flex-shrink-0 overflow-hidden rounded-lg">
          <Image
            src={course.thumbnailUrl || "https://via.placeholder.com/400x250"}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2">
                {course.title}
              </h2>
              <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                {course.shortDescription}
              </p>
            </div>
            <div className="text-right">
              {course.discountPrice ? (
                <>
                  <div className="text-lg font-bold text-slate-900">${course.discountPrice}</div>
                  <div className="text-sm text-slate-500 line-through">${course.price}</div>
                </>
              ) : (
                <div className="text-lg font-bold text-slate-900">${course.price}</div>
              )}
            </div>
          </div>

          <div className="mt-2 text-sm text-slate-500">
            <span className="font-medium">{course.instructorName}</span>
            <span className="mx-2">•</span>
            <span>{course.categoryName}</span>
          </div>

          {/* Rating & Meta */}
          <div className="mt-auto flex items-center justify-between pt-4">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-amber-700">
                {course.averageRating.toFixed(1)}
              </span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(course.averageRating)
                        ? "text-amber-500 fill-amber-500"
                        : "text-slate-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-slate-500 ml-1">
                ({course.totalRatings.toLocaleString()})
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{Math.floor(course.durationMinutes / 60)}h {course.durationMinutes % 60}m</span>
              </div>
              <div className="flex items-center gap-1">
                <BarChart className="w-3.5 h-3.5" />
                <span>{course.level}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
