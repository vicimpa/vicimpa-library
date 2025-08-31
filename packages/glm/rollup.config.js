import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import terser from '@rollup/plugin-terser';

const terseropts = {
  keep_classnames: true,
  keep_fnames: true,
};

const tsopts = {
  tsconfig: "./tsconfig.json"
};

export default [
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.cjs",
      format: "cjs",
    },
    plugins: [
      typescript(tsopts),
      terser(terseropts),
    ]
  },

  {
    input: "src/index.ts",
    output: {
      file: "dist/index.js",
      format: "esm",
    },
    plugins: [
      typescript(tsopts),
      terser(terseropts),
    ]
  },

  {
    input: "src/index.ts",
    output: {
      file: "dist/index.amd.js",
      format: "amd",
    },
    plugins: [
      typescript(tsopts),
      terser(terseropts),
    ]
  },

  {
    input: "src/index.ts",
    output: {
      file: "dist/index.d.ts",
      format: "es"
    },
    plugins: [dts({})]
  }
];