'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import Navigation from '@/components/Navigation';
import { Globe, MapPin } from 'lucide-react';

// Dynamically import the GlobalMap component to avoid SSR issues with Leaflet
const GlobalMap = dynamic(() => import('@/components/jalmap/GlobalMap'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex flex-col items-center justify-center bg-background">
            <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-primary/20 animate-pulse" />
                <div className="absolute inset-0 w-24 h-24 rounded-full border-t-4 border-primary animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Globe className="w-10 h-10 text-primary" />
                </div>
            </div>
            <p className="mt-4 text-muted-foreground font-medium">Initializing JalMap...</p>
        </div>
    ),
});

/**
 * JalMap Page - Global Intelligence Map
 * Displays all public water quality reports on an interactive world map
 */
export default function MapPage() {
    return (
        <div className="h-screen w-screen flex flex-col bg-background overflow-hidden">
            {/* Navigation Header */}
            <Navigation />

            {/* Page Header */}
            <div className="flex-shrink-0 px-6 py-4 bg-white border-b border-gray-200 shadow-sm z-10 relative">
                <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-2.5 rounded-lg bg-blue-600 shadow-sm text-white">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 leading-none">JalMap</h1>
                            <p className="text-xs font-medium text-gray-500 mt-1 uppercase tracking-wider">Global Water Intelligence</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200 hidden sm:block">
                            Click markers for analysis
                        </div>
                    </div>
                </div>
            </div>

            {/* Full-screen Map Container */}
            <div className="flex-1 relative">
                <GlobalMap />
            </div>
        </div>
    );
}
