/**
 * EventInfo Component
 * Displays event details: title, date, venue, and promotional banners
 */
import React from 'react';
import lgArenaLogo from '../assets/LG-arena-logo.jpg';
import fsLogo from '../assets/Flying-skater-logo.jpg';

const EventInfo: React.FC = () => {
    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8" id="event-info">
            {/* Event Title */}
            <div className="text-center mb-4 sm:mb-6">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-800 mb-1 sm:mb-2 tracking-wider" style={{ fontFamily: 'Impact, Haettenschweiler, "Arial Narrow Bold", "Arial Black", sans-serif' }}>
                    LG 87 1ST SKATING
                </h1>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-700 mb-2 sm:mb-4 tracking-widest" style={{ fontFamily: 'Impact, Haettenschweiler, "Arial Narrow Bold", "Arial Black", sans-serif' }}>
                    CHAMPIONSHIP 2025
                </h2>

                {/* Organizers */}
                <div className="flex items-center justify-center space-x-2 mb-6">
                    <span className="text-slate-600 font-semibold tracking-wide text-sm uppercase">ORGANIZED BY</span>
                    <div className="flex items-center space-x-6">
                        <div className="text-center">
                            <img src={lgArenaLogo} alt="LG 87 Play Arena" className="w-34 h-34" />
                        </div>
                        <div className="text-center">
                            <img src={fsLogo} alt="Flying Skaters Academy" className="w-24 h-24" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Challenge Banner */}
            <div className="bg-gradient-to-r from-slate-700 via-slate-800 to-slate-700 text-white py-4 px-8 rounded-2xl mb-8 text-center shadow-xl transform -skew-x-12 border border-slate-600">
                <span className="text-2xl font-black tracking-widest transform skew-x-12 block" style={{ fontFamily: 'Impact, Haettenschweiler, "Arial Narrow Bold", "Arial Black", sans-serif' }}>
                    CHALLENGE YOURSELF
                </span>
            </div>

            {/* Event Description */}
            <div className="text-center mb-6 sm:mb-8">
                <p className="text-slate-700 text-base sm:text-lg md:text-xl leading-tight sm:leading-relaxed max-w-4xl mx-auto font-medium tracking-wide" style={{ fontFamily: 'Russo One, sans-serif' }}>
                    Join us for an electrifying skating race and show off your speed! From first-timers to seasoned skaters, everyone is welcome on the track!
                </p>
            </div>

            {/* Event Details: Date and Venue */}
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
                {/* Date */}
                <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg sm:rounded-xl border border-slate-200 shadow-sm">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-slate-500 to-slate-600 rounded-full flex items-center justify-center shadow-md">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-slate-900 font-bold text-base sm:text-lg tracking-wide">SUNDAY 7 SEPTEMBER, 2025</p>
                    </div>
                </div>

                {/* Venue */}
                <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg sm:rounded-xl border border-slate-200 shadow-sm">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-slate-500 to-slate-600 rounded-full flex items-center justify-center shadow-md">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-slate-900 font-bold text-base sm:text-lg tracking-wide">LG 87 PLAY ARENA</p>
                        <p className="text-slate-600 font-semibold text-sm sm:text-base">INDOOR SKATING RINK</p>
                        <p className="text-slate-700 font-medium text-sm sm:text-base">Tippasandara</p>
                        <a
                            href="https://maps.app.goo.gl/d4BJju25yaCgJkw4A?g_st=ipc"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 hover:text-blue-600 transition-colors mt-1"
                        >
                            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-slate-600 underline text-xs">View on map</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Register Now Banner */}
            <div className="bg-gradient-to-r from-slate-700 via-slate-800 to-slate-700 text-white py-4 px-8 rounded-2xl text-center shadow-xl transform -skew-x-12 border border-slate-600">
                <span className="text-2xl font-black tracking-widest transform skew-x-12 block" style={{ fontFamily: 'Impact, Haettenschweiler, "Arial Narrow Bold", "Arial Black", sans-serif' }}>
                    REGISTER BELOW
                </span>
            </div>
        </div>
    );
};

export default EventInfo;
