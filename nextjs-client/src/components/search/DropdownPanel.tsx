import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { Tag, MiniCourse, SuggestionResponse } from '@/types/api';
import { CourseMiniList, CourseMiniListSkeleton } from './CourseMiniList';
import { ScrollArea } from '../ui/scroll-area';
import { Badge } from '../ui/badge';

interface DropdownPanelProps {
    isOpen: boolean;
    query: string;
    isLoading: boolean;
    isFeaturedLoading: boolean;
    suggestions: SuggestionResponse | null;
    recentSearches: string[];
    trendingTags: Tag[];
    featuredCourses: MiniCourse[];
    onRemoveRecent: (q: string) => void;
    onClearRecent: () => void;
    onSelectKeyword: (q: string) => void;
    onSelectCourse: (id: number) => void;
}

export function DropdownPanel({
    isOpen,
    query,
    isLoading,
    isFeaturedLoading,
    suggestions,
    recentSearches,
    trendingTags,
    featuredCourses,
    onRemoveRecent,
    onClearRecent,
    onSelectKeyword,
    onSelectCourse
}: DropdownPanelProps) {
    if (!isOpen) return null;

    const hasQuery = query.trim().length > 0;

    return (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <ScrollArea className="max-h-[75vh]">
                <div className="p-2 flex flex-col">
                    
                    {/* Section: Keywords or Recent/Trending */}
                    <div className="flex flex-col border-b border-slate-100 last:border-0">
                        {!hasQuery ? (
                            <div className="p-3 space-y-6">
                                {/* Recent Searches */}
                                {recentSearches.length > 0 && (
                                    <div>
                                        <div className="flex items-center justify-between mb-3 px-1">
                                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Recent Searches</h3>
                                            <button 
                                                onClick={onClearRecent}
                                                className="text-xs text-blue-600 hover:underline font-medium"
                                            >
                                                Clear all
                                            </button>
                                        </div>
                                        <div className="flex flex-col">
                                            {recentSearches.map(term => (
                                                <div 
                                                    key={term} 
                                                    className="flex items-center justify-between group rounded-lg hover:bg-slate-50 px-3 py-2.5 cursor-pointer transition-colors"
                                                >
                                                    <div 
                                                        className="flex items-center gap-3 flex-grow"
                                                        onClick={() => onSelectKeyword(term)}
                                                    >
                                                        <Clock className="w-4 h-4 text-slate-400" />
                                                        <span className="text-sm text-slate-700 font-medium">{term}</span>
                                                    </div>
                                                    <button 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            onRemoveRecent(term);
                                                        }}
                                                        className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-slate-200 rounded-full transition-all"
                                                    >
                                                        <X className="w-3.5 h-3.5 text-slate-500" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Trending Searches */}
                                {trendingTags.length > 0 && (
                                    <div>
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2 px-1">
                                            <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                                            Trending Searches
                                        </h3>
                                        <div className="flex flex-wrap gap-2 px-1">
                                            {trendingTags.map(tag => (
                                                <Badge 
                                                    key={tag.id} 
                                                    variant="secondary"
                                                    className="cursor-pointer bg-slate-100/80 hover:bg-blue-600 hover:text-white transition-all duration-200 border-none px-4 py-1.5 text-xs font-semibold rounded-full"
                                                    onClick={() => onSelectKeyword(tag.name)}
                                                >
                                                    {tag.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Hot Courses (Featured) */}
                                <div className="pt-2 border-t border-slate-100">
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 px-1">Hot Courses</h3>
                                    {isFeaturedLoading ? (
                                        <div className="p-1"><CourseMiniListSkeleton /></div>
                                    ) : featuredCourses.length > 0 ? (
                                        <div className="p-1">
                                            <ScrollArea className="h-[320px] pr-3">
                                                <CourseMiniList 
                                                    courses={featuredCourses} 
                                                    onSelect={onSelectCourse} 
                                                />
                                            </ScrollArea>
                                            <button 
                                                onClick={() => onSelectKeyword('')}
                                                className="w-full mt-4 py-3 text-sm font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition-all border border-blue-100"
                                            >
                                                View all courses
                                            </button>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-slate-500 italic px-1">No featured courses at the moment.</p>
                                    )}
                                </div>
                            </div>
                        ) : (
                            /* Keyword Suggestions based on Query */
                            <div className="p-2">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 px-2 py-1">SUGGESTIONS</h3>
                                {isLoading ? (
                                    <div className="space-y-1 p-2">
                                        {[1, 2, 3].map(i => <div key={i} className="h-9 bg-slate-100 animate-pulse rounded-lg w-full"></div>)}
                                    </div>
                                ) : suggestions?.keywords.length ? (
                                    <div className="flex flex-col">
                                        {suggestions.keywords.map(kw => (
                                            <div 
                                                key={kw}
                                                onClick={() => onSelectKeyword(kw)}
                                                className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group"
                                            >
                                                <Search className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                                                <span className="text-sm text-slate-700 font-medium">{kw}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-4 text-center">
                                         <p className="text-sm text-slate-500 italic">No keywords found.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Section: Mini Course List */}
                    {hasQuery && (
                        <div className="p-2 border-t border-slate-100">
                             <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 px-2 py-1">RELATED COURSES</h3>
                            
                            {isLoading ? (
                                <div className="p-2"> <CourseMiniListSkeleton /> </div>
                            ) : suggestions && suggestions.courses.length > 0 ? (
                                <div className="p-2">
                                    <CourseMiniList 
                                        courses={suggestions.courses} 
                                        onSelect={onSelectCourse} 
                                    />
                                </div>
                            ) : (
                                <div className="p-4 text-center">
                                    <p className="text-sm text-slate-500 italic">No courses found matching &quot;{query}&quot;</p>
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </ScrollArea>
            
            {hasQuery && !isLoading && (
                <div className="bg-slate-50 border-t border-slate-100 p-3 text-center">
                    <button 
                        onClick={() => onSelectKeyword(query)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center justify-center gap-2 w-full transition-colors"
                    >
                        See all results for &quot;{query}&quot;
                        <Search className="w-3 h-3" />
                    </button>
                </div>
            )}
        </div>
    );
}
