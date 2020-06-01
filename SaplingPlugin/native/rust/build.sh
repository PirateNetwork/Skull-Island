#!/bin/sh

#set -euo pipefail

# Build the rust project.
#cd cargo
#cargo clean
#cargo test

#cargo lipo --release
export AR=/home/cryptoforge/Dev/new-mobile-wallet/NDK/arm64/bin/aarch64-linux-android-ar
export CC=/home/cryptoforge/Dev/new-mobile-wallet/NDK/arm64/bin/aarch64-linux-android-clang
cargo build --target aarch64-linux-android --release

export AR=/home/cryptoforge/Dev/new-mobile-wallet/NDK/arm/bin/arm-linux-androideabi-ar
export CC=/home/cryptoforge/Dev/new-mobile-wallet/NDK/arm/bin/arm-linux-androideabi-clang
cargo build --target armv7-linux-androideabi --release

export AR=/home/cryptoforge/Dev/new-mobile-wallet/NDK/x86/bin/i686-linux-android-ar
export CC=/home/cryptoforge/Dev/new-mobile-wallet/NDK/x86/bin/i686-linux-android-clang
cargo build --target i686-linux-android --release

#cargo build --target aarch64-linux-android --release --verbose
#cargo build --target armv7-linux-androideabi --release  --verbose
#cargo build --target i686-linux-android --release  --verbose
#cargo build --target x86_64-linux-android --release

# Build the Android project.
#cd ../android
#gradle assembleRelease

# Build the iOS project.
#cd ../ios
#xcodebuild
