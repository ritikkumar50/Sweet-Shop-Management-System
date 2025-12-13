import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className,
    isLoading = false,
    disabled,
    type = 'button',
    icon: Icon,
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95';

    const variants = {
        primary: 'bg-primary text-white hover:bg-pink-600 focus:ring-primary shadow-md hover:shadow-lg',
        secondary: 'bg-secondary text-white hover:bg-teal-500 focus:ring-secondary shadow-md',
        outline: 'border-2 border-primary text-primary hover:bg-pink-50 focus:ring-primary',
        ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
        danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 shadow-md',
    };

    const sizes = {
        sm: 'text-sm px-3 py-1.5',
        md: 'text-sm px-5 py-2.5',
        lg: 'text-base px-6 py-3',
    };

    return (
        <button
            type={type}
            className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {!isLoading && Icon && <Icon className="w-4 h-4 mr-2" />}
            {children}
        </button>
    );
};

export default Button;
