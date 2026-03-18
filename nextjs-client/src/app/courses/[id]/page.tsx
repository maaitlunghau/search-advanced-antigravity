'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
    Star, 
    Users, 
    Globe, 
    Clock, 
    Calendar, 
    ChevronRight, 
    ArrowLeft,
    CheckCircle2,
    PlayCircle,
    Download,
    Award,
    ShieldCheck
} from 'lucide-react';
import api from '@/lib/api';
import { CourseDetail } from '@/types/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function CourseDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [course, setCourse] = useState<CourseDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await api.get<CourseDetail>(`/courses/${id}`);
                setCourse(res.data);
            } catch (error) {
                console.error("Failed to fetch course details", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCourse();
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white">
                <div className="bg-slate-900 py-16">
                    <div className="max-w-7xl mx-auto px-4">
                        <Skeleton className="h-4 w-24 bg-slate-700 mb-6" />
                        <Skeleton className="h-12 w-3/4 bg-slate-700 mb-4" />
                        <Skeleton className="h-6 w-1/2 bg-slate-700 mb-8" />
                        <div className="flex gap-4">
                            <Skeleton className="h-6 w-32 bg-slate-700" />
                            <Skeleton className="h-6 w-32 bg-slate-700" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">Course not found</h1>
                <Button onClick={() => router.back()}>Go Back</Button>
            </div>
        );
    }

    const discountPercentage = course.discountPrice 
        ? Math.round(((course.price - course.discountPrice) / course.price) * 100)
        : 0;

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header / Breadcrumb */}
            <div className="bg-slate-900 border-b border-slate-800 sticky top-20 z-40">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <button 
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>
                    <div className="flex items-center gap-4">
                        <span className="text-white font-bold hidden sm:block truncate max-w-[300px]">{course.title}</span>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Enroll Now</Button>
                    </div>
                </div>
            </div>

            {/* Hero / Banner Area */}
            <div className="bg-slate-900 text-white pt-12 pb-20">
                <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex flex-wrap items-center gap-2 text-sm text-blue-400 font-bold mb-4">
                            <span className="hover:underline cursor-pointer">{course.category.name}</span>
                            <ChevronRight className="w-3 h-3 text-slate-600" />
                            <span>Course</span>
                        </div>
                        
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                            {course.title}
                        </h1>
                        
                        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
                            {course.shortDescription}
                        </p>

                        <div className="flex flex-wrap items-center gap-6 pt-4">
                            <div className="flex items-center gap-1.5">
                                <span className="text-yellow-400 font-bold text-lg">{course.averageRating.toFixed(1)}</span>
                                <div className="flex items-center text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(course.averageRating) ? 'fill-current' : 'text-slate-600'}`} />
                                    ))}
                                </div>
                                <span className="text-slate-400 text-sm">({course.totalRatings.toLocaleString()} ratings)</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-300">
                                <Users className="w-4 h-4" />
                                <span className="text-sm font-medium">{course.totalStudents.toLocaleString()} students enrolled</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-6 pt-2">
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <Globe className="w-4 h-4 text-slate-400" />
                                <span>{course.language}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <ShieldCheck className="w-4 h-4 text-slate-400" />
                                <span>English subtitles</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <Calendar className="w-4 h-4 text-slate-400" />
                                <span>Last updated {new Date(course.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>

                        {/* Instructor mini */}
                        <div className="flex items-center gap-4 pt-6">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-slate-700">
                                <Image 
                                    src={course.instructor.avatarUrl || `https://i.pravatar.cc/150?u=${course.instructor.id}`}
                                    alt={course.instructor.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Created by</p>
                                <p className="font-bold text-blue-400 hover:underline cursor-pointer">{course.instructor.name}</p>
                            </div>
                        </div>
                    </div>

                    {/* Sticky Sidebar Card (Desktop) */}
                    <div className="hidden lg:block">
                        <div className="sticky top-24 bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
                            <div className="relative h-48 group cursor-pointer">
                                <Image 
                                    src={course.thumbnailUrl} 
                                    alt={course.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <PlayCircle className="w-16 h-16 text-white" />
                                </div>
                                <div className="absolute bottom-4 left-0 right-0 text-center">
                                    <span className="bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">Preview this course</span>
                                </div>
                            </div>
                            
                            <div className="p-8 space-y-6">
                                <div className="flex items-baseline gap-3">
                                    <span className="text-3xl font-extrabold text-slate-900">
                                        ${course.discountPrice || course.price}
                                    </span>
                                    {course.discountPrice && (
                                        <>
                                            <span className="text-lg text-slate-400 line-through">${course.price}</span>
                                            <span className="text-green-600 font-bold">{discountPercentage}% off</span>
                                        </>
                                    )}
                                </div>

                                <div className="mt-2 text-rose-600 flex items-center gap-2 text-sm font-bold">
                                    <Clock className="w-4 h-4 text-rose-500" />
                                    <span>2 days left at this price!</span>
                                </div>

                                <div className="space-y-3 pt-2">
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg font-bold">Add to cart</Button>
                                    <Button variant="outline" className="w-full h-12 font-bold text-slate-700">Buy now</Button>
                                </div>

                                <p className="text-center text-xs text-slate-500 font-medium">30-Day Money-Back Guarantee</p>

                                <div className="pt-4 space-y-4">
                                    <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">This course includes:</h4>
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-3 text-sm text-slate-600">
                                            <PlayCircle className="w-4 h-4 text-slate-400" />
                                            <span>{(course.durationMinutes / 60).toFixed(1)} hours on-demand video</span>
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-slate-600">
                                            <Download className="w-4 h-4 text-slate-400" />
                                            <span>12 downloadable resources</span>
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-slate-600">
                                            <Globe className="w-4 h-4 text-slate-400" />
                                            <span>Full lifetime access</span>
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-slate-600">
                                            <Award className="w-4 h-4 text-slate-400" />
                                            <span>Certificate of completion</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                    
                    {/* What you'll learn */}
                    <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">What you&apos;ll learn</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                "Master the fundamentals and advanced concepts",
                                "Build real-world projects from scratch",
                                "Understand industry best practices",
                                "Learn to solve complex problems efficiently",
                                "Prepare for professional certifications",
                                "Gain confidence in your skills"
                            ].map((item, i) => (
                                <div key={i} className="flex gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    <span className="text-sm text-slate-600">{item}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Description */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold text-slate-900">Description</h2>
                        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                            <p>{course.shortDescription}</p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            </p>
                            <p>
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>
                    </section>

                    {/* Instructor Info */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold text-slate-900">Instructor</h2>
                        <div className="flex flex-col sm:flex-row gap-8 items-start bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-slate-100 shadow-inner">
                                <Image 
                                    src={course.instructor.avatarUrl || `https://i.pravatar.cc/150?u=${course.instructor.id}`}
                                    alt={course.instructor.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">{course.instructor.name}</h3>
                                    <p className="text-blue-600 font-medium">Expert Educator & Industry Professional</p>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    {course.instructor.bio}
                                </p>
                                <div className="flex gap-6 pt-2">
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-slate-900">4.8</div>
                                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Rating</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-slate-900">12,500+</div>
                                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Students</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-slate-900">15</div>
                                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Courses</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Tags */}
                    <section className="space-y-4">
                         <h2 className="text-lg font-bold text-slate-900">Tags</h2>
                         <div className="flex flex-wrap gap-2">
                             {course.tags.map(tag => (
                                 <Badge key={tag} variant="secondary" className="bg-slate-200/50 hover:bg-slate-200 text-slate-600 px-4 py-1.5 transition-colors">
                                     {tag}
                                 </Badge>
                             ))}
                         </div>
                    </section>

                </div>

                {/* Right Column (Mobile bottom / spacing) */}
                <div className="lg:col-span-1">
                    {/* This would be the place for more sidebar info or related courses */}
                </div>
            </main>
        </div>
    );
}
