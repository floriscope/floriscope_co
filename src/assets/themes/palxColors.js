import palx from "palx";

const palette = palx("#099");

const flattened = Object.keys(palette).reduce(function(a, key) {
  var value = palette[key];
  if (Array.isArray(value)) {
    a[key] = value[5];
    value.forEach(function(val, i) {
      a[key + i] = val;
    });
  } else {
    a[key] = value;
  }
  return a;
}, {});

const colors = Object.assign({}, flattened, {
  black: "#000",
  white: "#fff"
});

export default colors;
