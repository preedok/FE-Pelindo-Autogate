/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        floating: {
          '0%, 100%': { transform: 'translateY(-3deg)' },
          '50%': { transform: 'translateY(3deg)' },
        },
      },
      animation: {
        floating: 'floating 3s infinite',
      }
    },
  },
  plugins: [],
});