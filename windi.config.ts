import { defineConfig } from "vite-plugin-windicss";

export default defineConfig({
  extract: {
    include: [
      "./**/*.html",
      "./**/*.vue",
      "./**/*.ts",
      "./**/*.js",
      "./**/*.jsx",
      "./**/*.tsx",
    ],
  },
  safelist: [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
  ],
});
