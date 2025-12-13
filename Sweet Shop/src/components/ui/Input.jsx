import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const Input = ({ label, icon: Icon, className, error, id, ...props }) => {
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Icon className="h-5 w-5 text-gray-400" />
                    </div>
                )}
                <input
                    id={id}
                    className={twMerge(
                        "block w-full rounded-xl border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary focus:ring-2 focus:ring-opacity-20 sm:text-sm py-3 transition-colors",
                        Icon ? "pl-11" : "pl-4",
                        error ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "",
                        className
                    )}
                    {...props}
                />
            </div>
            {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
        </div>
    );
};

export default Input;
