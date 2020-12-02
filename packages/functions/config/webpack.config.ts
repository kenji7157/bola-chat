import path from 'path';
import webpack from 'webpack';
import webpackNodeExternals from 'webpack-node-externals';

const config: webpack.Configuration = {
  mode: 'development',
  entry: './index.ts',
  target: 'node',
  externals: [webpackNodeExternals()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    modules: ['node_modules'],
    extensions: ['.ts', '.js', 'json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../lib'),
    libraryTarget: 'this',
  },
};
export default config;
