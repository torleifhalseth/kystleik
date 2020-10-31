const path = require('path');

module.exports = {
  parser: 'babel-eslint',
  extends: [
    'standard',
    'standard-react',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier',
    'prettier/react',
  ],
  plugins: ['prettier'],
  rules: {
    'react/prop-types': 0,
  },
  settings: {
    react: {
      pragma: 'React',
      version: '16.6.3',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: [
          path.resolve(__dirname, './src'),
          path.resolve(__dirname, './'),
        ],
      },
    },
  },
};
