// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          'pastel-pink': '#FFB6C1',
          'pastel-purple': '#D8BFD8',
          'pastel-blue': '#ADD8E6',
          'pastel-yellow': '#FFFACD',
          'pastel-green': '#98FB98',
        },
        fontFamily: {
          pixel: ['PixelFont', 'sans-serif'],
        },
        animation: {
          'pixel-float': 'float 3s ease-in-out infinite',
          'pixel-pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },
        backgroundImage: {
          'pixel-gradient': 'linear-gradient(to right, var(--tw-gradient-stops))',
        },
        boxShadow: {
          'pixel': '4px 4px 0px rgba(0, 0, 0, 0.2)',
          'pixel-lg': '8px 8px 0px rgba(0, 0, 0, 0.2)',
        },
      },
    },
    plugins: [require('daisyui')],
    daisyui: {
      themes: [
        {
          retro: {
            'primary': '#FF69B4',          // Hot pink
            'primary-focus': '#FF1493',    // Deep pink
            'primary-content': '#ffffff',  // White text on primary
            'secondary': '#9370DB',        // Medium purple
            'secondary-focus': '#8A2BE2',  // Blue violet
            'secondary-content': '#ffffff',// White text on secondary
            'accent': '#FFD700',           // Gold
            'accent-focus': '#FFA500',     // Orange
            'accent-content': '#ffffff',   // White text on accent
            'neutral': '#2a323c',          // Dark blue-grey
            'neutral-focus': '#1e2632',    // Darker blue-grey
            'neutral-content': '#ffffff',  // White text on neutral
            'base-100': '#FFF6F9',         // Very light pink
            'base-200': '#FFE6F2',         // Light pink
            'base-300': '#FFCCE6',         // Medium light pink
            'base-content': '#5A3E7A',     // Purple text on base
            'info': '#4dd0e1',             // Light blue
            'success': '#51cf66',          // Green
            'warning': '#fcc419',          // Yellow
            'error': '#ff6b6b',            // Red
          },
        },
      ],
    },
  };