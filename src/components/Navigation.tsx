'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LayoutGrid, Microscope, Map as MapIcon } from 'lucide-react';

const NavLink = ({
    href,
    icon: Icon,
    children,
    isActive
}: {
    href: string;
    icon: React.ElementType;
    children: React.ReactNode;
    isActive: boolean;
}) => (
    <Link
        href={href}
        className={cn(
            "flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-300 group relative",
            isActive
                ? "text-white"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
        )}
    >
        <Icon className={cn("w-4 h-4 transition-transform group-hover:scale-110", isActive && "text-blue-400")} />
        <span className="text-sm font-medium">{children}</span>

        {isActive && (
            <motion.div
                layoutId="activeNavIndicator"
                className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-500 rounded-full"
                initial={false}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
        )}
    </Link>
);

export default function Navigation() {
    const [isVisible, setIsVisible] = useState(false);
    const pathname = usePathname();
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        setIsVisible(true);
    };

    const handleMouseLeave = () => {
        closeTimeoutRef.current = setTimeout(() => {
            setIsVisible(false);
        }, 800); // 800ms delay before hiding
    };

    const routes = [
        { name: 'JalGyan', path: '/', icon: LayoutGrid },
        { name: 'JalScan', path: '/analyze', icon: Microscope },
        { name: 'JalMap', path: '/map', icon: MapIcon },
    ];

    return (
        <div
            className="fixed top-0 left-0 right-0 z-[100] flex flex-col items-center pointer-events-none"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Trigger Area - Invisible strip */}
            <div className="absolute top-0 left-0 right-0 h-6 pointer-events-auto z-[101]" />

            {/* Full Width Navigation Bar */}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ y: '-100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '-100%' }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                            mass: 0.8
                        }}
                        className="pointer-events-auto w-full bg-[#0B1121]/95 backdrop-blur-xl border-b border-blue-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
                    >
                        <nav className="container mx-auto px-6 h-20 flex items-center justify-between font-swiss">
                            {/* Logo Section */}
                            <div className="flex items-center gap-4">
                                <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-blue-500/20">
                                    <Image
                                        src="/images/logo.jpeg"
                                        alt="BlueMonitor"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="font-bold text-xl tracking-tight text-white hidden sm:block">
                                    BlueMonitor
                                </span>
                            </div>

                            {/* Links Section */}
                            <div className="flex items-center gap-6">
                                {routes.map((route) => (
                                    <NavLink
                                        key={route.path}
                                        href={route.path}
                                        icon={route.icon}
                                        isActive={pathname === route.path}
                                    >
                                        {route.name}
                                    </NavLink>
                                ))}
                            </div>

                            {/* Right Action (Optional - e.g. Profile or Clock) */}
                            <div className="w-10 h-10 rounded-full bg-blue-900/20 flex items-center justify-center text-xs font-mono text-blue-200 border border-blue-400/20 shadow-inner">
                                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse box-content border-2 border-[#0B1121]" />
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
