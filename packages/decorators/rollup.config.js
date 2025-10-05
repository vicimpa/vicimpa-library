import typescript from "@rollup/plugin-typescript";
import terser from '@rollup/plugin-terser';
import dts from "rollup-plugin-dts";

const terseropts = {
  keep_classnames: true,
  keep_fnames: true,
};

const tsopts = {
  tsconfig: "./tsconfig.json"
};

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'esm'
      },
      {
        file: 'dist/index.cjs',
        format: 'cjs'
      },
    ],
    plugins: [typescript(tsopts), terser(terseropts)],
    external: [
      /@vicimpa/,
      /node_modules/
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