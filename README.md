# Northstar Server Daemon

A Simple Daemon for TitanFall 2 Northstar Server


English|[简体中文]

### Basic Require

* CPU: greater than 4 cores, frequency greater than 2.0GHz
* Memory: greater than 8.0GB
* Operating System: Windows Server or Professional edition

### Software Environment

1. Node.js installed(greater than v16.0 LTS)
2. A valid Northstar server installed

### Install&Configure

1. Download release package to anywhere
2. Modify `index.js`, add your servers' path to `ServerPaths` array
3. Open terminal, change path to `this program root`
4. Run `node index.js` or `npm start`

### Features

* Run with multi servers.
* Automatic online status check and restart.

### Develop

1. Install dependencies, use `yarn` or `npm install --dev`.
2. Modify `index.js`, add your custom codes for new features.
3. You can find all function defines in [develop manual].

### Special Thanks

[@LightBlueCube](https://forums.northstar.cool/user/10)

[NorthstarCN Community](https://forums.northstar.cool)

[English]: /README.md
[简体中文]: /docs/README.ZH-CN.md
[开发者手册]: /docs/DEVELOP.ZH-CN.md
[develop manual]: /docs/DEVELOP.md
