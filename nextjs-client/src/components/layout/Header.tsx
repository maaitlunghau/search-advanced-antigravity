import { Suspense } from "react";
import Link from "next/link";
import { SearchBar } from "@/components/search/SearchBar";
import { Category } from "@/types/api";

async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5073/api'}/categories`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error("Failed to fetch categories during SSR", e);
    return [];
  }
}

export default async function Header() {
  const categories = await getCategories();

  return (
    <header className="sticky top-0 z-[100] w-full bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-8">
        
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
            Coursera
          </span>
        </Link>

        {/* Search Bar Container */}
        <div className="flex-grow max-w-3xl">
          <Suspense fallback={<div className="h-12 w-full bg-slate-100 rounded-full animate-pulse"></div>}>
            <SearchBar categories={categories} />
          </Suspense>
        </div>

        {/* Nav Links */}
        <div className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600">
          <a href="#" className="hover:text-blue-600 transition-colors">Explore</a>
          <a href="#" className="hover:text-blue-600 transition-colors">For Enterprise</a>
          <div className="h-6 w-[1px] bg-slate-200"></div>
          <button className="text-blue-600 hover:text-blue-700">Log In</button>
          <button className="bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700 transition-all font-bold">
            Join for Free
          </button>
        </div>
      </div>
    </header>
  );
}
