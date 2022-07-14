import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import graphql from "@rollup/plugin-graphql";
import WindiCSS from "vite-plugin-windicss";

// plugins
import vueJsx from "@vitejs/plugin-vue-jsx";
import vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import Components from "unplugin-vue-components/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), graphql(), Pages(), Components(), WindiCSS()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
