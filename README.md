# Pirate Chain Mobile Wallet

**NOTICE:**
The Pirate Chain mobile wallet is unaudited code, and developed by Forge. We welcome code audits on this work. As such, we do not recommend storing a significant amount of funds on this wallet until it is fully audited.


Pirate Chain mobile app built using Redux, React and Webpack.

Use Node v12, installed with nvm
https://github.com/nvm-sh/nvm

Use Cordova v11 with Java Version 11
https://cordova.apache.org/docs/en/latest/guide/cli/



## Setup instructions

```
npm install -g cordova
git clone https://github.com/PirateNetwork/Skull-Island.git
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
