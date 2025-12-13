/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#F2744B', // Coral Orange
                secondary: '#FFF5F2', // Soft Peach
                accent: '#4A3B32', // Dark Artisan Brown
                surface: '#FFFBF9', // Warm White
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            }
        },
    },
    plugins: [],
}
