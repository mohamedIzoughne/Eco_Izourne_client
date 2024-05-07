/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      xs: '359px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        main: '#0CC1A6',
        secondary: '#EFF6FF',
        third: '#008F99',
        third2: '#007DC6',
        grayish: '#7A7A7A',
        danger: '#FF4040',
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '0.5rem',
        sm: '1rem',
        lg: '2rem',
        xl: '2.5rem',
        '2xl': '6rem',
      },
    },
  },
  plugins: [],
}
