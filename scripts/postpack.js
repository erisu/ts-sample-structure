const { join, resolve } = require('path');
const { copyFileSync, rmdirSync } = require('fs');

const scripts = resolve(__dirname, '../');
const tmpdir = join(scripts, '.package');

const targetFiles = [
  'postinstall.js',
  'prepack.js',
  'postpack.js'
];

// copy to tmpdir
targetFiles.forEach(file => {
  // move original files back to scripts.
  copyFileSync(join(tmpdir, file), join(scripts, file));
});

// cleanup
rmdirSync(tmpdir, { recursive: true });
