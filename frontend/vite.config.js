import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
const TerserPlugin = require('terser-webpack-plugin');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    require('rollup-plugin-replace')({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    require('rollup-plugin-commonjs')(),
    require('rollup-plugin-terser')(),],
  
  build: {
    minify: 'terser',
  },
  optimization: {
    minimizer: [new TerserPlugin({})],
  },
  server: {
    host : true,
    strictPort: true,
    port : 10000
  }
});
