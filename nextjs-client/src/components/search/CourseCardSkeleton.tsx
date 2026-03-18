import { Skeleton } from "../ui/skeleton";

export function CourseCardSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 border border-slate-200 rounded-xl p-4 bg-white">
      <Skeleton className="w-full sm:w-64 h-40 rounded-lg flex-shrink-0" />
      <div className="flex flex-col flex-grow py-1">
        <Skeleton className="h-6 w-3/4 mb-3" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-5/6 mb-4" />
        <Skeleton className="h-4 w-1/4 mb-4" />
        
        <div className="mt-auto flex items-center justify-between pt-4">
          <Skeleton className="h-5 w-32" />
          <div className="flex gap-4">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}
