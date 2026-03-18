import { Suspense } from 'react';
import SearchResultsContent from './SearchResultsContent';
import { CourseCardSkeleton } from '@/components/search/CourseCardSkeleton';

export default function SearchPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-8 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-8 border-b border-slate-200 pb-4">
                    Explore Courses
                </h1>
                
                <Suspense fallback={
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="w-full md:w-64 flex-shrink-0 animate-pulse bg-slate-200 h-96 rounded-xl"></div>
                        <div className="flex-grow space-y-4">
                            {[1, 2, 3, 4].map(k => <CourseCardSkeleton key={k} />)}
                        </div>
                    </div>
                }>
                    <SearchResultsContent />
                </Suspense>
            </div>
        </div>
    );
}
