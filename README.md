# K’uychi

**Color shade generator with copyable hexadecimal values, based on a base
tone.**

## About the Project

K’uychi (which means “rainbow” in Quechua) is a desktop application designed to
facilitate the creation of color palettes. It allows users to select a base
color and, from this, automatically generates a series of “shades” or variants
of that same color (lighter and darker). Each shade generated can be easily
copied in hexadecimal format, making integration into web/UI/UX design or
development projects extremely simple.

The app aims to be a useful tool both for designers who need to explore color
gradients and for developers seeking consistency in their interface palettes.

## Main Features

- **Shade Generation:** From a single color, create a complete range of its
  variants.
- **Copy in Hexadecimal:** One click is all it takes to copy the hexadecimal
  value of any shade.
- **Intuitive Interface:** Designed with GTK and libadwaita for a smooth and
  modern user experience.

## Used Technologies

K’uychi is built on a stack of modern technologies focused on the GNOME
platform:

- **GJS (GNOME JavaScript):** The basis for application development.
- **TypeScript:** Adds static typing and robustness to JavaScript code.
- **esbuild:** Used as a bundler to compile and optimize code.
- **colorjs.io:** Robust and accurate library for color manipulation and shade
  generation.
- **GTK & libadwaita:** Frameworks for building graphical user interfaces,
  following the GNOME HIG (Human Interface Guidelines).
- **Flatpak:** Packaging and development environment for consistent and isolated
  configuration.
- **npm:** The package manager used to manage project dependencies.

## Screenshot

Here you can see K’uychi in action:

![A screenshot showing multiple K’uychi windows](./data/screenshots/screenshot1.png)

## How to Contribute

We would love for you to join this project! K’uychi is constantly evolving, and
all contributions are welcome, whether it be code, UI improvements, bug reports,
or new ideas.

### Prerequisites

To start developing K’uychi, you will only need:

- **Flatpak:** To set up the development environment and run the application.

### Recommended Development Environments

For an optimal development experience with K’uychi, we recommend the following
integrated development environments (IDEs):

- **GNOME Builder:** Native integration with Flatpak and GNOME/GTK projects.
- **VS Code / VSCodium:** With the Flatpak extension to facilitate interaction
  with the development environment.

### Development Environment Setup

Follow these steps to set up your local development environment. The
instructions vary slightly depending on the IDE you choose:

#### Using GNOME Builder

GNOME Builder is designed to work seamlessly with Flatpak and GNOME projects.

1. **Clone the repository:**

   Open GNOME Builder, press “Clone Repository...”, and enter the URL of the
   K’uychi repository: `https://codeberg.org/nyx_lyb3ra/Kuychi.git`

2. **Open and configure the project:**

   Once cloned, Builder should automatically detect the Flatpak configuration
   and project files.

3. **Build and run:**

   Builder will take care of setting up the Flatpak environment, installing
   dependencies, and building/running the application. Simply click the “Run”
   button (the ▶️ button at the header bar) to start.

#### Using VS Code / VSCodium

For VS Code/VSCodium, the key is the Flatpak extension and manual installation
of the necessary SDKs.

1. **Install the Flatpak extension:**

   Open VS Code/VSCodium, go to the extensions section, search for “Flatpak”
   from “Bilal Elmoussaoui,” and install it.

2. **Install the Flatpak dependencies:**

   Make sure you have the following platforms and extensions from the Flatpak
   SDK installed from Flathub. Open a terminal and run:

   ```sh
   flatpak install flathub org.gnome.Sdk//48
   flatpak install flathub org.gnome.Platform//48
   flatpak install flathub org.freedesktop.Sdk.Extension.node24//24.08
   flatpak install flathub org.flatpak.Builder//stable
   ```

3. **Clone and open the project:**

   Use <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>, search for “Git:
   Clone,” and paste the repository URL:
   `https://codeberg.org/nyx_lyb3ra/Kuychi.git`. Once cloned, VS Code will ask
   if you want to open the folder.

4. **Build and run:**

   The Flatpak extension in VS Code will configure the Flatpak development
   environment, install dependencies, and manage the build. You can build and
   run the application directly using:

   - The keyboard shortcut: <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>B</kbd>
   - The Command Palette: <kbd>Ctrl</kbd> + <kbd>P</kbd>, then search for and
     select “Flatpak: Build.”

### Project Structure

The folder structure of K’uychi is similar to that of standard GNOME/GTK
projects:

- `.vscode/`: Includes general settings and recommendations for development in
  VS Code / VSCodium, making it easier to configure the IDE for new
  contributors.
- `bin/`: Contains the files that will act as executable “binaries” for the
  application.
- `data/`: Stores extra files and application resources, such as icons,
  `.desktop` entries, GSettings schemas, and screenshots.
- `patches/`: If patches are needed for npm dependencies, they are stored in
  this folder.
- `po/`: Contains the translation files (.po) for the internationalization of
  the application.
- `scripts/`: Contains help scripts that are used during the application
  compilation and packaging process.
- `src/`: Here you will find all the source code for the application (GJS and
  TypeScript).

## Code of Conduct

To ensure an open and welcoming community, this project adheres to the
[GNOME Code of Conduct](./CODE_OF_CONDUCT.md). We strongly encourage you to read
and respect it before participating in any interaction within this repository!
Your commitment to a positive environment is critical to the success of our
community.

## License

[K’uychi](https://codeberg.org/nyx_lyb3ra/kuychi) © 2025 by
[Naiara Gomez Castro](https://naiara.one/) is licensed under
[Blue Oak Model License 1.0.0](./LICENSE.md).
