/*
 * Copyright (C) 2009 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.rust.saplingjni;

public class SaplingJni
{
    /* A native method that is implemented by the
     * 'hello-jni' native library, which is packaged
     * with this application.
     */
    public static native String stringFromJNI();
    public static native String getAddressJNI(final String input);
    public static native String decryptTransactionJNI(final String tx,final String priv_key);
    public static native String getNullifierJNI(final String tx,final String priv_key, final String witness);
    public static native String buildTransactionJNI(final String input, final String tinput, final String zinput);
    public static native String testTransactionJNI(final String input);
    public static native String incrementWitnessJNI(final String input);

    static {
        System.loadLibrary("sapling-jni");
    }
}
