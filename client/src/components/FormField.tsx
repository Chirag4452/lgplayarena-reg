/**
 * FormField Component
 * Reusable form field with label, input/select, and error display
 */
import React from 'react';

interface FormFieldProps {
    id: string;
    name: string;
    label: string;
    type?: 'text' | 'email' | 'tel' | 'select';
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    error?: string;
    placeholder?: string;
    maxLength?: number;
    options?: { value: string; label: string }[];
    required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
    id,
    name,
    label,
    type = 'text',
    value,
    onChange,
    error,
    placeholder,
    maxLength,
    options,
    required = true,
}) => {
    const baseInputClass = `w-full px-2 py-1.5 text-xs border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`;
    const errorClass = error ? 'border-red-300 ring-red-200' : 'border-gray-300';

    return (
        <div className="max-w-xs sm:max-w-sm mx-auto">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && '*'}
            </label>

            {type === 'select' ? (
                <select
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`${baseInputClass} ${errorClass}`}
                >
                    {options?.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`${baseInputClass} ${errorClass}`}
                    placeholder={placeholder}
                    maxLength={maxLength}
                />
            )}

            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
    );
};

export default FormField;
