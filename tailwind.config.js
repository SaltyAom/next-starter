module.exports = {
    mode: 'jit',
    purge: {
        preserveHtmlElements: false,
	content: ['src/**/*.{jsx,tsx,js,ts}']
    },
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#26467B'
                }
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: [
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/forms')
    ]
}
