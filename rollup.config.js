import replace from 'rollup-plugin-replace';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import copy from 'rollup-plugin-copy';
import json from 'rollup-plugin-json';
import scss from 'rollup-plugin-scss';
import svgo from 'rollup-plugin-svgo';
import md from 'rollup-plugin-md';

const targetDir = 'docs';

// Grab the NODE_ENV and store in targetEnv, default to 'production' if undefined
const { NODE_ENV: targetEnv = 'production' } = process.env;

// Work out if we're targetting development
const isDev = (targetEnv === 'development');

// Define baseline plugins for transformation
const jsPlugins = [
  resolve(),
  commonjs({
    include: 'node_modules/**',
    namedExports: { 'node_modules/react-is/index.js': ['isValidElementType'] },
  }),
  json({}),
  replace({ 'process.env.NODE_ENV': JSON.stringify(targetEnv) }),
  babel({
    configFile: false, // Read config from here, not babel config file
    runtimeHelpers: true, // Include runtime Helpers
    exclude: 'node_modules/**', // Only transpile our source code
    presets: [ // Setup presets
      ['@babel/env', { modules: false }],
      ['@babel/react', {}],
    ],
    plugins: [ // Setup plugins
      '@babel/transform-runtime',
    ],
  }),
  isDev ? undefined : uglify(), // Uglify code unless we're targetting 'development'
  copy({ // Copy modules to the vendor directory
    targets: [
      {
        src: 'src/static/*',
        dest: targetDir,
      },
      {
        src: [
          'node_modules/react/umd/react.development.js',
          'node_modules/react/umd/react.production.min.js',
          'node_modules/react-dom/umd/react-dom.development.js',
          'node_modules/react-dom/umd/react-dom.production.min.js',
          'node_modules/js-yaml/dist/js-yaml.min.js',
        ],
        dest: `${targetDir}/js/vendor`,
      },
      {
        src: [
          'node_modules/highlight.js/styles/default.css',
        ],
        dest: `${targetDir}/style/highlight.js/`,
      },
      {
        src: 'examples/*',
        dest: `${targetDir}/examples`,
      },
      {
        src: 'reports.yaml',
        dest: `${targetDir}/config`,
      },
    ],
  }),
  scss({
    output: `${targetDir}/style/dashboard.css`,
    outputStyle: 'compressed',
  }),
  svgo(),
  md(),
];

export default [
  {
    input: 'src/dashboard.js',
    plugins: jsPlugins,
    external: ['react', 'react-dom', 'js-yaml', 'highlight.js'],
    output: {
      dir: `${targetDir}/js`,
      format: 'iife',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'js-yaml': 'jsyaml',
        'highlight.js': 'hljs',
      },
    },
  },
  {
    input: 'src/highlight.js',
    plugins: [
      resolve(),
      commonjs(),
      uglify(),
    ],
    output: {
      file: `${targetDir}/js/highlight.min.js`,
      name: 'hljs',
      format: 'iife',
    },
  },
];
