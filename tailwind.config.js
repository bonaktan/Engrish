/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                body: "#faf6e3",
                bodyshadow: "#b2ae9a",
                bodytranscript: "#b3ae9a" /* opacity: 16%; */,
                footer: "#2a3663",
                footercorrections: "#b2ae9a" /* opacity: 16%; */,
                footerbuttons: "#b2ae9a" /* opacity: 16%; */,

                textmain: "#5e5c53",
                textfoot: "#8793c2",
            },
        },
    },
    plugins: [],
};
