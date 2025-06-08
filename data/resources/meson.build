gnome.compile_resources(
  app_id,
  configure_file(
    configuration: {'prefix': '/' + app_id.replace('.', '/')},
    input: f'@app_id@.gresource.xml.in',
    output: f'@app_id@.gresource.xml',
  ),
  gresource_bundle: true,
  install: true,
  install_dir: pkgdatadir,
)
