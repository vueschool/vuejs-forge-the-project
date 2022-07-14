import { defineConfig } from "vite-plugin-windicss";

export default defineConfig({
  extract: {
    include: ['./**/*.html', './**/*.vue', './**/*.ts', './**/*.js', './**/*.jsx', './**/*.tsx'],
  },
})