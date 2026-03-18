'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { FilterSidebar } from '@/components/search/FilterSidebar';
import { CourseCard } from '@/components/search/CourseCard';
import { CourseCardSkeleton } from '@/components/search/CourseCardSkeleton';
import api from '@/lib/api';
import { SearchResponse } from '@/types/api';

export default function SearchResultsContent() {
    const searchParams = useSearchParams();
    
    const [data, setData] = useState<SearchResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchResults = async () => {
            setIsLoading(true);
            setError('');
            try {
                // searchParams already works like URLSearchParams implicitly when parsing to string
                const queryStr = searchParams.toString();
                const res = await api.get<SearchResponse>(`/courses/search?${queryStr}`);
                setData(res.data);
            } catch (err: any) {
                console.error("Search failed", err);
                setError(err.message || "Failed to fetch results.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
    }, [searchParams]);

    return (
        <div className="flex flex-col md:flex-row gap-8 items-start relative">
            
            {/* Sidebar Sticky Panel */}
            <div className="w-full md:w-64 flex-shrink-0 md:sticky md:top-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-slate-800">Filters</h2>
                    </div>
                    <FilterSidebar />
                </div>
            </div>

            {/* Results Grid */}
            <div className="flex-grow min-w-0">
                <div className="mb-6 flex items-center justify-between bg-white px-5 py-3 rounded-xl border border-slate-200">
                    <p className="text-sm text-slate-600">
                        {isLoading ? (
                            <span className="animate-pulse">Searching...</span>
                        ) : data ? (
                            <>Showing <span className="font-bold text-slate-900">{data.totalItems}</span> matching courses</>
                        ) : (
                            "0 matching courses"
                        )}
                    </p>
                </div>

                {error ? (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 text-center">
                        {error}
                    </div>
                ) : isLoading ? (
                    <div className="flex flex-col gap-4">
                        {[1, 2, 3, 4].map(k => <CourseCardSkeleton key={k} />)}
                    </div>
                ) : data?.items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-xl border border-slate-200 border-dashed">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">No courses found</h3>
                        <p className="text-slate-500 max-w-sm">Try adjusting your filters, or search for a different keyword to find what you&apos;re looking for.</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {data?.items.map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}
