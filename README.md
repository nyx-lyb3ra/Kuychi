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

![A screenshot showing the main window of K’uychi](./data/screenshots/screenshot1.png)

## License

[K’uychi](https://codeberg.org/nyx_lyb3ra/kuychi) © 2025 by
[[nyx]](https://nyx.liber.ar/) is licensed under
[Blue Oak Model License 1.0.0](./LICENSE.md).
