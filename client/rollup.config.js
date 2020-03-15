import {terser} from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const isProd = process.env.NODE_ENV === "production";

const typescriptOptions = {include: ["src/**/*", "../shared/**/*"]};
if (!isProd) typescriptOptions.noEmitOnError = false;

module.exports = {
  input: "src/index.ts",
  plugins: [
    commonjs({extensions: [".js", ".ts"]}),
    resolve({extensions: [".js", ".ts"]}),
    isProd && terser(),
    typescript(typescriptOptions),
  ],
  output: {
    file: "dist/bundle.js",
    name: "ucaptcha",
    format: "iife"
  }
};
