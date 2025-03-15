/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
      },
      colors: {
        // Pastel Pink Palette
        pink: {
          50: '#fff0f5',
          100: '#fff0f7',
          200: '#ffd1dc', // pastel pink
          300: '#ffadd2',
          400: '#ff89b6',
          500: '#ff6ca3',
          600: '#ff5c97',
          700: '#f03f82',
          800: '#db2777',
          900: '#be185d',
        },
        // Pastel Purple Palette
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e0c1f0', // pastel purple
          300: '#d5b8ff',
          400: '#b69aff',
          500: '#a67ced',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
        // Pastel Blue Palette
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#c5e1ff', // pastel blue
          300: '#a6c9fd',
          400: '#7bacfa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // Additional Pastel Colors
        pastel: {
          yellow: '#fff5ba',
          green: '#c9f5d9',
          lavender: '#e6d7ff',
          peach: '#ffddcc',
          mint: '#d1ffee',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'float-delay': 'float 3s ease-in-out 1s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wiggle': 'wiggle 0.5s ease-in-out',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-out': 'fadeOut 0.5s ease-in-out',
        'bounce-small': 'bounceSmall 1s infinite',
        'float-away': 'floatAway 1.5s ease-out forwards',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        bounceSmall: {
          '0%, 100%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(-5px)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        floatAway: {
          '0%': { 
            transform: 'translate(0, 0) scale(1)', 
            opacity: 1 
          },
          '100%': { 
            transform: 'translate(var(--tx, 100px), var(--ty, -100px)) scale(0)',
            opacity: 0 
          },
        },
        sparkle: {
          '0%, 100%': { 
            transform: 'scale(1)', 
            opacity: 0.7 
          },
          '50%': { 
            transform: 'scale(1.2)', 
            opacity: 1 
          },
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-pixel': {
          'text-shadow': '2px 2px 0 rgba(125, 78, 133, 0.3)',
        },
        '.text-shadow-pixel-sm': {
          'text-shadow': '1px 1px 0 rgba(125, 78, 133, 0.3)',
        },
        '.text-shadow-pixel-lg': {
          'text-shadow': '3px 3px 0 rgba(125, 78, 133, 0.3)',
        },
        '.pixelated': {
          'image-rendering': 'pixelated',
        },
        '.rotate-y-180': {
          transform: 'rotateY(180deg)',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};