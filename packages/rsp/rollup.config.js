import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import terser from '@rollup/plugin-terser';

/** @type {import('rollup').RollupOptions} */
const config = [
  {
    input: 'src/index.ts',
    plugins: [
      typescript(),
      terser()
    ],
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        compact: true,
        sourcemap: false,
      },
      {
        file: 'dist/index.esm.js',
        format: 'es',
        compact: true,
        sourcemap: false,
      },
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

export default config;