module.exports = {
    mode: 'jit',
    purge: {
        preserveHtmlElements: false,
        content: ['src/**/*.[j|t]s[x]']
    },
    darkMode: 'class',
    theme: {
        extend: {}
    },
    variants: {
        extend: {}
    },
    important: true,
    plugins: [
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/forms')
    ]
}
