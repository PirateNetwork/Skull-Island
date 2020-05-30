#!/bin/bash

#find target -name "*.a" | grep ios | grep rust | xargs lipo -create -output "../ios/libhello_rust-ios.a"

#cp `find target -name "*.a" | grep aarch64-linux | grep rust` ../android/hello-jni/jni/libhello_rust-aarch64.a
#cp `find target -name "*.a" | grep armv7-linux | grep rust` ../android/hello-jni/jni/libhello_rust-arm7.a
#cp `find target -name "*.a" | grep i686-linux | grep rust` ../android/hello-jni/jni/libhello_rust-i686.a

cp ./target/aarch64-linux-android/release/libsapling_rust_lib.so ../android/sapling-jni/libs/arm64-v8a/libsapling-jni.so
cp ./target/armv7-linux-androideabi/release/libsapling_rust_lib.so ../android/sapling-jni/libs/armeabi-v7a/libsapling-jni.so
cp ./target/i686-linux-android/release/libsapling_rust_lib.so ../android/sapling-jni/libs/x86/libsapling-jni.so

#$ANDROID_NDK_HOME/ndk-build -C  ../android/hello-jni/jni
