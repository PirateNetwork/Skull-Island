# Pirate Chain Mobile Wallet

**NOTICE:**
The Pirate Chain mobile wallet is unaudited code, and developed by Forge. We welcome code audits on this work. As such, we do not recommend storing a significant amount of funds on this wallet until it is fully audited.


Pirate Chain mobile app built using Redux, React and Webpack.

Use Node v14, installed with nvm, npm version 9.1.3
https://github.com/nvm-sh/nvm

Use Cordova v11 with Java Version 11
https://cordova.apache.org/docs/en/latest/guide/cli/


## Setup Instuctions
1. Clone the repository
```
git clone https://github.com/PirateNetwork/Skull-Island.git
cd Skull-Island
git checkout master
```

2.cordova-plugin-litewallet
This plugin has been added as a submodule due to the need to compile the library binaries for ios.
```
git submodule init
```

## Build instructions
```
npm install -g cordova
cd Skull-Island
git checkout master
cd SaplingMobile
npm install
```

## Android
Requires Android SDK (Recommend Full Studio) and Oracle Java 11 to be installed
```
cordova platform add android@9
npx webpack
cordova prepare android
cordova run android
```


## iOS

In Progress
