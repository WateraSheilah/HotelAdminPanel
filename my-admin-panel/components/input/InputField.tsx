import React from 'react';

interface InputFieldProps {
    label: string;
    id: string;
    type: string;
    className?: string;
    value?: string; // Make value prop optional
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Make onChange prop optional
}

const InputField: React.FC<InputFieldProps> = ({ label, id, type, className = '', value, onChange }) => {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-white mb-2">
                {label}
            </label>
            <input
                id={id}
                type={type}
                className={`w-full py-2 px-3 border border-white rounded-lg focus:outline-none focus:shadow-outline text-white ${className}`}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default InputField;
