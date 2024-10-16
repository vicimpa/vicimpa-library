import typescript from "@rollup/plugin-typescript";

export default {
  input: 'src/index.ts',
  plugins: [typescript()],
  output: [
    {
      file: 'dist/index.cjs',
      format: 'cjs'
    },
    {
      file: 'dist/index.mjs',
      format: 'es'
    }
  ],
  external: [
    /@vicimpa/,
    /node_modules/
  ]
};