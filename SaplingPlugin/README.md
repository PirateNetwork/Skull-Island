# Cordova Hello World Plugin

Simple plugin that demonstrate how to call native rust functions from javascript

Greeting a user with the date string from rust is something that could be done in JavaScript. This plugin provides a simple example demonstrating how Cordova plugins work.

## Preparation

Android NDK and SDK installation

	$ brew install android-sdk
	$ android update and install android-21
	$ brew install android-ndk

iOS latest xcode installation

	install latest xcode and xcode command line tools

Cordova commandline tool installation

	$ brew install nodejs
	$ brew install npm
	$ [sudo] npm install -g cordova@4.3.0

Build the rust cross compiler for android and ios

	$ git clone https://github.com/vmlinz/rust-ios-android
	Follow the instructions of the repo rust-ios-android to build the cross compiler

## Play with the plugin

Goto a diretory where you plan to play with the plugin

	$ cd your-project-root-dir

Clone the plugin

    $ git clone https://github.com/illi-ichi/Rust-PhoneGap cordova-plugin-hello

Build the native rust lib for ios and android optionally

__NOTE__: this step is only needed if you plan to compile the rust native lib yourself

	$ [~/Projects/rust/rust-ios-android/]cargo-all-targets.py build
	$ bash update_libs.sh

Create a new Cordova Project

    $ cordova create hello com.example.helloapp Hello

Copy the prebuilt demo code to the newly created hello demo

	$ cp cordova-plugin-hello/demo/js/index.js hello/www/js/index.js
    
Install the plugin

    $ cd hello
    $ cordova plugin install ../cordova-plugin-hello

Install iOS or Android platform

    $ cordova platform add ios
    $ cordova platform add android
    
Run the code

    $ cordova run ios [--emulator]
    $ cordova run android

## More Info

For more information on setting up Cordova see [the documentation](http://cordova.apache.org/docs/en/4.0.0/guide_cli_index.md.html#The%20Command-Line%20Interface)

For more info on plugins see the [Plugin Development Guide](http://cordova.apache.org/docs/en/4.0.0/guide_hybrid_plugins_index.md.html#Plugin%20Development%20Guide)
