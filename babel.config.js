//To access our env variables within the babel.config.js file
// require('dotenv').config({ path: './.env.development' })
// console.log('API_KEY: ' + process.env.API_KEY)

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: [
          'react-native-paper/babel',
          ["inline-dotenv",{
            path: '.env.production'
          }],
          'react-native-reanimated/plugin',
          ],
      },
      development: {
        plugins: [
          'react-native-paper/babel',
          ["inline-dotenv",{
            path: '.env.development'
          }],
          'react-native-reanimated/plugin',
        ],
      },
    },
  };
};
