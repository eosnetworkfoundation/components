/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                placeholder: '#B8B6B6',
            },
        },
    },
    variants: {
        extend: {
            backgroundColor: ['active'],
            textColor: ['active'],
            borderColor: ['focus-visible'],
            placeholderColor: ['active', 'focus'],
        },
    },
    plugins: [],
};
