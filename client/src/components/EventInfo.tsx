/**
 * EventInfo Component
 * Mobile-first hero section that fills the initial viewport
 * Displays event details and invites users to register below
 */
import React from 'react';
import lgArenaLogo from '../assets/LG-arena-logo.jpg';
import fsLogo from '../assets/Flying-skater-logo.jpg';

const EventInfo: React.FC = () => {
    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-6 overflow-hidden" id="event-info">
            {/* Hero Section - Fills mobile viewport */}
            <div className="min-h-[85vh] flex flex-col justify-between p-5 sm:p-8">

                {/* Top: Title & Organizers */}
                <div className="text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-slate-800 to-green-600 mb-2 tracking-tight" style={{ fontFamily: '"Poppins", "Segoe UI", system-ui, sans-serif' }}>
                        REPUBLIC DAY SKATETHON
                    </h1>
                    <div className="inline-flex items-center justify-center my-2">
                        <div className="bg-gradient-to-r from-green-600 via-green-500 to-green-600 px-4 py-1 border-y-2 border-yellow-400 flex items-center gap-2">
                            <span className="text-yellow-400 text-xs">⭐</span>
                            <h2 className="text-sm sm:text-base font-bold text-white tracking-widest" style={{ fontFamily: '"Poppins", "Segoe UI", system-ui, sans-serif' }}>
                                SEASON 3
                            </h2>
                            <span className="text-yellow-400 text-xs">⭐</span>
                        </div>
                    </div>

                    {/* Republic Day Theme */}
                    <div
                        className="bg-gradient-to-r from-orange-400 via-white to-green-500 p-3 mb-4"
                        style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}
                    >
                        <p className="text-slate-800 font-bold text-lg"> 1st February 2026 </p>
                    </div>

                    {/* Organizers */}
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <span className="text-slate-500 text-xs uppercase font-semibold">Organized by</span>
                        <img src={lgArenaLogo} alt="LG 87 Play Arena" className="w-20 h-20 rounded-lg shadow-sm" />
                        <img src={fsLogo} alt="Flying Skaters Academy" className="w-16 h-16 rounded-lg shadow-sm" />
                    </div>
                </div>

                {/* Middle: Event Details - Clean Professional Design */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 shadow-sm">
                    <h3 className="text-slate-800 font-bold text-sm uppercase tracking-wider text-center mb-4">Event Details</h3>

                    {/* Date & Time - Side by side */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white text-lg">📅</span>
                            </div>
                            <div className="border-l-2 border-slate-300 pl-3">
                                <p className="text-slate-500 text-xs font-medium uppercase">Date</p>
                                <p className="text-slate-900 font-semibold text-sm">1st Feb 2026</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white text-lg">⏰</span>
                            </div>
                            <div className="border-l-2 border-slate-300 pl-3">
                                <p className="text-slate-500 text-xs font-medium uppercase">Time</p>
                                <p className="text-slate-900 font-semibold text-sm">7:45 – 10:00 AM</p>
                            </div>
                        </div>
                    </div>

                    {/* Venue - Horizontal Layout */}
                    <div className="mt-4 pt-4 border-t border-slate-200">
                        <div className="flex items-center justify-center gap-3">
                            {/* Icon */}
                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                                <span className="text-white text-lg">📍</span>
                            </div>
                            {/* Venue Name */}
                            <div>
                                <p className="text-slate-500 text-xs font-medium uppercase">Venue</p>
                                <p className="text-slate-900 font-bold text-base">LG87 Go-Karting Track</p>
                            </div>
                            {/* Map Link */}
                            <a
                                href="https://maps.app.goo.gl/d4BJju25yaCgJkw4A"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-sm hover:from-blue-600 hover:to-blue-700 transition-all flex-shrink-0"
                            >
                                View Map
                            </a>
                        </div>
                    </div>

                    {/* Important Notice */}
                    <div className="mt-5 pt-4 border-t border-slate-200 text-center">
                        <p className="text-slate-700 font-medium text-sm">
                            <span className="text-red-600 font-bold">Limited to 300 participants</span> • Registration closes 23rd Jan
                        </p>
                    </div>
                </div>

                {/* Bottom: Scroll Indicator */}
                <div className="text-center pt-4">
                    <p className="text-slate-600 font-medium text-base mb-2">
                        Ready to join the excitement?
                    </p>
                    <div className="animate-bounce">
                        <p className="text-2xl">👇</p>
                    </div>
                    <p className="text-slate-500 text-sm">
                        Scroll down to register
                    </p>
                </div>
            </div>

            {/* Event Highlights - Below fold */}
            <div className="bg-emerald-50 p-5 border-t border-emerald-100">
                <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider text-center">What to Expect</h3>
                <div className="space-y-3">
                    <div className="bg-white rounded-lg p-3 border border-slate-100 shadow-sm text-center">
                        <p className="text-slate-700 text-sm font-medium">🏃 90–120 min Endurance Skating with supervised rest</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-slate-100 shadow-sm text-center">
                        <p className="text-slate-700 text-sm font-medium">🛣️ Road Skating Exposure on Go-Karting track</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-slate-100 shadow-sm text-center">
                        <p className="text-slate-700 text-sm font-medium">🏆 Certificates & Premium Momentos for all</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-slate-100 shadow-sm text-center">
                        <p className="text-slate-700 text-sm font-medium">💪 Builds confidence, fitness & sportsmanship</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventInfo;
