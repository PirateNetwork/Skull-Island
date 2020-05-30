
//pub mod block;

// use std::path::Path;
// use zcash_proofs::prover::LocalTxProver;
//
// use log::Level;
// use android_logger::Config;
//
// use block::ShieldedOutputResult;
//
// use ff::{PrimeField,PrimeFieldRepr};
//
// use pairing::bls12_381::{Bls12, Fr, FrRepr};
//
// use zcash_client_backend::{
//     proto::compact_formats::CompactOutput,
//     encoding::{decode_payment_address,decode_extended_spending_key},
//     constants::mainnet::{HRP_SAPLING_PAYMENT_ADDRESS,HRP_SAPLING_EXTENDED_SPENDING_KEY},
// };
//
// use zcash_primitives::{
//     //merkle_tree::{IncrementalWitness},
//     zip32::ExtendedFullViewingKey,
//     //sapling::Node,
//     //note_encryption::try_sapling_compact_note_decryption,
//     //JUBJUB,
// };
//



// pub fn build_transaction(raw_data: &str) -> String {
//
//     let rtx = TransactionResults::new();
//
//     if cfg!(target_os="android") {
//         debug!("this is a debug # {}", 1);
//     }
//     //Convert JSON to TransactionInputs
//     let data: TransactionInputs = serde_json::from_str(&raw_data).unwrap();
//
//     let int_fee: i64 = data.fee.trim().parse().unwrap();
//     let int_amount: i64 = data.amount.trim().parse().unwrap();
//     let int_height: u32 = data.height.trim().parse().unwrap();
//     let address = decode_payment_address(HRP_SAPLING_PAYMENT_ADDRESS, data.payment_address.as_str()).ok().unwrap().unwrap();
//     let extsk = decode_extended_spending_key(HRP_SAPLING_EXTENDED_SPENDING_KEY, data.extended_spending_key.clone().as_str()).ok().unwrap().unwrap();
//     let change_address = &extsk.default_address().unwrap().1;
//     let extfvks = [ExtendedFullViewingKey::from(&extsk)];
//     let extfvk = ExtendedFullViewingKey::from(&extsk);
//     let ivk = extfvk.fvk.vk.ivk();
//
//     let mut notes = Vec::new();
//     let mut z_input = data.z_inputs;
//
//     for (index, z_inputs) in z_inputs.enumerate() {
//
//
//
//
//         let tx: ShieldedOutputResult = serde_json::from_str(&data.z_inputs[index].tx).unwrap();
//         let mut cout = CompactOutput::new();
//         cout.set_cmu(tx.cmu.0.to_vec());
//         cout.set_epk(tx.ephemeralKey.0.to_vec());
//         cout.set_ciphertext(tx.encCiphertext[..52].to_vec());
//
//         //Decrypt Note
//         let mut repr = FrRepr::default();
//         if repr.read_le(&cout.cmu[..]).is_err() {
//             return serde_json::to_string(&rtx).unwrap();
//         }
//         let cmu = match Fr::from_repr(repr) {
//             Ok(cmu) => cmu,
//             Err(_) => return serde_json::to_string(&rtx).unwrap(),
//         };
//
//         let epk = match edwards::Point::<Bls12, _>::read(&cout.epk[..], &JUBJUB) {
//             Ok(p) => match p.as_prime_order(&JUBJUB) {
//                 Some(epk) => epk,
//                 None => return serde_json::to_string(&rtx).unwrap(),
//             },
//             Err(_) => return serde_json::to_string(&rtx).unwrap(),
//         };
//
//         let ct = cout.ciphertext;
//         let (note, to) = match try_sapling_compact_note_decryption(&ivk, &epk, &cmu, &ct) {
//             Some(ret) => ret,
//             None => return serde_json::to_string(&rtx).unwrap(),
//         };
//
//
//         notes.push(note);
//
//
//
//
//     }
//
//
//
//
//
//     if cfg!(target_os="android") {
//         debug!("this is a debug # {}", 2);
//     }
//     let spend_param_path = Path::new(&data.spend_path);
//     if cfg!(target_os="android") {
//         debug!("this is a debug # {}", 3);
//     }
//
//     let output_param_path = Path::new(&data.output_path);
//     if cfg!(target_os="android") {
//         debug!("this is a debug # {}", 4);
//     }
//     let tx_prover = LocalTxProver::new(&spend_param_path, &output_param_path);
//     if cfg!(target_os="android") {
//         debug!("this is a debug # {}", 5);
//     }
//     let result = json!({
//         "result": "No Panic!!!",
//         "error": "false"
//     });
//     if cfg!(target_os="android") {
//         debug!("this is a debug # {}", 6);
//     }
//     serde_json::to_string(&result).unwrap()
//
// }
