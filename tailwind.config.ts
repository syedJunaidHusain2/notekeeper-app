import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['"Poppins"', 'sans-serif'],
      },
      colors: {
        'gray-500': '#6B7280',  // Light gray for text 
        'icon-grey': '#4B5563',  // Slightly darker gray for icons
        'gray-800': '#1F2937',  // Dark gray for headers or important text
      },
      boxShadow: {
        'soft-lg': '0 4px 6px rgba(0, 0, 0, 0.05)', // Softer large shadow
      },
      scale: {
        102: '1.02', 
      },
    },
  },
  plugins: [],
} satisfies Config;
