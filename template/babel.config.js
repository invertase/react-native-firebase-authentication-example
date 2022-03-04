module.exports = {
  presets: [['module:metro-react-native-babel-preset', {useTransformReactJSXExperimental: true}]],
  plugins: [
    ["@babel/plugin-transform-flow-strip-types"],
    [
      '@babel/plugin-transform-react-jsx',
      {
        runtime: 'automatic'
      }
    ],
    ["@babel/plugin-proposal-private-methods", { "loose": true }],
    ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
  ]
};
