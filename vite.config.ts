/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import vuetify from "vite-plugin-vuetify";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vuetify(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 3000,
  },
  css: {
    postcss: "./postcss.config.ts",
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    include: ["**/*.{test,spec}.{js,ts,jsx,tsx}"],
    exclude: ["node_modules/**/*", "dist/**/*"],
    coverage: {
      provider: "v8",
      reporter: ["text", "clover"],
      include: ["src/**/*.{vue,js,jsx,ts,tsx}"],
      exclude: [
        "src/**/*.{test,spec}.{js,ts,jsx,tsx}",
        "src/test/**/*",
        "src/types/**/*",
        "src/**/*.d.ts",
      ],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 60,
        lines: 80,
      },
    },
    server: {
      deps: {
        inline: ["vuetify"],
      },
    },
    env: {
      NODE_ENV: "test",
    },
  },
});
