import Adw from "gi://Adw";
import GLib from "gi://GLib";
import GObject from "gi://GObject";

import {gettext as _} from "gettext";

import ColorModel, {LightnessLevel} from "@/models/color-model.js";
import type ColorTile from "@/widgets/color-tile.js";

import Template from "./main-window.ui";

interface ConstructorProps extends Adw.ApplicationWindow.ConstructorProps {
  model?: ColorModel | null;
}

const options = {
  GTypeName: "KuychiMainWindow",
  InternalChildren: [
    "extraLightTile",
    "lightTile",
    "neutralTile",
    "darkTile",
    "extraDarkTile",
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
  declare private readonly _extraLightTile: ColorTile;
  declare private readonly _lightTile: ColorTile;
  declare private readonly _neutralTile: ColorTile;
  declare private readonly _darkTile: ColorTile;
  declare private readonly _extraDarkTile: ColorTile;

  declare public model: ColorModel | null;

  public constructor(props?: Partial<ConstructorProps>) {
    super(props);

    this.add_action_entries([
      {activate: this.showAboutDialog.bind(this), name: "show-about-dialog"},
    ]);

    this.updateTiles();
    this.model?.connect("notify::shades", this.updateTiles.bind(this));
  }

  static {
    GObject.registerClass(options, this);
  }

  private showAboutDialog(): void {
    const dialog = new Adw.AboutDialog({
      applicationIcon: Config.APP_ID,
      applicationName: GLib.get_application_name() ?? "",
      copyright: "© 2025 [nyx]",
      developerName: "[nyx]",
      developers: ["[nyx] https://nyx.liber.ar/"],
      issueUrl: "https://codeberg.org/nyx_lyb3ra/kuychi/issues",
      license: _(
        "This application comes with absolutely no warranty. See the <a href='https://blueoakcouncil.org/license/1.0.0'>Blue Oak Model License 1.0.0</a> for details.",
      ),
      translatorCredits: _("translator-credits"),
      version: Config.VERSION,
    });

    dialog.present(this);
  }

  private updateTiles(): void {
    if (!this.model) return;

    this._extraLightTile.color =
      this.model.shades[LightnessLevel.EXTRA_LIGHT] ?? null;

    this._lightTile.color = this.model.shades[LightnessLevel.LIGHT] ?? null;
    this._neutralTile.color = this.model.shades[LightnessLevel.NEUTRAL] ?? null;
    this._darkTile.color = this.model.shades[LightnessLevel.DARK] ?? null;

    this._extraDarkTile.color =
      this.model.shades[LightnessLevel.EXTRA_DARK] ?? null;
  }
}

export default MainWindow;
