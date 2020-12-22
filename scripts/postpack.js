const { join, resolve } = require('path');
const { copyFileSync, rmdirSync } = require('fs');

const comment = '// Empty Script: Does Nothing\n';

const eraseFiles = [
  'postinstall.js',
  'prepack.js',
  'postpack.js'
];

const scripts = resolve(__dirname, '../scripts');
const tmpdir = join(scripts, '.package');

// copy to tmpdir
eraseFiles.forEach(file => {
  copyFileSync(join(tmpdir, file), resolve(scripts, file));
});

rmdirSync(tmpdir, {
  recursive: true
});
