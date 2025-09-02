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
    input: 'src/index.ts',
    plugins: [typescript(tsopts), terser(terseropts)],
    output: [
      {
        file: 'dist/index.cjs',
        format: 'cjs'
      },
      {
        file: 'dist/index.mjs',
        format: 'esm'
      }
    ],
    external: [
      /@vicimpa/,
      /node_modules/
    ]
  },
  {
    input: "src/index.ts",
    output: { file: "dist/index.d.ts", format: "esm" },
    plugins: [dts({})]
  }
];