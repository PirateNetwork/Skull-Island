/*global cordova, module*/

module.exports = {
    getPassPhrase: function (successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "Sapling", "getPassPhrase", []);
    },

    checkPassPhrase: function (passPhrase, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "Sapling", "checkPassPhrase", [passPhrase]);
    },

    getAddress: function (name, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "Sapling", "getAddress", [name]);
    },

    decryptTransaction: function (tx, key, successCallback, errorCallback) {
        var args = []
        args.push(tx)
        args.push(key)
        cordova.exec(successCallback, errorCallback, "Sapling", "decryptTransaction", args);
    },

    decryptOutgoingTransaction: function (tx, key, successCallback, errorCallback) {
        var args = []
        args.push(tx)
        args.push(key)
        cordova.exec(successCallback, errorCallback, "Sapling", "decryptOutgoingTransaction", args);
    },

    getNullifier: function (tx, key, witness, successCallback, errorCallback) {
        var args = []
        args.push(tx)
        args.push(key)
        args.push(witness)
        cordova.exec(successCallback, errorCallback, "Sapling", "getNullifier", args);
    },

    buildTransaction: function (input, tinput, zinput, successCallback, errorCallback) {
        var args = []
        args.push(input)
        args.push(tinput)
        args.push(zinput)
        //console.log(args)
        //console.log('plugin JS step')
        cordova.exec(successCallback, errorCallback, "Sapling", "buildTransaction", args);
    },

    incrementWitness: function (name, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "Sapling", "incrementWitness", [name]);
    },


};
