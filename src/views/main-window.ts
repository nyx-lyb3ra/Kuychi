import Adw from "gi://Adw";
import GLib from "gi://GLib";
import GObject from "gi://GObject";

import {gettext as _} from "gettext";

import Template from "./main-window.ui";

const options = {GTypeName: "KuychiMainWindow", Template};

class MainWindow extends Adw.ApplicationWindow {
  public constructor(props?: Partial<Adw.ApplicationWindow.ConstructorProps>) {
    super(props);

    this.add_action_entries([
      {activate: this.showAboutDialog.bind(this), name: "show-about-dialog"},
    ]);
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
}

export default MainWindow;
