'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getTreatmentDetails } from './treatment-content';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';

interface WaterTreatmentDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    methodName: string;
}

export default function WaterTreatmentDetailModal({
    isOpen,
    onClose,
    methodName
}: WaterTreatmentDetailModalProps) {
    const details = getTreatmentDetails(methodName);
    const VisualComponent = details.visComponent;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 50 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-card w-full max-w-5xl h-[90vh] md:h-[80vh] rounded-[2rem] shadow-2xl border border-border overflow-hidden pointer-events-auto flex flex-col md:flex-row relative">

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/10 hover:bg-black/20 text-foreground/80 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* LEFT COLUMN: Visuals (50% width) */}
                            <div className="w-full md:w-1/2 h-1/2 md:h-full bg-muted/30 p-6 flex flex-col">
                                <div className="mb-6 z-10 relative">
                                    <Badge variant="outline" className="bg-background/50 backdrop-blur text-primary border-primary/30 mb-2">
                                        Interactive Process View
                                    </Badge>
                                    <h2 className="text-3xl font-bold text-foreground leading-tight">{details.title}</h2>
                                    <p className="text-muted-foreground mt-2 line-clamp-2" title={details.shortDesc}>{details.shortDesc}</p>
                                </div>

                                <div className="flex-1 w-full relative shadow-inner rounded-2xl overflow-hidden bg-background min-h-0 border border-border/50">
                                    <VisualComponent />
                                </div>
                            </div>

                            {/* RIGHT COLUMN: Info & Stats (50% width) */}
                            <div className="w-full md:w-1/2 h-1/2 md:h-full overflow-y-auto p-6 md:p-10 bg-card">

                                {/* Stats Row */}
                                <div className="grid grid-cols-3 gap-4 mb-8">
                                    {details.stats.map((stat, idx) => (
                                        <div key={idx} className="bg-muted/30 p-4 rounded-2xl text-center border border-border/50">
                                            <div className="text-3xl font-black mb-1" style={{ color: stat.color }}>
                                                {stat.value}<span className="text-sm align-top ml-1">{stat.unit}</span>
                                            </div>
                                            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                                {stat.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Description */}
                                <div className="mb-8">
                                    <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                                        How it Works
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {details.fullDesc}
                                    </p>
                                </div>

                                {/* Pros & Cons Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                                    <div>
                                        <h4 className="font-bold text-sm text-green-600 mb-3 uppercase tracking-wider bg-green-500/10 inline-block px-2 py-1 rounded">Benefits</h4>
                                        <ul className="space-y-2">
                                            {details.benefits.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                                                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-red-500 mb-3 uppercase tracking-wider bg-red-500/10 inline-block px-2 py-1 rounded">Limitations</h4>
                                        <ul className="space-y-2">
                                            {details.drawbacks.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                                                    <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Simple Efficiency Chart */}
                                <div className="h-40 w-full mb-6">
                                    <h4 className="font-bold text-sm text-muted-foreground mb-4 uppercase tracking-wider">Performance Metrics</h4>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={details.stats} layout="vertical" margin={{ left: 40 }}>
                                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} strokeOpacity={0.2} />
                                            <XAxis type="number" hide />
                                            <YAxis type="category" dataKey="label" tick={{ fontSize: 10 }} width={40} axisLine={false} tickLine={false} />
                                            <Tooltip
                                                cursor={{ fill: 'transparent' }}
                                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                            />
                                            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                                                {details.stats.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                                <Button className="w-full rounded-xl" size="lg" onClick={onClose}>
                                    Close Details
                                </Button>

                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
