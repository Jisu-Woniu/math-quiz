import { fileURLToPath, URL } from "node:url";

import { defineConfig, type Plugin } from "vite";
import vue from "@vitejs/plugin-vue";
import htmlPurge from "vite-plugin-purgecss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), htmlPurge({}) as Plugin],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
