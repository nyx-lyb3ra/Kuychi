import Gdk from "gi://Gdk";
import GObject from "gi://GObject";
import Graphene from "gi://Graphene";
import Gtk from "gi://Gtk";

import type Color from "colorjs.io";

import {colorToRgba} from "@/utils/color.js";

interface ConstructorProps extends Gtk.Widget.ConstructorProps {
  color: Gdk.RGBA | null;
}

const options = {
  GTypeName: "KuychiColorTile",
  Properties: {
    color: GObject.ParamSpec.jsobject(
      "color",
      "color",
      "color",
      GObject.ParamFlags.READWRITE,
    ),
  },
};

class ColorTile extends Gtk.Widget {
  private _color: Color | null = null;

  public constructor(props?: Partial<ConstructorProps>) {
    super(props);
  }

  static {
    GObject.registerClass(options, this);
  }

  public get color(): Color | null {
    return this._color;
  }

  public set color(value: Color | null) {
    if (!value && !this._color) return;
    if (value && this._color && value.equals(this._color)) return;

    this._color = value;
    this.notify("color");

    this.queue_draw();
  }

  public override vfunc_snapshot(snapshot: Gtk.Snapshot): void {
    if (this.color === null) return;

    const rgba = colorToRgba(this.color);

    const width = this.get_width();
    const height = this.get_height();
    const size = new Graphene.Size({height, width});

    const origin = new Graphene.Point({x: 0, y: 0});

    snapshot.append_color(rgba, new Graphene.Rect({origin, size}));
  }
}

export default ColorTile;
