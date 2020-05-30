# Notes for rust library #

## create fat lib for ios ##

* `find target -name "*.a" | grep ios | grep rust | xargs lipo -create -output "libhello_rust-ios.a"`

* "cp `find target -name "*.a" | grep linux | grep rust` libhello_rust-android.a"

* `cp libhello_rust-android.a ../android/hello-jni/jni/libhello_rust-android.a`

* `cp libhello_rust-ios.a ../ios/libhello_rust-ios.a`
