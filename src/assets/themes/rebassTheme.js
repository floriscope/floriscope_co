import colors from "./palxColors";

export default {
  breakpoints: [32, 48, 64, 80],
  space: [0, 4, 8, 16, 32, 64, 128],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72, 96, 142, 200],
  weights: [300, 400, 600, 700],
  colors: {
    black: "#000",
    white: "#fff",
    ...colors
  },
  radius: 4,
  font:
    '"Proxima Nova", "Brandon Text", Helvetica,-apple-system, BlinkMacSystemFont, sans-serif',
  monospace: '"SF Mono", "Roboto Mono", Menlo, monospace'
};
