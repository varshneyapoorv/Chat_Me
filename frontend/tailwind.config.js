// tailwind.config.js
import daisyui from 'daisyui';  // Import DaisyUI plugin

export default {
  content: [
    "./index.html",        
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,  // Include DaisyUI plugin
  ],
};
