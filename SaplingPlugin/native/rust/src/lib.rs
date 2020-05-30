#![crate_type = "staticlib"]

pub mod address;
pub mod block;
//pub mod send;

extern crate ff;
extern crate pairing;
extern crate sapling_crypto;
extern crate zcash_primitives;
extern crate zcash_client_backend;
extern crate zcash_proofs;
extern crate serde;
extern crate hex;
extern crate hex_serde;
extern crate bitcoin;
extern crate secp256k1;

#[macro_use] extern crate serde_json;
#[macro_use] extern crate serde_derive;

use std::ffi::CString;
use std::os::raw::c_char;

use crate::address::get_sapling_address;
use crate::block::decrypt_note_ivk;
use crate::block::decrypt_note_nullifier;
use crate::block::build_transaction;
use crate::block::test_transaction;
use crate::block::increment_witness;


#[no_mangle]
pub extern "C" fn hello() -> *const c_char {

	let c_to_print = CString::new("date_string".as_bytes()).unwrap();
	c_to_print.as_ptr()
}


/// Expose the JNI interface for android below
#[cfg(target_os="android")]
#[allow(non_snake_case)]
pub mod android {
    extern crate jni;

    use super::*;
    use self::jni::JNIEnv;
    use self::jni::objects::{JClass, JString};
    use self::jni::sys::{jstring};

    #[no_mangle]
    pub unsafe extern "C" fn Java_com_rust_saplingjni_SaplingJni_stringFromJNI(env: JNIEnv) -> jstring {

		let output = env.new_string(format!("{}", "Hello")).expect("Couldn't create java string!");
   		// Finally, extract the raw pointer to return.
   		output.into_inner()
    }

	#[no_mangle]
	pub unsafe extern "C" fn Java_com_rust_saplingjni_SaplingJni_getAddressJNI(env: JNIEnv, _class: JClass, input: JString) -> jstring {

		let input: String = env.get_string(input).expect("Couldn't get java string!").into();
		//generate key
		let results = get_sapling_address(input.as_str());
		//Create string to be passed back to Java
		let output = env.new_string(format!("{}", results)).expect("Couldn't create java string!");
		// Finally, extract the raw pointer to return.
		output.into_inner()
	}

	#[no_mangle]
	pub unsafe extern "C" fn Java_com_rust_saplingjni_SaplingJni_decryptTransactionJNI(env: JNIEnv, _class: JClass, tx: JString, priv_key: JString) -> jstring {

		let tx: String = env.get_string(tx).expect("Couldn't get java string!").into();
		let priv_key: String = env.get_string(priv_key).expect("Couldn't get java string!").into();
		//Decrypt transaction
		let results = decrypt_note_ivk(tx.as_str(),priv_key.as_str());
		//Create string to be passed back to Java
		let output = env.new_string(format!("{}", results)).expect("Couldn't create java string!");
		// Finally, extract the raw pointer to return.
		output.into_inner()
	}

	#[no_mangle]
	pub unsafe extern "C" fn Java_com_rust_saplingjni_SaplingJni_getNullifierJNI(env: JNIEnv, _class: JClass, tx: JString, priv_key: JString, witness: JString) -> jstring {

		let tx: String = env.get_string(tx).expect("Couldn't get java string!").into();
		let priv_key: String = env.get_string(priv_key).expect("Couldn't get java string!").into();
		let witness: String = env.get_string(witness).expect("Couldn't get java string!").into();
		//Decrypt transaction
		let results = decrypt_note_nullifier(tx.as_str(),priv_key.as_str(),witness.as_str());
		//Create string to be passed back to Java
		let output = env.new_string(format!("{}", results)).expect("Couldn't create java string!");
		// Finally, extract the raw pointer to return.
		output.into_inner()
	}

	#[no_mangle]
	pub unsafe extern "C" fn Java_com_rust_saplingjni_SaplingJni_buildTransactionJNI(env: JNIEnv, _class: JClass, input: JString, tinput: JString, zinput: JString) -> jstring {

		let input: String = env.get_string(input).expect("Couldn't get java string!").into();
		let tinput: String = env.get_string(tinput).expect("Couldn't get java string!").into();
		let zinput: String = env.get_string(zinput).expect("Couldn't get java string!").into();
		//generate key
		let results = build_transaction(input.as_str(),tinput.as_str(),zinput.as_str());
		//Create string to be passed back to Java
		let output = env.new_string(format!("{}", results)).expect("Couldn't create java string!");
		// Finally, extract the raw pointer to return.
		output.into_inner()
	}

	#[no_mangle]
	pub unsafe extern "C" fn Java_com_rust_saplingjni_SaplingJni_testTransactionJNI(env: JNIEnv, _class: JClass, input: JString) -> jstring {

		let input: String = env.get_string(input).expect("Couldn't get java string!").into();
		//generate key
		let results = test_transaction(input.as_str());
		//Create string to be passed back to Java
		let output = env.new_string(format!("{}", results)).expect("Couldn't create java string!");
		// Finally, extract the raw pointer to return.
		output.into_inner()
	}

	#[no_mangle]
	pub unsafe extern "C" fn Java_com_rust_saplingjni_SaplingJni_incrementWitnessJNI(env: JNIEnv, _class: JClass, input: JString) -> jstring {

		let input: String = env.get_string(input).expect("Couldn't get java string!").into();
		//generate key
		let results = increment_witness(input.as_str());
		//Create string to be passed back to Java
		let output = env.new_string(format!("{}", results)).expect("Couldn't create java string!");
		// Finally, extract the raw pointer to return.
		output.into_inner()
	}

}
