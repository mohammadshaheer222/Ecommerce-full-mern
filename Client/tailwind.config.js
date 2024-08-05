/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      oswald: ["Oswald", "sans-serif"],
    },
    extend: {
      screens: {
        "1000px": "1050px",
        "1100px": "1110px",
        "800px": "800px",
        "1300px": "1300px",
        "400px": "400px",
      },
      backgroundImage: {
        hero: "url('../src/assets/HEADER2.jpg')",
        heroXs: "url('../src/assets/Header_M(1).jpg')",
        bannerOffer: "url('../src/assets/banner.jpg')",
      },
    },
  },
  plugins: [],
};
