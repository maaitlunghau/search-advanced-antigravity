'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Loader2 } from 'lucide-react';
import { useDebounce } from 'use-debounce';
import api from '@/lib/api';
import { Category, SuggestionResponse, Tag, MiniCourse } from '@/types/api';
import { useRecentSearches } from '@/hooks/useRecentSearches';
import { DropdownPanel } from './DropdownPanel';

interface SearchBarProps {
    initialQuery?: string;
    categories: Category[];
}

export function SearchBar({ initialQuery = '', categories }: SearchBarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const [isFocused, setIsFocused] = useState(false);
    const [query, setQuery] = useState(initialQuery);
    const [debouncedQuery] = useDebounce(query, 350);
    const [categoryId, setCategoryId] = useState<string>(searchParams.get('categoryId') || '');
    
    const [suggestions, setSuggestions] = useState<SuggestionResponse | null>(null);
    const [trendingTags, setTrendingTags] = useState<Tag[]>([]);
    const [featuredCourses, setFeaturedCourses] = useState<MiniCourse[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFeaturedLoading, setIsFeaturedLoading] = useState(false);
    
    const { recentSearches, addSearch, removeSearch, clearAll } = useRecentSearches();
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Fetch Suggestions on debounced query change
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (!debouncedQuery.trim()) {
                setSuggestions(null);
                return;
            }
            setIsLoading(true);
            try {
                const res = await api.get<SuggestionResponse>(`/courses/suggestions?q=${debouncedQuery}`);
                setSuggestions(res.data);
            } catch (error) {
                console.error("Failed to fetch suggestions", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSuggestions();
    }, [debouncedQuery]);

    // Fetch Trending Tags and Featured Courses once when focused and empty
    useEffect(() => {
        const fetchInitialData = async () => {
            if (isFocused && !query) {
                // Fetch Trending Tags if not already loaded
                if (trendingTags.length === 0) {
                    try {
                        const res = await api.get<Tag[]>('/tags/trending?limit=6');
                        setTrendingTags(res.data);
                    } catch (error) {
                        console.error("Failed to fetch trending tags", error);
                    }
                }

                // Fetch Featured Courses (updates on category change)
                setIsFeaturedLoading(true);
                try {
                    const res = await api.get<MiniCourse[]>(`/courses/featured?limit=6${categoryId ? `&categoryId=${categoryId}` : ''}`);
                    setFeaturedCourses(res.data);
                } catch (error) {
                    console.error("Failed to fetch featured courses", error);
                } finally {
                    setIsFeaturedLoading(false);
                }
            }
        };
        fetchInitialData();
    }, [isFocused, query, trendingTags.length, categoryId]);

    // Handle outside click to close dropdown
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsFocused(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (searchQuery: string) => {
        setIsFocused(false);
        addSearch(searchQuery);

        const params = new URLSearchParams();
        if (searchQuery.trim()) params.set('q', searchQuery.trim());
        if (categoryId) params.set('categoryId', categoryId);

        router.push(`/search?${params.toString()}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch(query);
        }
    };

    const handleSelectCourse = (courseId: number) => {
        setIsFocused(false);
        router.push(`/courses/${courseId}`);
    };

    return (
        <>
            {/* Global Overlay when focused */}
            {isFocused && (
                <div 
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-[40] transition-opacity duration-300"
                    onClick={() => setIsFocused(false)}
                />
            )}

            <div 
                ref={wrapperRef} 
                className={`relative w-full max-w-3xl mx-auto transition-all duration-300 z-[51] ${isFocused ? 'scale-[1.02]' : ''}`}
            >
                <div className={`flex items-center bg-white rounded-full p-1.5 shadow-lg border-2 transition-colors ${isFocused ? 'border-blue-500 shadow-blue-500/20' : 'border-transparent shadow-slate-200/50 hover:shadow-slate-300'}`}>
                    
                    {/* Category Dropdown inside Search Bar */}
                    <div className="hidden sm:block relative border-r border-slate-200">
                        <select 
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            className="appearance-none bg-transparent py-2 pl-4 pr-8 text-sm font-medium text-slate-700 outline-none cursor-pointer w-[140px] truncate"
                        >
                            <option value="">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>

                    {/* Input Field */}
                    <div className="flex-grow flex items-center px-4 relative">
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onKeyDown={handleKeyDown}
                            placeholder="What do you want to learn?"
                            className="w-full bg-transparent outline-none text-base text-slate-900 placeholder:text-slate-400"
                        />
                        
                        {/* Clear Button */}
                        {query && (
                            <button 
                                onClick={() => { setQuery(''); inputRef.current?.focus(); }}
                                className="absolute right-4 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        )}
                    </div>

                    {/* Search Action Button */}
                    <button
                        onClick={() => handleSearch(query)}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 flex items-center justify-center transition-colors focus:ring-2 ring-blue-500 ring-offset-2"
                    >
                        {isLoading && debouncedQuery !== query ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Search className="w-5 h-5" />
                        )}
                    </button>
                </div>

                {/* Premium Dropdown Panel */}
                <DropdownPanel
                    isOpen={isFocused}
                    query={query}
                    isLoading={isLoading}
                    isFeaturedLoading={isFeaturedLoading}
                    suggestions={suggestions}
                    recentSearches={recentSearches}
                    trendingTags={trendingTags}
                    featuredCourses={featuredCourses}
                    onRemoveRecent={removeSearch}
                    onClearRecent={clearAll}
                    onSelectKeyword={(q) => {
                        setQuery(q);
                        handleSearch(q);
                    }}
                    onSelectCourse={handleSelectCourse}
                />
            </div>
        </>
    );
}


