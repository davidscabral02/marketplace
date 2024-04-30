module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@utils': './src/utils',
            '@hooks': './src/hooks',
            '@theme': './src/theme',
            '@assets': './src/assets',
            '@routes': './src/routes',
            '@screens': './src/screens',
            '@storage': './src/storage',
            '@services': './src/services',
            '@contexts': './src/contexts',
            '@components': './src/components',
          },
        },
      ],
    ],
  };
};
