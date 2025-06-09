import Gdk from "gi://Gdk";
import GObject from "gi://GObject";
import Gtk from "gi://Gtk";

import type cairo from "cairo";
import type Color from "colorjs.io";

import Template from "./color-button.ui";

interface ConstructorProps extends Gtk.Widget.ConstructorProps {
  color: Gdk.RGBA | null;
}

const options = {
  CssName: "kuychi-color-button",
  GTypeName: "KuychiColorButton",
  InternalChildren: ["button", "drawingArea"],
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

class ColorButton extends Gtk.Widget {
  private _color: Color | null = null;

  declare private readonly _button: Gtk.Button;
  declare private readonly _drawingArea: Gtk.DrawingArea;

  public constructor(props?: Partial<ConstructorProps>) {
    super(props);
    this._drawingArea.set_draw_func(this.drawFunc.bind(this));
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

    this._drawingArea.queue_draw();

    if (this.color) {
      const oklab = this.color.to("OKLab");
      const [lightness] = oklab.coords;

      if (lightness < 0.5) {
        this.add_css_class("kuychi-dark");
      } else {
        this.remove_css_class("kuychi-dark");
      }
    } else {
      this.remove_css_class("kuychi-dark");
    }
  }

  private drawFunc(
    _source: Gtk.DrawingArea,
    cr: cairo.Context,
    width: number,
    height: number,
  ): void {
    if (!this.color) {
      cr.setSourceRGBA(0, 0, 0, 0);
      cr.paint();
      return;
    }

    const srgb = this.color.to("sRGB");
    const [r, g, b] = srgb.coords;
    const a = srgb.alpha;

    cr.setSourceRGBA(r, g, b, a);

    cr.rectangle(0, 0, width, height);
    cr.fill();
  }

  private handleClicked(): void {
    if (!this.color) return;

    const display = Gdk.Display.get_default();
    if (!display) return;

    const clipboard = display.get_clipboard();
    clipboard.set(this.color.to("sRGB").toString({format: "hex"}));

    this.add_css_class("kuychi-copied");
  }

  private handleMouseLeave(): void {
    this.remove_css_class("kuychi-copied");
  }
}

export default ColorButton;
