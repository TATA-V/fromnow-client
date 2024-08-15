module.exports = {
  presets: ['module:@react-native/babel-preset', '@babel/preset-react'],
  plugins: [
    'react-native-reanimated/plugin',
    'nativewind/babel',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './*',
          '@components': './src/components',
          '@screen': './src/screens',
          '@assets': './src/assets',
          '@styles': './src/styles',
          '@hooks': './src/hooks',
          '@utils': './src/utils',
          '@store': './src/store',
          '@api': './src/api',
        },
        extensions: ['.js', '.jsx', '.tsx', '.ios.js', '.android.js'],
      },
    ],
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],
  ],
};
