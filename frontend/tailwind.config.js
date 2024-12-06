/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",        // Make sure index.html is being scanned
    "./src/**/*.{js,ts,jsx,tsx}", // Ensure all your source files are included
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,  // Ensure DaisyUI plugin is included correctly
  ],
};
