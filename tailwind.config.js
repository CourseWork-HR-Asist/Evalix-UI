import { mtConfig } from "@material-tailwind/react";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    //...mtConfig.theme,
    extend: {
      colors: {
        brand: {
          50: "#e0f7f3",
          100: "#b3ece2",
          200: "#80e0cf",
          300: "#4dd4bb",
          400: "#26cbb0",
          500: "#01B399", 
          600: "#01a38a",
          700: "#019278",
          800: "#007f65",
          900: "#00644a",
        },
      },
    },
  },
  plugins: [mtConfig],
};