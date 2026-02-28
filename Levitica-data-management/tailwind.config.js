/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
        "2xl": "3rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },

    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },

      fontSize: {
        body: ["0.875rem", { lineHeight: "1.25rem" }],
        bodyLg: ["1.125rem", { lineHeight: "1.75rem" }],
      },

      colors: {
        body: "#374151",

        /* Brand colors (same as dvskillhub – customize as needed) */
        brand: {
          dark: "#1F2E5A",
          blue: "#4A6FB3",
          DEFAULT: "#4A6FB3",
          light: "#E8EEFA",
          soft: "#F3F6FD",
          accent: "#6D8AE8",
        },

        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
        info: "#6366F1",
      },

      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.06)",
        brand: "0 12px 40px rgba(74,111,179,0.25)",
      },

      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
    },
  },
  plugins: [],
};
