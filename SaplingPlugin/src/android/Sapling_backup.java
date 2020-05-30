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



            try {
              ExecutorService es = Executors.newFixedThreadPool(10);
              Future<String> resultTx = es.submit(new BuildSaplingTx(arg1, arg2, arg3));
              String jniMessage = resultTx.get();
              callbackContext.success(jniMessage);
            } catch (Exception e) {
              callbackContext.success("error");
              e.printStackTrace();
            }




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

class BuildSaplingTx implements Callable<String> {
    private String arg1;
    private String arg2;
    private String arg3;

    public BuildSaplingTx(String arg1, String arg2, String arg3){
        this.arg1 = arg1;
        this.arg2 = arg2;
        this.arg3 = arg3;
    }

    @Override
    public String call() throws Exception {
        return SaplingJni.buildTransactionJNI(arg1, arg2, arg3);
    }
}
