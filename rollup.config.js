import {terser} from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const isProd = process.env.NODE_ENV === "production";

const typescriptOptions = {include: ["src/**/*", "../shared/**/*"]};
if (!isProd) typescriptOptions.noEmitOnError = false;

module.exports = {
  input: "src/client.js",
  plugins: [
    commonjs(),
    resolve(),
    isProd && terser()
  ],
  output: {
    file: "dist/client/bundle.js",
    name: "ucaptcha",
    format: "iife"
  }
};
