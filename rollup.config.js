import {terser} from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const isProd = process.env.NODE_ENV === "production";

const typescriptOptions = {include: ["src/**/*", "../shared/**/*"]};
if (!isProd) typescriptOptions.noEmitOnError = false;

module.exports = {
  input: "src/server.ts",
  plugins: [
    typescript(typescriptOptions),
    commonjs({extensions: [".js", ".ts"]}),
    resolve({extensions: [".js", ".ts"]}),
    isProd && terser()
  ],
  output: {
    file: "dist/bundle.js",
    name: "ucaptcha",
    format: "iife"
  }
};
