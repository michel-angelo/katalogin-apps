/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Font Judul Gahar
        display: ['"Archivo Black"', "sans-serif"],
        // Font Teknis/Struk
        mono: ['"Space Mono"', "monospace"],
        // Font Biasa (Body)
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        // Warna Aksen "Racun" (Pilih satu: Orange atau Lime)
        "brutal-orange": "#FF4D00",
        "brutal-lime": "#CCFF00",
        paper: "#F5F5F0", // Warna kertas agak kusam dikit
      },
      boxShadow: {
        // Shadow Tajam (Solid) khas Brutalist
        brutal: "4px 4px 0px 0px rgba(0,0,0,1)",
        "brutal-sm": "2px 2px 0px 0px rgba(0,0,0,1)",
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        marqueeReverse: 'marqueeReverse 20s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      }
    },
  },
  plugins: [],
};
