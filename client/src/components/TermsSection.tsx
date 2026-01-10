/**
 * TermsSection Component
 * Displays terms and conditions with expandable content and acceptance checkbox
 */
import React, { useState } from 'react';
import { termsAndConditions } from '../data/termsAndConditions';

interface TermsSectionProps {
    termsAccepted: boolean;
    onTermsChange: (accepted: boolean) => void;
    error?: string;
}

const TermsSection: React.FC<TermsSectionProps> = ({
    termsAccepted,
    onTermsChange,
    error,
}) => {
    const [showFullTerms, setShowFullTerms] = useState<boolean>(false);

    return (
        <div className="max-w-xs sm:max-w-sm mx-auto">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Terms and Conditions</h3>

            {/* Terms Preview/Content */}
            <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <div className="text-xs text-gray-600 space-y-2">
                    {showFullTerms ? (
                        // Show all sections when expanded
                        termsAndConditions.sections.map((section, index) => (
                            <div key={index}>
                                <p className="font-medium text-gray-700">{section.heading}</p>
                                <div className="space-y-1">
                                    {section.content.map((content, contentIndex) => (
                                        <p key={contentIndex} className="text-gray-600">
                                            {content}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        // Show only first 2 sections when collapsed
                        termsAndConditions.sections.slice(0, 2).map((section, index) => (
                            <div key={index}>
                                <p className="font-medium text-gray-700">{section.heading}</p>
                                <p className="text-gray-600">{section.content[0]}</p>
                            </div>
                        ))
                    )}
                </div>

                {/* Expand/Collapse Button */}
                <button
                    type="button"
                    onClick={() => setShowFullTerms(!showFullTerms)}
                    className="text-xs text-blue-600 hover:text-blue-800 underline mt-2"
                >
                    {showFullTerms ? 'Show less' : 'Read more...'}
                </button>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start space-x-3">
                <input
                    type="checkbox"
                    id="terms"
                    checked={termsAccepted}
                    onChange={(e) => onTermsChange(e.target.checked)}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="text-xs text-gray-700 leading-relaxed">
                    I agree to the Terms and Conditions and Privacy Policy. I understand that my
                    information will be used for event registration purposes only.
                </label>
            </div>

            {/* Error message */}
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
    );
};

export default TermsSection;
