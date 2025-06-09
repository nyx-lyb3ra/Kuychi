import Adw from "gi://Adw";
import type Gdk from "gi://Gdk";
import Gio from "gi://Gio";
import GObject from "gi://GObject";
import Gtk from "gi://Gtk";
import Xdp from "gi://Xdp";
import XdpGtk4 from "gi://XdpGtk4";

import Color from "colorjs.io";
import {t} from "try";

import {rgbaToColor} from "@/utils/color.js";
import {gerrorMatches} from "@/utils/error.js";

import Template from "./color-picker.ui";

interface ConstructorProps extends Gtk.Widget.ConstructorProps {
  color: Gdk.RGBA | null;
}

Gio._promisify(Xdp.Portal.prototype, "pick_color");

const options = {
  CssName: "kuychi-color-picker",
  GTypeName: "KuychiColorPicker",
  InternalChildren: ["entry"],
  Properties: {
    color: GObject.ParamSpec.jsobject(
      "color",
      "color",
      "color",
      GObject.ParamFlags.READWRITE,
    ),
  },
  Template,
};

class ColorPicker extends Gtk.Widget {
  declare private readonly _entry: Gtk.Entry;

  declare public color: Color | null;

  public constructor(props?: Partial<ConstructorProps>) {
    super(props);

    const styleManager = Adw.StyleManager.get_default();
    this.color = rgbaToColor(styleManager.accentColorRgba);

    this._entry.text = this.color.toString({format: "hex"});
  }

  static {
    GObject.registerClass(options, this);
  }

  private handleChanged(): void {
    const [colorOk, , newColor] = t(() => new Color(this._entry.text));
    if (colorOk) this.color = newColor;
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
    this.color = new Color("sRGB", [r, g, b]);

    this._entry.text = this.color.toString({format: "hex"});
  }
}

export default ColorPicker;
