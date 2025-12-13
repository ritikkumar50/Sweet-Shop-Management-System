import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

const Input = ({
    label,
    error,
    icon: Icon,
    className,
    id,
    type = 'text',
    ...props
}) => {
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon className={clsx("h-5 w-5", error ? "text-red-400" : "text-gray-400")} />
                    </div>
                )}
                <input
                    id={id}
                    type={type}
                    className={twMerge(clsx(
                        "block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary transition-colors sm:text-sm py-2.5",
                        Icon ? "pl-10" : "pl-3",
                        error ? "border-red-300 focus:border-red-500 focus:ring-red-500 text-red-900 placeholder-red-300" : "border-gray-200",
                        className
                    ))}
                    {...props}
                />
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-600 animate-fadeIn">
                    {error}
                </p>
            )}
        </div>
    );
};

export default Input;
