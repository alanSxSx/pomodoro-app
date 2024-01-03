/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

module.exports = {
  webpack: (config, { isServer }) => {
    // Adiciona a regra para arquivos mp3 no Webpack
    config.module.rules.push({
      test: /\.(mp3)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'sounds/',
          },
        },
      ],
    });

    return config;
  },
};
