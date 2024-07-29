/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        bison: ['Bison', 'sans-serif'],
      },
      colors: {
        customPink: '#DF80AC',
        customBlue: '#579FF4',
        customYellow: '#FCB325',
        customGreen: '#098E27',
      },
      keyframes: {
        zoomInZoomOut: {
          '0%': { transform: 'scale(0.75,0.75)' },
          '50%': { transform: 'scale(1.25,1.25)' },
          '100%': { transform: 'scale(0.75,0.75)' },
        },
      },
      animation: {
        'zoom-in-zoom-out': 'zoomInZoomOut 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
