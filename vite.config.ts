/// <reference types="vitest" />

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { name } from "./package.json";

export default defineConfig({
  define: {
    global: {},
    "process.env": {}
  },
  build: {
    lib: {
      entry: "./src/index.ts", // Specifies the entry point for building the library.
      name: name, // Sets the name of the generated library.
      fileName: (format) => `index.${format}.js`, // Generates the output file name based on the format.
      formats: ["cjs", "es"], // Specifies the output formats (CommonJS and ES modules).
    },
    rollupOptions: {},
    sourcemap: true, // Generates source maps for debugging.
    emptyOutDir: true, // Clears the output directory before building.
  },
  plugins: [dts()], // Uses the 'vite-plugin-dts' plugin for generating TypeScript declaration files (d.ts).
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setup-tests.ts",
  },
});
