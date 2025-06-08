import Adw from "gi://Adw";
import Gdk from "gi://Gdk";
import Gio from "gi://Gio";
import GObject from "gi://GObject";
import Gtk from "gi://Gtk";
import Xdp from "gi://Xdp";
import XdpGtk4 from "gi://XdpGtk4";

import Template from "./color-picker.ui";
import {t} from "try";
import {gerrorMatches} from "@/utils/error.js";

interface ConstructorProps extends Gtk.Widget.ConstructorProps {
  color: Gdk.RGBA | null;
}

Gio._promisify(Xdp.Portal.prototype, "pick_color");

const options = {
  CssName: "kuychi-color-picker",
  GTypeName: "KuychiColorPicker",
  InternalChildren: ["entry"],
  Properties: {
    color: GObject.ParamSpec.boxed(
      "color",
      "color",
      "color",
      GObject.ParamFlags.READWRITE,
      Gdk.RGBA,
    ),
  },
  Template,
};

class ColorPicker extends Gtk.Widget {
  declare private readonly _entry: Gtk.Entry;

  declare public color: Gdk.RGBA | null;

  public constructor(props?: Partial<ConstructorProps>) {
    super(props);

    const styleManager = Adw.StyleManager.get_default();

    this.color = styleManager.accentColorRgba;
    this._entry.text = this.color.to_string();
  }

  static {
    GObject.registerClass(options, this);
  }

  private handleChanged(): void {
    const newColor = new Gdk.RGBA();
    const ok = newColor.parse(this._entry.text);

    if (ok) {
      this.color = newColor;
    }
  }

  private async handleIconRelease(
    _source: Gtk.Entry,
    iconPos: Gtk.EntryIconPosition,
  ): Promise<void> {
    if (iconPos !== Gtk.EntryIconPosition.SECONDARY) return;

    const portal = new Xdp.Portal();
    const parent = XdpGtk4.parent_new_gtk(this.root as Gtk.Window);

    const [pickOk, pickErr, result] = await t(portal.pick_color(parent, null));

    if (!pickOk) {
      if (!gerrorMatches(pickErr, Gio.IOErrorEnum, Gio.IOErrorEnum.CANCELLED)) {
        console.error(pickErr);
      }

      return;
    }

    const [r, g, b] = result.deepUnpack<[number, number, number]>();

    this.color = new Gdk.RGBA({red: r, green: g, blue: b, alpha: 1});
    this._entry.text = this.color.to_string();
  }
}

export default ColorPicker;
