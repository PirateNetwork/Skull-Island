package com.sapling.plugin;

import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;
import android.util.Log;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import com.rust.saplingjni.SaplingJni;

public class Sapling extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {

        if (action.equals("greet")) {
            String jniMessage = SaplingJni.stringFromJNI();
            callbackContext.success(jniMessage);

            return true;

        } else if (action.equals("getAddress")) {
            String jniMessage = SaplingJni.getAddressJNI(data.getString(0));
            callbackContext.success(jniMessage);

            return true;

        } else if (action.equals("decryptTransaction")) {
            String jniMessage = SaplingJni.decryptTransactionJNI(data.getString(0), data.getString(1));
            callbackContext.success(jniMessage);

            return true;

        } else if (action.equals("getNullifier")) {
            String jniMessage = SaplingJni.getNullifierJNI(data.getString(0), data.getString(1), data.getString(2));
            callbackContext.success(jniMessage);

            return true;

        } else if (action.equals("buildTransaction")) {
            final String arg1 = data.getString(0);
            final String arg2 = data.getString(1);
            final String arg3 = data.getString(2);

            cordova.getThreadPool().execute(new Runnable() {
                public void run() {
                    callbackContext.success(SaplingJni.buildTransactionJNI(arg1, arg2, arg3)); // Thread-safe.
                }
            });

            return true;

        } else if (action.equals("testTransaction")) {
            String jniMessage = SaplingJni.testTransactionJNI(data.getString(0));
            callbackContext.success(jniMessage);

            return true;

        } else if (action.equals("incrementWitness")) {
            String jniMessage = SaplingJni.incrementWitnessJNI(data.getString(0));
            callbackContext.success(jniMessage);

            return true;

        } else {
            return false;
        }
    }
}
