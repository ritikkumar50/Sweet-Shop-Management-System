import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = ({ onClick }) => {
    const { theme, toggleTheme } = useTheme();

    const handleClick = () => {
        toggleTheme();
        if (onClick) onClick();
    };

    return (
        <button
            onClick={handleClick}
            className="p-2 rounded-full transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Toggle Dark Mode"
        >
            {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
                <Moon className="w-5 h-5 text-slate-700" />
            )}
        </button>
    );
};

export default ThemeToggle;
