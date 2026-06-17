module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
        },
        navy: {
          50: '#E8EAED',
          100: '#C5C9CF',
          200: '#9EA4AE',
          300: '#76808E',
          400: '#586575',
          500: '#3A4B5D',
          600: '#2D3A4A',
          700: '#1D2838',
          800: '#131C28',
          900: '#0F1111',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 4px rgba(0,0,0,0.08)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.12)',
        'elevated': '0 2px 8px rgba(0,0,0,0.1)',
        'navbar': '0 2px 8px rgba(0,0,0,0.15)',
      },
      borderRadius: {
        'card': '8px',
      },
    },
  },
  plugins: [],
};
