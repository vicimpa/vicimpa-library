import typescript from "@rollup/plugin-typescript";

export default {
  input: 'src/index.ts',
  plugins: [typescript()],
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs'
    },
    {
      file: 'dist/index.esm.js',
      format: 'es'
    }
  ],
  external: [
    /@vicimpa/,
    /node_modules/
  ]
};