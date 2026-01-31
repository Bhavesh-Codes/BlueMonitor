'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Skull, Biohazard, Droplets, ArrowRight, BarChart3, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area, LineChart, Line } from 'recharts';

interface CrisisCase {
    id: string;
    title: string;
    location: string;
    tag: string;
    severity: 'Critical' | 'Biohazard' | 'Hazardous';
    description: string;
    fullDescription: string;
    impact: string;
    year: string;
    image: string;
    chartType: 'bar' | 'area' | 'line';
    chartData: any[];
    chartConfig: {
        color: string;
        label: string;
    };
}

const crisisCases: CrisisCase[] = [
    {
        id: '1',
        title: 'Indore Supply Contamination',
        location: 'Indore, India',
        tag: 'Recent Alert',
        severity: 'Critical',
        description: 'Sewage water mixing with municipal lines caused a massive health emergency.',
        fullDescription: 'In 2024, residents in multiple wards of Indore reported foul-smelling water. Investigations revealed a breach in the sewage line that contaminated the main drinking water supply. Hospitals saw a sudden spike in gastroenteritis cases.',
        impact: '2,000+ residents affected',
        year: '2024',
        image: '/images/indore-crisis.png',
        chartType: 'bar',
        chartConfig: { color: '#ef4444', label: 'Hospital Admissions' },
        chartData: [
            { name: 'Day 1', value: 30 },
            { name: 'Day 2', value: 150 },
            { name: 'Day 3', value: 450 },
            { name: 'Day 4', value: 800 },
            { name: 'Day 5', value: 600 },
        ]
    },
    {
        id: '2',
        title: 'Bellandur Lake Crisis',
        location: 'Bengaluru, India',
        tag: 'Ongoing',
        severity: 'Biohazard',
        description: 'Toxic foam spilling onto streets and water catching fire due to chemical effluents.',
        fullDescription: 'Bellandur Lake, the largest lake in Bengaluru, has become infamous for its toxic froth and fire incidents. Years of untreated sewage and industrial waste discharge have turned the lake into a biohazard zone, affecting air and water quality for miles.',
        impact: '50,000+ residents impacted',
        year: '2017-Present',
        image: '/images/bellandur-crisis.png',
        chartType: 'area',
        chartConfig: { color: '#fbbf24', label: 'Toxicity Levels (pH)' },
        chartData: [
            { name: '2016', value: 6.5 },
            { name: '2017', value: 8.2 },
            { name: '2018', value: 9.1 },
            { name: '2019', value: 8.8 },
            { name: '2020', value: 9.4 },
            { name: '2023', value: 9.8 },
        ]
    },
    {
        id: '3',
        title: 'Flint Water Crisis',
        location: 'Michigan, USA',
        tag: 'Reference Case',
        severity: 'Hazardous',
        description: 'Lead contamination exposed over 100,000 residents to dangerous health risks.',
        fullDescription: 'A cost-cutting measure led to switching the water source to the Flint River. The corrosive water leached lead from aging pipes into the drinking supply, causing irreversible brain damage in children and a legionnaires\' disease outbreak.',
        impact: '100,000+ residents exposed',
        year: '2014-2019',
        image: '/images/flint-crisis.png',
        chartType: 'line',
        chartConfig: { color: '#f97316', label: 'Lead Levels (ppb)' },
        chartData: [
            { name: '2013', value: 2 },
            { name: '2014', value: 27 },
            { name: '2015', value: 105 },
            { name: '2016', value: 40 },
            { name: '2017', value: 12 },
        ]
    },
];

const severityConfig = {
    Critical: {
        color: 'text-red-400',
        borderColor: 'border-red-500/50',
        badgeBg: 'bg-red-500/10',
        icon: AlertTriangle,
    },
    Biohazard: {
        color: 'text-amber-400',
        borderColor: 'border-amber-500/50',
        badgeBg: 'bg-amber-500/10',
        icon: Biohazard,
    },
    Hazardous: {
        color: 'text-orange-400',
        borderColor: 'border-orange-500/50',
        badgeBg: 'bg-orange-500/10',
        icon: Skull,
    },
};

export function CaseStudies() {
    const [selectedCase, setSelectedCase] = useState<CrisisCase | null>(null);

    return (
        <section className="relative bg-slate-950 py-24 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black" />
            <div className="absolute inset-0 opacity-10 bg-[url('/noise.png')]" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
                        <Activity className="w-4 h-4 text-red-400" />
                        <span className="text-sm font-medium text-red-400">Global Water Watch</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
                        The Crisis Archive
                    </h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Documenting critical failures in water management to prevent future catastrophes.
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {crisisCases.map((crisis, index) => {
                        const config = severityConfig[crisis.severity];
                        const SeverityIcon = config.icon;

                        return (
                            <motion.div
                                key={crisis.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                whileHover={{ y: -12 }}
                            >
                                <Card
                                    className="h-full bg-slate-900 border-slate-800 overflow-hidden group hover:border-slate-600 transition-colors duration-300 cursor-pointer"
                                    onClick={() => setSelectedCase(crisis)}
                                >
                                    {/* Image Area */}
                                    <div className="relative h-48 overflow-hidden">
                                        <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10" />
                                        <motion.img
                                            src={crisis.image}
                                            alt={crisis.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 left-4 z-20">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold border ${config.badgeBg} ${config.color} ${config.borderColor} backdrop-blur-md`}>
                                                <SeverityIcon className="w-3.5 h-3.5" />
                                                {crisis.severity.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <CardHeader>
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xs text-slate-500 font-mono tracking-wider">{crisis.year}</span>
                                            <span className="text-xs font-medium text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                                                {crisis.tag}
                                            </span>
                                        </div>
                                        <CardTitle className="text-xl text-slate-100 group-hover:text-blue-400 transition-colors">
                                            {crisis.title}
                                        </CardTitle>
                                        <CardDescription className="flex items-center gap-1 text-slate-500">
                                            <Droplets className="w-3.5 h-3.5" />
                                            {crisis.location}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent>
                                        <p className="text-sm text-slate-400 line-clamp-3">
                                            {crisis.description}
                                        </p>
                                    </CardContent>

                                    <CardFooter className="pt-0 mt-auto border-t border-slate-800/50 p-6">
                                        <div className="w-full flex items-center justify-between text-xs font-medium">
                                            <span className="text-red-400 flex items-center gap-1.5">
                                                <span className="relative flex h-2 w-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                                </span>
                                                Possible Impact
                                            </span>
                                            <span className="group-hover:translate-x-1 transition-transform text-slate-300 flex items-center gap-1">
                                                View Report <ArrowRight className="w-3.5 h-3.5" />
                                            </span>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Detailed Modal */}
            <Dialog open={!!selectedCase} onOpenChange={(open) => !open && setSelectedCase(null)}>
                <DialogContent className="max-w-3xl bg-slate-900 border-slate-800 p-0 overflow-hidden text-slate-200">
                    <AnimatePresence mode='wait'>
                        {selectedCase && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col md:flex-row h-full max-h-[90vh] md:max-h-[600px] overflow-y-auto"
                            >
                                {/* Left: Image & Key Stats */}
                                <div className="md:w-1/3 bg-slate-950 p-6 flex flex-col gap-6">
                                    <div className="rounded-xl overflow-hidden aspect-video md:aspect-square shadow-lg border border-slate-800">
                                        <img src={selectedCase.image} alt={selectedCase.title} className="w-full h-full object-cover" />
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Impact Radius</h4>
                                            <p className="text-lg font-mono text-red-400">{selectedCase.impact}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Timeline</h4>
                                            <p className="text-sm text-slate-300">{selectedCase.year}</p>
                                        </div>
                                        <div className="pt-4 border-t border-slate-800">
                                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border w-fit ${severityConfig[selectedCase.severity].badgeBg} ${severityConfig[selectedCase.severity].borderColor}`}>
                                                {(() => {
                                                    const Icon = severityConfig[selectedCase.severity].icon;
                                                    return <Icon className={`w-4 h-4 ${severityConfig[selectedCase.severity].color}`} />;
                                                })()}
                                                <span className={`text-sm font-bold ${severityConfig[selectedCase.severity].color}`}>{selectedCase.severity.toUpperCase()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Details & Charts */}
                                <div className="md:w-2/3 p-6 md:p-8 bg-slate-900/50">
                                    <DialogHeader className="mb-6">
                                        <DialogTitle className="text-2xl md:text-3xl font-bold text-white mb-2">
                                            {selectedCase.title}
                                        </DialogTitle>
                                        <DialogDescription className="text-base text-slate-400 leading-relaxed">
                                            {selectedCase.fullDescription}
                                        </DialogDescription>
                                    </DialogHeader>

                                    {/* Chart Section */}
                                    <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800">
                                        <div className="flex items-center gap-2 mb-4">
                                            <BarChart3 className="w-4 h-4 text-slate-400" />
                                            <h4 className="text-sm font-medium text-slate-300">Data Analysis: {selectedCase.chartConfig.label}</h4>
                                        </div>

                                        <div className="h-[200px] w-full">
                                            <ResponsiveContainer width="100%" height="100%">
                                                {selectedCase.chartType === 'bar' ? (
                                                    <BarChart data={selectedCase.chartData}>
                                                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                                                        <XAxis dataKey="name" fontSize={12} stroke="#94a3b8" />
                                                        <YAxis fontSize={12} stroke="#94a3b8" />
                                                        <Tooltip
                                                            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', color: '#f8fafc' }}
                                                            itemStyle={{ color: selectedCase.chartConfig.color }}
                                                        />
                                                        <Bar dataKey="value" fill={selectedCase.chartConfig.color} radius={[4, 4, 0, 0]} />
                                                    </BarChart>
                                                ) : selectedCase.chartType === 'area' ? (
                                                    <AreaChart data={selectedCase.chartData}>
                                                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                                                        <XAxis dataKey="name" fontSize={12} stroke="#94a3b8" />
                                                        <YAxis fontSize={12} stroke="#94a3b8" />
                                                        <Tooltip
                                                            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', color: '#f8fafc' }}
                                                            itemStyle={{ color: selectedCase.chartConfig.color }}
                                                        />
                                                        <Area type="monotone" dataKey="value" stroke={selectedCase.chartConfig.color} fill={selectedCase.chartConfig.color} fillOpacity={0.2} />
                                                    </AreaChart>
                                                ) : (
                                                    <LineChart data={selectedCase.chartData}>
                                                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                                                        <XAxis dataKey="name" fontSize={12} stroke="#94a3b8" />
                                                        <YAxis fontSize={12} stroke="#94a3b8" />
                                                        <Tooltip
                                                            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', color: '#f8fafc' }}
                                                            itemStyle={{ color: selectedCase.chartConfig.color }}
                                                        />
                                                        <Line type="monotone" dataKey="value" stroke={selectedCase.chartConfig.color} strokeWidth={2} dot={{ r: 4 }} />
                                                    </LineChart>
                                                )}
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </DialogContent>
            </Dialog>
        </section>
    );
}
