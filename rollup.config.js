import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import svelte from "rollup-plugin-svelte";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import config from "sapper/config/rollup.js";
import pkg from "./package.json";
import css from "rollup-plugin-css-only";
import glob from "glob";
const { markdown } = require("svelte-preprocess-markdown");

const mode = process.env.NODE_ENV;
const dev = mode === "development";
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const onwarn = (warning, onwarn) =>
  (warning.code === "CIRCULAR_DEPENDENCY" &&
    /[/\\]@sapper[/\\]/.test(warning.message)) ||
  onwarn(warning);

export default {
  client: {
    preserveEntrySignatures: false,
    input: config.client.input(),
    output: config.client.output(),
    plugins: [
      {
        buildStart() {
          var self = this;
          const postsDir = "./contents";
          glob(postsDir + "/**/*.md", null, function (er, files) {
            files.forEach((file) => {
              self.addWatchFile(file);
            });
          });
          glob(postsDir + "/**/*.ipynb", null, function (er, files) {
            files.forEach((file) => {
              self.addWatchFile(file);
            });
          });
        },
      },
      replace({
        "process.browser": true,
        "process.env.NODE_ENV": JSON.stringify(mode),
      }),
      svelte({
        dev,
        extensions: [".svelte", ".md"],
        preprocess: markdown(),
        hydratable: true,
        emitCss: true,
      }),
      resolve({
        browser: true,
        dedupe: ["svelte"],
      }),
      commonjs(),
      css({
        output: "static/highlight.css",
      }),

      legacy &&
        babel({
          extensions: [".js", ".mjs", ".html", ".svelte"],
          babelHelpers: "runtime",
          exclude: ["node_modules/@babel/**"],
          presets: [
            [
              "@babel/preset-env",
              {
                targets: "> 0.25%, not dead",
              },
            ],
          ],
          plugins: [
            "@babel/plugin-syntax-dynamic-import",
            [
              "@babel/plugin-transform-runtime",
              {
                useESModules: true,
              },
            ],
          ],
        }),

      !dev &&
        terser({
          module: true,
        }),
    ],

    onwarn,
  },

  server: {
    input: config.server.input(),
    output: config.server.output(),
    plugins: [
      {
        buildStart() {
          var self = this;
          const postsDir = "./contents";
          glob(postsDir + "/**/*.md", null, function (er, files) {
            files.forEach((file) => {
              self.addWatchFile(file);
            });
          });
          glob(postsDir + "/**/*.ipynb", null, function (er, files) {
            files.forEach((file) => {
              self.addWatchFile(file);
            });
          });
        },
      },
      replace({
        "process.browser": false,
        "process.env.NODE_ENV": JSON.stringify(mode),
      }),
      svelte({
        generate: "ssr",
        extensions: [".svelte", ".md"],
        preprocess: markdown(),
        dev,
        hydratable: true,
        emitCss: true,
      }),
      resolve({
        dedupe: ["svelte"],
      }),
      commonjs(),
      css({
        output: "static/highlight.css",
      }),
    ],
    external: Object.keys(pkg.dependencies).concat(
      require("module").builtinModules ||
        Object.keys(process.binding("natives"))
    ),

    onwarn,
  },

  serviceworker: {
    input: config.serviceworker.input(),
    output: config.serviceworker.output(),
    plugins: [
      resolve(),
      replace({
        "process.browser": true,
        "process.env.NODE_ENV": JSON.stringify(mode),
      }),
      commonjs(),
      !dev && terser(),
    ],

    onwarn,
  },
};
