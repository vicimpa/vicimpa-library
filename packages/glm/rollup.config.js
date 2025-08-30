import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

export default [
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.cjs",
      format: "cjs"
    },
    plugins: [
      typescript({ tsconfig: "./tsconfig.json" })
    ]
  },

  {
    input: "src/index.ts",
    output: {
      file: "dist/index.mjs",
      format: "esm"
    },
    plugins: [
      typescript({ tsconfig: "./tsconfig.json" })
    ]
  },

  {
    input: "src/index.ts",
    output: {
      file: "dist/index.amd.js",
      format: "amd"
    },
    plugins: [
      typescript({ tsconfig: "./tsconfig.build.json" })
    ]
  },

  {
    input: "dist/index.d.ts",
    output: {
      file: "dist/index.d.ts",
      format: "es"
    },
    plugins: [dts({})]
  }
];