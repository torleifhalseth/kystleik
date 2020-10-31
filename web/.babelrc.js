const isProd = String(process.env.GATSBY_ENVIRONMENT) === 'prod';

module.exports = {
  presets: ['babel-preset-gatsby'],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    [
      'babel-plugin-styled-components',
      {
        displayName: isProd ? false : true,
      },
    ],
  ],
};
