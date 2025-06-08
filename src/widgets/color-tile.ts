import Gdk from "gi://Gdk";
import GObject from "gi://GObject";
import Graphene from "gi://Graphene";
import Gtk from "gi://Gtk";

interface ConstructorProps extends Gtk.Widget.ConstructorProps {
  color: Gdk.RGBA | null;
}

const options = {
  GTypeName: "KuychiColorTile",
  Properties: {
    color: GObject.ParamSpec.boxed(
      "color",
      "color",
      "color",
      GObject.ParamFlags.READWRITE,
      Gdk.RGBA,
    ),
  },
};

class ColorTile extends Gtk.Widget {
  private _color: Gdk.RGBA | null = null;

  public constructor(props?: Partial<ConstructorProps>) {
    super(props);
  }

  static {
    GObject.registerClass(options, this);
  }

  public get color(): Gdk.RGBA | null {
    return this._color;
  }

  public set color(value: Gdk.RGBA | null) {
    if (!value && !this._color) return;
    if (value && this._color && value.equal(this._color)) return;

    this._color = value;
    this.notify("color");
    this.queue_draw();
  }

  public override vfunc_snapshot(snapshot: Gtk.Snapshot): void {
    if (this.color !== null) {
      snapshot.append_color(
        this.color,
        new Graphene.Rect({
          origin: new Graphene.Point({x: 0, y: 0}),
          size: new Graphene.Size({
            height: this.get_height(),
            width: this.get_width(),
          }),
        }),
      );
    }
  }
}

export default ColorTile;
