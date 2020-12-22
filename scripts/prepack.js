const { join, relative } = require('path');
const { writeFileSync, mkdirSync, copyFileSync, rmdirSync, existsSync } = require('fs');

const comment = '// Empty Script: Does Nothing\n';

const tmpdir = join(__dirname, '.package');

// pre-cleanup
if (existsSync(tmpdir)) {
  rmdirSync(tmpdir, { recursive: true });
}

// Make a temp directory
mkdirSync(tmpdir);

// Files to copy & update
const targetFiles = [
  'postinstall.js',
  'prepack.js',
  'postpack.js'
];

targetFiles.forEach(file => {
  const originalFileCopy = join(tmpdir, file);
  const filePath = join(__dirname, file);

  // copy to tmpdir
  copyFileSync(filePath, originalFileCopy);

  // replace content
  let content = comment;

  if (file === 'postpack.js') {
    content = `// Safe-Check Post Script
const { resolve } = require('path');
const { existsSync } = require('fs');
const postScript = resolve(__dirname, '${relative(__dirname, originalFileCopy)}');

if (existsSync(postScript)) require(postScript);
`;
  }

  writeFileSync(filePath, content);
});
