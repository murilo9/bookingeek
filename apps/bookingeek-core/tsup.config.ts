import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"], // Output both ESM and CommonJS
  target: ["node16", "esnext"], // Target both Node.js and browser environments
  clean: true, // Clean output directory before building
  dts: true, // Generate TypeScript declaration files
  sourcemap: true, // Generate source maps for debugging
});
