import Adw from "gi://Adw";
import GLib from "gi://GLib";
import GObject from "gi://GObject";
import Gtk from "gi://Gtk";

import {gettext as _} from "gettext";

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
    this.newWindow();
  }

  public override vfunc_startup(): void {
    super.vfunc_startup();

    GLib.set_application_name("K’uychi");
    GLib.set_prgname("kuychi");

    this.add_action_entries([
      {activate: this.aboutDialog.bind(this), name: "about-dialog"},
      {activate: this.newWindow.bind(this), name: "new-window"},
      {activate: this.quit.bind(this), name: "quit"},
    ]);

    this.set_accels_for_action("app.new-window", ["<Ctrl>N"]);
    this.set_accels_for_action("app.quit", ["<Ctrl>Q"]);
    this.set_accels_for_action("window.close", ["<Ctrl>W"]);

    GObject.type_ensure(ColorButton);
    GObject.type_ensure(ColorPicker);
  }

  private aboutDialog(): void {
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

    dialog.present(this.activeWindow);
  }

  private newWindow(): void {
    const window = new MainWindow({
      application: this,
      model: new ColorModel(),
    });

    window.present();
  }
}

export default App;
