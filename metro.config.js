// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

module.exports = config;

// const defaultConfig = getDefaultConfig(__dirname);
// defaultConfig.resolver.sourceExts.push('cjs');
// defaultConfig.resolver.extraNodeModules["stream/web"] = require.resolve("readable-stream")
// module.exports = defaultConfig;

// const { getDefaultConfig } = require('expo/metro-config');

// const defaultConfig = getDefaultConfig(__dirname);

// defaultConfig.resolver.sourceExts.push('cjs');
// defaultConfig.resolver.extraNodeModules["stream/web"] = require.resolve("web-streams-polyfill");

// module.exports = defaultConfig;


