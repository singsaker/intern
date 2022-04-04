const getPresets = () => {
  if (process.env.NEXT_PUBLIC_APP_ENV == 'production') {
    return {
      // The regexes defined here are processed in Rust so the syntax is different from
      // JavaScript `RegExp`s. See https://docs.rs/regex.
      reactRemoveProperties: { properties: ['^data-test-id$'] },
      removeConsole: {
        exclude: ['error'],
      },
    };
  }
  return {};
};

module.exports = {
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
    ...getPresets(),
  },
};
