const { join } = require('path');
const { writeFileSync, mkdirSync, copyFileSync } = require('fs');

const comment = '// Empty Script: Does Nothing\n';

const eraseFiles = [
  'postinstall.js',
  'prepack.js',
  'postpack.js'
];

const tmpdir = join(__dirname, '.package');
mkdirSync(tmpdir);

// copy to tmpdir
eraseFiles.forEach(file => {
  const originalFileCopy = join(tmpdir, file);
  const filePath = join(__dirname, file);

  copyFileSync(filePath, originalFileCopy);
  writeFileSync(filePath, comment);
});
