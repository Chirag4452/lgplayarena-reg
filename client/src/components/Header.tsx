/**
 * Header Component
 * Displays the site header with logo and navigation links
 */
import React from 'react';
import fsLogo from '../assets/Flying-skater-logo.jpg';

const Header: React.FC = () => {
    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 mb-6">
            <div className="flex flex-col sm:flex-row items-center justify-between">
                {/* Logo and Title */}
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                    <img src={fsLogo} alt="Flying Skaters Academy" className="w-12 h-12" />
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">Flying Skaters Academy</h3>
                        <p className="text-sm text-slate-600">SKATING ACADEMY</p>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex space-x-6">
                    <a href="#event-info" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                        Event Info
                    </a>
                    <a href="#registration" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                        Registration
                    </a>
                    <a href="#contact" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                        Contact
                    </a>
                </nav>
            </div>
        </div>
    );
};

export default Header;
