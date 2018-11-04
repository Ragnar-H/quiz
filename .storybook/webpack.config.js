module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.resolve.extensions.push(".ts", ".tsx");
  storybookBaseConfig.module.rules[0].test = /\.(mjs|jsx?|tsx?)$/;
  return storybookBaseConfig;
};
