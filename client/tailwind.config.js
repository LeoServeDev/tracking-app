const defaultConfig = require("shadcn/ui/tailwind.config")

module.exports = {
  ...defaultConfig,
  theme: {
    ...defaultConfig.theme,
    extend: {
      ...defaultConfig.theme.extend,
      screens: {
        xxs: "280px", // Small watch screens
        xs: "320px", // Standard watch screens
        sm: "640px", // Small tablets
      },
    },
  },
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  plugins: [...defaultConfig.plugins, require("tailwindcss-animate")],
}
