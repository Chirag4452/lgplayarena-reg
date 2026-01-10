/**
 * SkillLevelSelector Component
 * Displays skill level options with images for selection
 */
import React from 'react';
import { getRegistrationFeeDisplay } from '../utils/payment';

// Import level images
import bg from '../assets/beginner.jpg';
import inter from '../assets/L2.jpg';
import l3 from '../assets/L3.jpg';

interface SkillLevelSelectorProps {
    selectedCategory: string;
    onSelect: (category: string) => void;
    error?: string;
}

// Level configuration for easy maintenance
const levels = [
    { id: 'Level 1', image: bg, alt: 'Beginner Level' },
    { id: 'Level 2', image: inter, alt: 'Intermediate Level' },
    { id: 'Level 3', image: l3, alt: 'Advanced Level' },
];

const SkillLevelSelector: React.FC<SkillLevelSelectorProps> = ({
    selectedCategory,
    onSelect,
    error,
}) => {
    return (
        <div className="max-w-xs sm:max-w-sm mx-auto">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Skill Level *
            </label>

            {/* Skill Level Options */}
            <div className="mb-3">
                <div className="flex flex-col items-center space-y-4">
                    {levels.map((level) => (
                        <div
                            key={level.id}
                            className={`text-center cursor-pointer transition-all duration-200 ${selectedCategory === level.id ? 'scale-105' : 'hover:scale-105'
                                }`}
                            onClick={() => onSelect(level.id)}
                        >
                            <img
                                src={level.image}
                                alt={level.alt}
                                className={`w-46 h-20 object-cover rounded-lg border-2 transition-all duration-200 ${selectedCategory === level.id
                                        ? 'border-blue-500 shadow-lg'
                                        : 'border-gray-200 hover:border-blue-300'
                                    }`}
                            />
                            <p
                                className={`text-xs mt-1 font-medium ${selectedCategory === level.id ? 'text-blue-600' : 'text-gray-600'
                                    }`}
                            >
                                {level.id}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Registration Fee Display */}
            {selectedCategory && (
                <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Registration Fee:</span>
                        <span className="text-lg font-bold text-green-600">
                            {getRegistrationFeeDisplay(selectedCategory)}
                        </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                        Payment will be processed securely via PayU
                    </p>
                </div>
            )}

            {/* Hidden input for form validation */}
            <input type="hidden" name="category" value={selectedCategory} />

            {/* Error message */}
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
    );
};

export default SkillLevelSelector;
