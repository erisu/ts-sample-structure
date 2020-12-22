const { resolve } = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const ROOT_DIR = resolve(__dirname, '..');

async function installAndBuildProject() {
  await exec('npm i --ignore-scripts', {
    cwd: ROOT_DIR
  });

  await exec('npm run build', {
    cwd: ROOT_DIR
  });
};

installAndBuildProject();
