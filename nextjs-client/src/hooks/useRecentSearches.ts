import { useState, useEffect } from 'react';

const STORAGE_KEY = 'recent_searches';
const MAX_RECENT = 5;

export function useRecentSearches() {
    const [recentSearches, setRecentSearches] = useState<string[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setRecentSearches(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to parse recent searches', e);
            }
        }
    }, []);

    const addSearch = (query: string) => {
        if (!query.trim()) return;
        const q = query.trim();

        setRecentSearches(prev => {
            const filtered = prev.filter(item => item.toLowerCase() !== q.toLowerCase());
            const updated = [q, ...filtered].slice(0, MAX_RECENT);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });
    };

    const removeSearch = (query: string) => {
        setRecentSearches(prev => {
            const updated = prev.filter(item => item !== query);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });
    };

    const clearAll = () => {
        setRecentSearches([]);
        localStorage.removeItem(STORAGE_KEY);
    };

    return { recentSearches, addSearch, removeSearch, clearAll };
}
