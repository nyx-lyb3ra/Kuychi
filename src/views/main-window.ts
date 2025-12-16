import Adw from "gi://Adw";
import GObject from "gi://GObject";

import {gettext as _} from "gettext";

import ColorModel, {LightnessLevel} from "@/models/color-model.js";
import type ColorPicker from "@/widgets/color-picker.js";
import type ColorButton from "@/widgets/color-button.js";

import Template from "./main-window.ui";

interface ConstructorProps extends Adw.ApplicationWindow.ConstructorProps {
  model: ColorModel | null;
}

const options = {
  GTypeName: "KuychiMainWindow",
  InternalChildren: [
    "extraLightTile",
    "lightTile",
    "neutralTile",
    "darkTile",
    "extraDarkTile",
    "colorPicker",
  ],
  Properties: {
    model: GObject.ParamSpec.object(
      "model",
      "model",
      "model",
      GObject.ParamFlags.READWRITE,
      ColorModel,
    ),
  },
  Template,
};

class MainWindow extends Adw.ApplicationWindow {
  declare private readonly _extraLightTile: ColorButton;
  declare private readonly _lightTile: ColorButton;
  declare private readonly _neutralTile: ColorButton;
  declare private readonly _darkTile: ColorButton;
  declare private readonly _extraDarkTile: ColorButton;
  declare private readonly _colorPicker: ColorPicker;

  declare public model: ColorModel | null;

  public constructor(props?: Partial<ConstructorProps>) {
    super(props);

    if (this.model) {
      this.updateTiles();
      this.model.connect("notify::shades", this.updateTiles.bind(this));

      this._colorPicker.bind_property(
        "color",
        this.model,
        "color",
        GObject.BindingFlags.SYNC_CREATE,
      );
    }
  }

  static {
    GObject.registerClass(options, this);
  }

  private updateTiles(): void {
    if (!this.model) return;

    this._lightTile.color = this.model.shades.get(LightnessLevel.LIGHT) ?? null;
    this._darkTile.color = this.model.shades.get(LightnessLevel.DARK) ?? null;

    this._extraLightTile.color =
      this.model.shades.get(LightnessLevel.EXTRA_LIGHT) ?? null;
    this._extraDarkTile.color =
      this.model.shades.get(LightnessLevel.EXTRA_DARK) ?? null;

    this._neutralTile.color =
      this.model.shades.get(LightnessLevel.NEUTRAL) ?? null;
  }
}

export default MainWindow;
