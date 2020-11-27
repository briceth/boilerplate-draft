import { execSync } from "child_process";

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const { engines } = require("../package.json");

const execute = (command) => {
  return execSync(command)
    .toString()
    .replace(/(\n|\r)+$/, "");
};

const checkNodeVersion = () => {
  const actualNodeVersion = execute("node --version");
  const expectedNodeVersion = engines.node;

  const [major] = actualNodeVersion.replace("v", "").split(".");
  const [majorExpected] = expectedNodeVersion.replace(">=", "").split(".");

  if (major !== majorExpected) {
    throw new Error(
      `You must install correct node version
       Expected versions:
       Node => ${major}.x.x (actual: ${majorExpected}.x.x)
       How to fix ?
       Node => nvm install ${expectedNodeVersion} && nvm use
      `,
    );
  }
};

checkNodeVersion();
