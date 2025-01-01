import typescript from "@rollup/plugin-typescript";

/** @type {import('rollup').RollupOptions} */
const config = {
  input: 'src/index.ts',
  plugins: [
    typescript({
      removeComments: true
    })
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
    }
  ],
  external: [
    /@vicimpa/,
    /node_modules/
  ]
};

export default config;