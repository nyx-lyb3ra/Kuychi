import GObject from "gi://GObject";

import Color from "colorjs.io";

interface ConstructorProps extends GObject.Object.ConstructorProps {
  color: Color | null;
}

export enum LightnessLevel {
  EXTRA_LIGHT,
  LIGHT,
  NEUTRAL,
  DARK,
  EXTRA_DARK,
}

const options = {
  GTypeName: "KuychiColorModel",
  Properties: {
    color: GObject.ParamSpec.jsobject(
      "color",
      "color",
      "color",
      GObject.ParamFlags.READWRITE,
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
  private _color: Color | null = null;
  private readonly _shades = new Map<LightnessLevel, Color>();

  public constructor(props?: Partial<ConstructorProps>) {
    super(props);
  }

  static {
    GObject.registerClass(options, this);
  }

  private static lightnessLevel(lightness: number): LightnessLevel {
    switch (true) {
      case lightness > 90:
        return LightnessLevel.EXTRA_LIGHT;

      case lightness <= 90 && lightness > 80:
        return LightnessLevel.LIGHT;

      case lightness < 20 && lightness >= 10:
        return LightnessLevel.DARK;

      case lightness < 10:
        return LightnessLevel.EXTRA_DARK;

      default:
        return LightnessLevel.NEUTRAL;
    }
  }

  public get color(): Color | null {
    return this._color;
  }

  public set color(value: Color | null) {
    if (!value && !this._color) return;
    if (value && this._color && value.equals(this._color)) return;

    this._color = value;
    this.notify("color");

    if (this._color) {
      this._shades.clear();

      const lab = this._color.to("Lab");
      const lightnessLevel = ColorModel.lightnessLevel(lab.l);
      this._shades.set(lightnessLevel, this._color);

      this.generateMissingShades(lab, lightnessLevel);

      this.notify("shades");
    }
  }

  public get shades(): ReadonlyMap<LightnessLevel, Color> {
    return this._shades;
  }

  private generateMissingShades(lab: Color, baseLevel: LightnessLevel): void {
    const levels = Object.values(LightnessLevel).filter(
      value => typeof value === "number",
    );

    for (const level of levels) {
      if (this._shades.has(level)) continue;

      const levelDifference = baseLevel - level;
      const targetL = lab.l + levelDifference * 10;
      const clampedL = Math.max(0, Math.min(100, targetL));

      this._shades.set(level, new Color("Lab", [clampedL, lab.a, lab.b]));
    }
  }
}

export default ColorModel;
