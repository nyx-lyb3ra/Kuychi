import Gdk from "gi://Gdk";
import GObject from "gi://GObject";

import Color from "colorjs.io";
import {OKLab, sRGB} from "colorjs.io/fn";

interface ConstructorProps extends GObject.Object.ConstructorProps {
  color?: Gdk.RGBA | null;
}

enum LightnessLevel {
  EXTRA_LIGHT,
  LIGHT,
  NEUTRAL,
  DARK,
  EXTRA_DARK,
}

const options = {
  GTypeName: "KuychiColorModel",
  Properties: {
    color: GObject.ParamSpec.boxed(
      "color",
      "color",
      "color",
      GObject.ParamFlags.WRITABLE,
      Gdk.RGBA,
    ),
    shades: GObject.ParamSpec.jsobject(
      "shades",
      "shades",
      "shades",
      GObject.ParamFlags.READABLE,
    ),
  },
};

class ColorModel extends GObject.Object {
  private _color: Gdk.RGBA | null = null;
  private readonly _shades: Partial<Record<LightnessLevel, Gdk.RGBA>> = {};

  private static readonly _targetLightness = {
    [LightnessLevel.EXTRA_LIGHT]: 0.95,
    [LightnessLevel.LIGHT]: 0.7,
    [LightnessLevel.NEUTRAL]: 0.5,
    [LightnessLevel.DARK]: 0.3,
    [LightnessLevel.EXTRA_DARK]: 0.1,
  };

  public constructor(props?: Partial<ConstructorProps>) {
    super(props);

    if (!this._color) {
      this.color = ColorModel.randomRgba();
    }
  }

  static {
    GObject.registerClass(options, this);
  }

  private static lightnessLevel(lightness: number): LightnessLevel {
    switch (true) {
      case lightness > 0.825:
        return LightnessLevel.EXTRA_LIGHT;

      case lightness > 0.6:
        return LightnessLevel.LIGHT;

      case lightness > 0.4:
        return LightnessLevel.NEUTRAL;

      case lightness > 0.2:
        return LightnessLevel.DARK;

      default:
        return LightnessLevel.EXTRA_DARK;
    }
  }

  private static randomRgba(): Gdk.RGBA {
    return new Gdk.RGBA({
      red: Math.random(),
      green: Math.random(),
      blue: Math.random(),
      alpha: 1,
    });
  }

  public set color(value: Gdk.RGBA | null) {
    if (value === this._color) return;

    this._color = value;
    this.notify("color");

    if (this._color) {
      const {red, green, blue} = this._color;
      const srgb = new Color(sRGB, [red, green, blue]);
      const oklab = srgb.to(OKLab);

      const lightnessLevel = ColorModel.lightnessLevel(oklab.l);
      this._shades[lightnessLevel] = this._color;

      const idealL = ColorModel._targetLightness[lightnessLevel];
      this.generateMissingShades(oklab, oklab.l - idealL);

      this.notify("shades");
    }
  }

  public get shades(): Readonly<Partial<Record<LightnessLevel, Gdk.RGBA>>> {
    return this._shades;
  }

  private generateMissingShades(oklab: Color, adjustmentFactor: number): void {
    const levels = Object.values(LightnessLevel).filter(
      value => typeof value === "number",
    );

    for (const level of levels) {
      if (this._shades[level]) continue;

      const targetL = ColorModel._targetLightness[level] + adjustmentFactor;
      const newOklab = new Color(OKLab, [targetL, oklab.a, oklab.b]);
      const {r: red, g: green, b: blue} = newOklab.to(sRGB);

      this._shades[level] = new Gdk.RGBA({red, green, blue, alpha: 1});
    }
  }
}

export default ColorModel;
