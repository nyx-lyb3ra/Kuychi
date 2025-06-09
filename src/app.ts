import Adw from "gi://Adw";
import GLib from "gi://GLib";
import GObject from "gi://GObject";

import ColorModel from "./models/color-model.js";
import MainWindow from "./views/main-window.js";
import ColorButton from "./widgets/color-button.js";
import ColorPicker from "./widgets/color-picker.js";

const options = {GTypeName: "KuychiApp"};

class App extends Adw.Application {
  static {
    GObject.registerClass(options, this);
  }

  public quit(): void {
    super.quit();
  }

  public override vfunc_activate(): void {
    this.activeWindow?.present();
  }

  public override vfunc_startup(): void {
    super.vfunc_startup();

    GLib.set_application_name("K’uychi");
    GLib.set_prgname("kuychi");

    this.add_action_entries([{activate: this.quit.bind(this), name: "quit"}]);
    this.set_accels_for_action("app.quit", ["<Ctrl>Q"]);
    this.set_accels_for_action("window.close", ["<Ctrl>W"]);

    GObject.type_ensure(ColorButton);
    GObject.type_ensure(ColorPicker);

    new MainWindow({application: this, model: new ColorModel()});
  }
}

export default App;
