/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,html,js}'],
  purge: ['./src/**/*.{vue,html,js}'],
  theme: {
    extend: {
      colors: {
        primary: '#6833ff',
        primaryDark: '#5626DF',
        gray: '#F2F4F8',
        background: '#5626DF',
        paragraph: '#999FAA',
        title: '#000000',
        error: '#ED2E7E',
      },
    },
  },
  plugins: [],
};
