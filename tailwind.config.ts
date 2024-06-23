import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        caribbean_blue: {
          DEFAULT: '#006d77',
        },
        tiffany_blue: {
          DEFAULT: '#83c5be',
        },
        alice_blue: {
          DEFAULT: '#edf6f9',
        },
        pale_dogwood: {
          DEFAULT: '#ffddd2',
        },
        atomic_tangerine: {
          DEFAULT: '#e29578',
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        dancingscript: ['var(--font-dancingscript)'],
        poppins: ['var(--font-poppins)'],
        poppinslight: ['var(--font-poppins-light)'],
    },
    },
  },
  plugins: [],
};

export default config;
