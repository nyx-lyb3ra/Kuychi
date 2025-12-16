import Adw from "gi://Adw";
import GLib from "gi://GLib";
import GObject from "gi://GObject";
import Gtk from "gi://Gtk";

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

    this.add_action_entries([
      {activate: this.showAboutDialog.bind(this), name: "show-about-dialog"},
    ]);

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

  private showAboutDialog(): void {
    const dialog = new Adw.AboutDialog({
      applicationIcon: Config.APP_ID,
      applicationName: GLib.get_application_name() ?? "",
      copyright: "© 2025 Naiara Gomez Castro",
      developerName: "Naiara Gomez Castro",
      developers: ["Naiara Gomez Castro https://naiara.one/"],
      issueUrl: "https://codeberg.org/nyx_lyb3ra/kuychi/issues",
      license: _(
        "This application comes with absolutely no warranty. See the " +
          "<a href='https://blueoakcouncil.org/license/1.0.0'>Blue Oak Model License 1.0.0</a> " +
          "for details.",
      ),
      translatorCredits: _("translator-credits"),
      version: Config.VERSION,
    });

    dialog.add_legal_section(
      "Color.js",
      "© 2021 Lea Verou, Chris Lilley",
      Gtk.License.MIT_X11,
      null,
    );

    dialog.add_legal_section(
      "TRY",
      "© 2025 Arthur Fiorette",
      Gtk.License.MIT_X11,
      null,
    );

    dialog.present(this);
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
