// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx}",
//     "./components/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     screens: {
//       sm: "480px",
//       md: "768px",
//       lg: "976px",
//       xl: "1440px",
//     },
//     extend: {
//       animation: {
//         blob: "blob 7s infinite",
//       },
//       keyframes: {
//         blob: {
//           "0%": {
//             transform: "translate(0px, 0px) scale(1)",
//           },
//           "33%": {
//             transform: "translate(30px, -50px) scale(1.1)",
//           },
//           "66%": {
//             transform: "translate(-20px, 20px) scale(0.9)",
//           },
//           "100%": {
//             transform: "translate(0px, 0px) scale(1)",
//           },
//         },
//       },
//     },
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{html,js,jsx}", "./components/**/*.{html,js,jsx}", "./sections/**/*.{html,js,jsx}", "./styles/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        "primary-black": "#1A232E",
        "secondary-white": "#c7c7c7",
      },
      transitionTimingFunction: {
        "out-flex": "cubic-bezier(0.05, 0.6, 0.4, 0.9)",
      },
    },
  },
  plugins: [],
};
