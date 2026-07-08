/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // Brand colors (primary/secondary/accent) now live as CSS variables in
    // src/index.css and are exposed to Tailwind via the `@theme inline` block,
    // so they are shared between the invitation and shadcn components.
    extend: {},
  },
  plugins: [],
}
