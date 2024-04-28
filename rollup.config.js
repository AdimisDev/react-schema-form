import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import css from "rollup-plugin-import-css";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";

export default defineConfig({
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "es",
    name: "@adimis/react-schema-form",
  },
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "@hookform/resolvers/zod",
    "react-hook-form",
    "@hookform/devtools",
    "zod",
    "@radix-ui/react-slot",
    "lucide-react",
    "date-fns",
    "@radix-ui/react-tabs",
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
    "@radix-ui/react-label",
    "@radix-ui/react-popover",
    "@radix-ui/react-radio-group",
    "@radix-ui/react-select",
    "react-day-picker",
    "@radix-ui/react-checkbox",
    "dist/assets/bundle-CuUYqtrQ.css",
  ],
  plugins: [
    typescript({ tsconfig: "tsconfig.json" }),
    css(),
    postcss({
      extensions: [".css"],
      extract: true,
      minimize: true,
      plugins: [tailwindcss("tailwind.config.js"), autoprefixer()],
    }),
  ],
});
