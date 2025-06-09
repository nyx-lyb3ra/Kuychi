import Gdk from "gi://Gdk";

import Color from "colorjs.io";

export function colorToRgba(color: Color): Gdk.RGBA {
  const [red, green, blue] = color.to("sRGB").coords;
  return new Gdk.RGBA({red, green, blue, alpha: 1});
}

export function rgbaToColor(rgba: Gdk.RGBA): Color {
  const {red: r, green: g, blue: b} = rgba;
  return new Color("sRGB", [r, g, b]);
}
