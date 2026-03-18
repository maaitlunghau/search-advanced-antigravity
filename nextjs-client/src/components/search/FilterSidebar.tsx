'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function FilterSidebar() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value) {
                params.set(name, value);
            } else {
                params.delete(name);
            }
            params.set('page', '1'); // Reset to page 1 on filter change
            return params.toString();
        },
        [searchParams]
    );

    const updateFilter = (name: string, value: string) => {
        router.push(`/search?${createQueryString(name, value)}`);
    };

    const currentLevel = searchParams.get('level') || '';
    const currentSort = searchParams.get('sortBy') || 'rating';
    const minRating = searchParams.get('minRating') || '';

    return (
        <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
            
            {/* Sort */}
            <div>
                <h3 className="font-semibold text-slate-900 mb-3 block">Sort By</h3>
                <select 
                    value={currentSort}
                    onChange={(e) => updateFilter('sortBy', e.target.value)}
                    className="w-full border-slate-200 rounded-md text-sm cursor-pointer hover:border-blue-500 focus:ring-blue-500 py-2 px-3 bg-white"
                >
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest First</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                </select>
            </div>

            {/* Level Filter */}
            <div className="border-t border-slate-100 pt-6">
                <h3 className="font-semibold text-slate-900 mb-4 block">Level</h3>
                <div className="space-y-3">
                    {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                        <label key={level} className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="radio"
                                name="level"
                                value={level}
                                checked={currentLevel === level}
                                onChange={(e) => updateFilter('level', e.target.value)}
                                className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
                            />
                            <span className="text-sm text-slate-700 group-hover:text-slate-900">{level}</span>
                        </label>
                    ))}
                    <label className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="radio"
                                name="level"
                                value=""
                                checked={currentLevel === ''}
                                onChange={() => updateFilter('level', '')}
                                className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
                            />
                            <span className="text-sm text-slate-700 group-hover:text-slate-900">All Levels</span>
                    </label>
                </div>
            </div>

            {/* Minimum Rating Filter */}
            <div className="border-t border-slate-100 pt-6">
                <h3 className="font-semibold text-slate-900 mb-4 block">Rating</h3>
                <div className="space-y-3">
                    {[
                        { label: '4.5 & up', val: '4.5' },
                        { label: '4.0 & up', val: '4.0' },
                        { label: '3.0 & up', val: '3.0' }
                    ].map(rating => (
                        <label key={rating.val} className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="radio"
                                name="minRating"
                                value={rating.val}
                                checked={minRating === rating.val}
                                onChange={(e) => updateFilter('minRating', e.target.value)}
                                className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
                            />
                            <span className="text-sm text-slate-700 group-hover:text-slate-900">
                                {rating.label}
                            </span>
                        </label>
                    ))}
                     <label className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="radio"
                                name="minRating"
                                value=""
                                checked={minRating === ''}
                                onChange={() => updateFilter('minRating', '')}
                                className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
                            />
                            <span className="text-sm text-slate-700 group-hover:text-slate-900">Any Rating</span>
                    </label>
                </div>
            </div>

        </aside>
    );
}
