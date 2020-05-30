use hex;
use hex_serde;
use serde::{
    de::{self, Deserialize, Deserializer, Unexpected, Visitor},
    ser::{Serialize, Serializer},
};
use serde_derive::Deserialize;
use std::fmt;
use std::path::Path;
use std::fs::File;
use std::io::BufReader;
use std::io::Read;

use zcash_proofs::prover::LocalTxProver;

use ff::{PrimeField,PrimeFieldRepr};

use pairing::bls12_381::{Bls12, Fr, FrRepr};

use sapling_crypto::jubjub::{edwards};


use zcash_client_backend::{
    proto::compact_formats::CompactOutput,
    constants::mainnet::{HRP_SAPLING_EXTENDED_SPENDING_KEY,HRP_SAPLING_PAYMENT_ADDRESS,B58_PUBKEY_ADDRESS_PREFIX, B58_SCRIPT_ADDRESS_PREFIX},
    encoding::decode_extended_spending_key,
    encoding::encode_payment_address,
    encoding::decode_payment_address,
    encoding::decode_transparent_address
};

use zcash_primitives::{
    merkle_tree::{IncrementalWitness},
    zip32::ExtendedFullViewingKey,
    transaction::components::{Amount, TxOut, OutPoint},
    sapling::Node,
    merkle_tree::Hashable,
    note_encryption::try_sapling_compact_note_decryption,
    transaction::builder::Builder,
    JUBJUB,
};

//use bitcoin_zcash::util::privkey::PrivKey;
use bitcoin::util::key::PrivateKey;
//use bitcoin::util::address::Address;
//use bitcoin::network::constants::Network::{Bitcoin};
use secp256k1::{Secp256k1};
use std::str::FromStr;


#[derive(Debug, Clone, Copy)]
pub struct BitcoinUint256([u8; 32]);

impl Serialize for BitcoinUint256 {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let mut data = self.0.to_vec();
        data.reverse();
        serializer.serialize_str(&hex::encode(data))
    }
}

impl<'de> Deserialize<'de> for BitcoinUint256 {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        deserializer.deserialize_any(BitcoinUint256Visitor)
    }
}

struct BitcoinUint256Visitor;

impl<'de> Visitor<'de> for BitcoinUint256Visitor {
    type Value = BitcoinUint256;

    fn expecting(&self, formatter: &mut fmt::Formatter) -> fmt::Result {
        formatter.write_str("a 32-byte array")
    }

    fn visit_str<E>(self, s: &str) -> Result<Self::Value, E>
    where
        E: de::Error,
    {
        if s.len() == 64 {
            match hex::decode(s) {
                Ok(mut data) => {
                    data.reverse();
                    let mut hash = [0u8; 32];
                    hash.copy_from_slice(&data);
                    Ok(BitcoinUint256(hash))
                }
                Err(_e) => Err(de::Error::invalid_value(Unexpected::Str(s), &self)),
            }
        } else {
            Err(de::Error::invalid_value(Unexpected::Str(s), &self))
        }
    }
}

#[allow(non_snake_case)]
#[derive(Deserialize, Clone)]
pub struct ShieldedOutputResult {
    pub height: u32,
    pub txindex: u32,
    pub shieldedoutindex: u32,
    pub cmu: BitcoinUint256,
    pub ephemeralKey: BitcoinUint256,
    #[serde(with = "hex_serde")]
    pub encCiphertext: Vec<u8>,
    #[serde(with = "hex_serde")]
    pub outCiphertext: Vec<u8>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ReturnOutputs {
    pub height: u32,
    pub txindex: u32,
    pub shieldedoutindex: u32,
    pub decrypted: String,
    pub account: String,
    pub value: String,
}

impl ReturnOutputs {
    fn new() -> ReturnOutputs {
        ReturnOutputs {height: 0, txindex: 0, shieldedoutindex: 0, decrypted: "False".to_string(), account: "".to_string(), value: "".to_string()}
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct WitnessReturn {
    pub height: u32,
    pub txindex: u32,
    pub shieldedoutindex: u32,
    pub value: String,
    pub witness: String,
    pub nullifier: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct IncrementWitness {
    pub cmu: BitcoinUint256,
    pub witness: String,
    pub root: String,
}

#[allow(non_snake_case)]
#[derive(Serialize, Deserialize, Clone)]
pub struct TransactionInputs {
    pub spend_path: String,
    pub output_path: String,
    pub data_path: String,
    pub amount: String,
    pub fee: String,
    pub input_type: String,
    pub payment_address: String,
    pub height: String,
    pub PrivateKey: String,
    pub extended_spending_key: String,
}

#[allow(non_snake_case)]
#[derive(Serialize, Deserialize, Clone)]
pub struct TransactionFiles {
    pub filename: Vec<String>
}

#[allow(non_snake_case)]
#[derive(Serialize, Deserialize, Clone)]
pub struct TransactionTInputs {
    pub t_inputs:Vec<Utxo>
}

#[allow(non_snake_case)]
#[derive(Serialize, Deserialize, Clone)]
pub struct Utxo {
    txid: String,
    vout: String,
    satoshis: String,
    scriptPubKey: String
}

#[allow(non_snake_case)]
#[derive(Serialize, Deserialize, Clone)]
pub struct TransactionZInputs {
    pub z_inputs: Vec<NoteInputs>
}

#[allow(non_snake_case)]
#[derive(Serialize, Deserialize, Clone)]
pub struct NoteInputs {
    pub witness: String,
    pub cmu: BitcoinUint256,
    pub ephemeralKey: BitcoinUint256,
    #[serde(with = "hex_serde")]
    pub encCiphertext: Vec<u8>,
}

#[allow(non_snake_case)]
#[derive(Serialize, Deserialize, Clone)]
pub struct TransactionResults {
    pub result: String,
    pub error: String,
}

impl TransactionResults {
    fn new() -> TransactionResults {
        TransactionResults { result: "".to_string(), error: "".to_string()}
    }
}


pub fn read_file(filepath: &str) -> String {
    let file = File::open(filepath)
        .expect("could not open file");
    let mut buffered_reader = BufReader::new(file);
    let mut contents = String::new();
    let _number_of_bytes: usize = match buffered_reader.read_to_string(&mut contents) {
        Ok(number_of_bytes) => number_of_bytes,
        Err(_err) => 0
    };

    contents
}


pub fn increment_witness (str_data: &str) -> String {

    let data: IncrementWitness = serde_json::from_str(&str_data).unwrap();

    let mut witness = IncrementalWitness::<Node>::read(&hex::decode(data.witness.clone()).unwrap()[..]).unwrap();

    let mut repr = FrRepr::default();
    let tmp = data.cmu.0.to_vec();
    if repr.read_le(&tmp[..]).is_err() {
        //continue,
    }

    let cmu = match Fr::from_repr(repr) {
        Ok(cmu) => cmu,
        //Err(_) => continue,
        Err(_) => panic!(),
    };

    let node = Node::new(cmu.into_repr());
    witness.append(node).unwrap();

    let mut new_witness = Vec::new();
    witness.write(&mut new_witness).unwrap();

    let mut root = [0u8; 32];
    witness.root()
        .write(&mut root[..])
        .expect("length is 32 bytes");
    root.reverse();

    let ret = json!({
        "cmu": "",
        "witness": hex::encode(&new_witness[..]),
        "root": hex::encode(root),
    });

    serde_json::to_string(&ret).unwrap()

}

pub fn decrypt_note_ivk (str_tx: &str, priv_key: &str) -> String {
    //new return string
    let mut rt = ReturnOutputs::new();

    //Convert String to encrypted note
    let tx: ShieldedOutputResult = serde_json::from_str(&str_tx).unwrap();
    let mut cout = CompactOutput::new();
    cout.set_cmu(tx.cmu.0.to_vec());
    cout.set_epk(tx.ephemeralKey.0.to_vec());
    cout.set_ciphertext(tx.encCiphertext[..52].to_vec());

    //Convert String to ExtendedSpendingKey
    let extsk = decode_extended_spending_key(HRP_SAPLING_EXTENDED_SPENDING_KEY, priv_key).ok().unwrap().unwrap();

    //Derive Incoming Viweing key
    let extfvk = ExtendedFullViewingKey::from(&extsk);
    let ivk = extfvk.fvk.vk.ivk();

    //Decrypt Note
    let mut repr = FrRepr::default();
    if repr.read_le(&cout.cmu[..]).is_err() {
        return serde_json::to_string(&rt).unwrap();
    }
    let cmu = match Fr::from_repr(repr) {
        Ok(cmu) => cmu,
        Err(_) => return serde_json::to_string(&rt).unwrap(),
    };

    let epk = match edwards::Point::<Bls12, _>::read(&cout.epk[..], &JUBJUB) {
        Ok(p) => match p.as_prime_order(&JUBJUB) {
            Some(epk) => epk,
            None => return serde_json::to_string(&rt).unwrap(),
        },
        Err(_) => return serde_json::to_string(&rt).unwrap(),
    };

    let ct = cout.ciphertext;
    let (note, to) = match try_sapling_compact_note_decryption(&ivk, &epk, &cmu, &ct) {
        Some(ret) => ret,
        None => return serde_json::to_string(&rt).unwrap(),
    };

    rt.height = tx.height;
    rt.txindex = tx.txindex;
    rt.shieldedoutindex = tx.shieldedoutindex;
    rt.decrypted = "True".to_string();
    rt.account = encode_payment_address(HRP_SAPLING_PAYMENT_ADDRESS,&to);
    rt.value = format!("{}", note.value);

    return serde_json::to_string(&rt).unwrap()
}

pub fn decrypt_note_nullifier (str_tx: &str, priv_key: &str, str_wit: &str) -> String {
    //new return witness
    let mut wt: WitnessReturn = serde_json::from_str(&str_wit).unwrap();

    //Convert String to encrypted note
    let tx: ShieldedOutputResult = serde_json::from_str(&str_tx).unwrap();
    let mut cout = CompactOutput::new();
    cout.set_cmu(tx.cmu.0.to_vec());
    cout.set_epk(tx.ephemeralKey.0.to_vec());
    cout.set_ciphertext(tx.encCiphertext[..52].to_vec());

    //Convert String to ExtendedSpendingKey
    let extsk = decode_extended_spending_key(HRP_SAPLING_EXTENDED_SPENDING_KEY, priv_key).ok().unwrap().unwrap();

    //Derive Incoming Viweing key
    let extfvk = ExtendedFullViewingKey::from(&extsk);
    let ivk = extfvk.fvk.vk.ivk();

    //Decrypt Note
    let mut repr = FrRepr::default();
    if repr.read_le(&cout.cmu[..]).is_err() {
        return serde_json::to_string(&wt).unwrap();
    }
    let cmu = match Fr::from_repr(repr) {
        Ok(cmu) => cmu,
        Err(_) => return serde_json::to_string(&wt).unwrap(),
    };

    let epk = match edwards::Point::<Bls12, _>::read(&cout.epk[..], &JUBJUB) {
        Ok(p) => match p.as_prime_order(&JUBJUB) {
            Some(epk) => epk,
            None => return serde_json::to_string(&wt).unwrap(),
        },
        Err(_) => return serde_json::to_string(&wt).unwrap(),
    };

    let ct = cout.ciphertext;
    let (note, _to) = match try_sapling_compact_note_decryption(&ivk, &epk, &cmu, &ct) {
        Some(ret) => ret,
        None => return serde_json::to_string(&wt).unwrap(),
    };

    //Calculate Nullifier
    let witness = IncrementalWitness::<Node>::read(&hex::decode(wt.witness.clone()).unwrap()[..]).unwrap();
    let proof_generation_key = extsk.expsk.proof_generation_key(&JUBJUB);

    let mut new_nullifier = [0u8; 32];
    new_nullifier.copy_from_slice(&note.nf(
        &proof_generation_key.into_viewing_key(&JUBJUB),
        witness.position() as u64,
        &JUBJUB,
    ));
    let n = &mut new_nullifier.to_vec().to_owned();
    n.reverse();

    wt.height = tx.height;
    wt.txindex = tx.txindex;
    wt.value =  format!("{}", note.value);
    wt.shieldedoutindex = tx.shieldedoutindex;
    wt.nullifier = format!("{}",hex::encode(&n[..]));

    return serde_json::to_string(&wt).unwrap()
}

pub fn test_transaction(raw_data: &str) -> String {
    let data: TransactionInputs = serde_json::from_str(&raw_data).unwrap();

    let sk = PrivateKey::from_str(&data.PrivateKey).unwrap();
    let secp = Secp256k1::new();
    let addr = sk.to_legacy_address(&secp);
    return addr.to_string()
}

pub fn build_transaction(raw_data: &str, t_in: &str, z_in: &str) -> String {

    let mut rtx = TransactionResults::new();

    //Convert JSON to TransactionInputs
    let data: TransactionInputs = serde_json::from_str(&raw_data).unwrap();
    let int_amount: i64 = data.amount.trim().parse().unwrap();
    let int_height: u32 = data.height.trim().parse().unwrap();

    //Create New Transaction
    let mut trans = Builder::new(int_height);

    //Set Transaction Fee
    let int_fee: i64 = data.fee.trim().parse().unwrap();
    let fee: Amount = Amount::from_i64(int_fee).unwrap();
    trans.set_fee(fee);

    //T Address Keys
    let sk = PrivateKey::from_str(&data.PrivateKey).unwrap();
    let secp = Secp256k1::new();
    let pk = sk.to_legacy_address(&secp).to_string();
    let t_origin_address = decode_transparent_address(&B58_PUBKEY_ADDRESS_PREFIX, &B58_SCRIPT_ADDRESS_PREFIX, &pk.as_str());

    //Zaddress Keys
    let extsk = match decode_extended_spending_key(HRP_SAPLING_EXTENDED_SPENDING_KEY, data.extended_spending_key.clone().as_str()) {
        Ok(ret) => ret.unwrap(),
        Err(_) => return serde_json::to_string(&json!({"result":"Invalid spending key", "error":"true"})).unwrap()
    };

    let z_origin_address = &extsk.default_address().unwrap().1;
    let extfvk = ExtendedFullViewingKey::from(&extsk);
    let ivk = extfvk.fvk.vk.ivk();
    let ovk = extfvk.fvk.ovk;

    //Payment Addresses
    let z_payment_address = decode_payment_address(HRP_SAPLING_PAYMENT_ADDRESS, data.payment_address.clone().as_str());
    let t_payment_address = decode_transparent_address(&B58_PUBKEY_ADDRESS_PREFIX, &B58_SCRIPT_ADDRESS_PREFIX, &data.payment_address.as_str());

    //Must have a valid payment address
    if z_payment_address.is_err() && t_payment_address.is_err() {
        return serde_json::to_string(&json!({"result":"Invalid payment address", "error":"true"})).unwrap()
    }

    //input total
    let mut total = 0;
    let tran_type: u32 = data.input_type.trim().parse().unwrap();

    //T inputs
    let mut outpoints: Vec<OutPoint> = Vec::new();
    let mut txouts: Vec<TxOut> = Vec::new();
    if tran_type == 0 {

        let t_data: TransactionFiles= serde_json::from_str(&t_in).unwrap();
        let t_files = t_data.filename;
        let mut t_inputs: Vec<Utxo> = Vec::new();

        for i in 0..t_files.len() {
            let file_path = data.data_path.clone() + &t_files[i].as_str();
            let file_content: String = read_file(file_path.as_str());
            let utxos: TransactionTInputs = serde_json::from_str(&file_content).unwrap();
            for i in 0..utxos.t_inputs.len() {
                t_inputs.push(utxos.t_inputs[i].clone());
            }
        }


        for i in 0..t_inputs.len() {

            let mut utxout = TxOut::new();

            //Utxo Value
            let utxo_value: i64 = t_inputs[i].satoshis.trim().parse().unwrap();
            total +=utxo_value;
            utxout.value = Amount::from_i64(utxo_value).unwrap();
            utxout.script_pubkey = t_origin_address.clone().unwrap().unwrap().script();
            txouts.push(utxout);

            //Outpoint
            let s = &t_inputs[i].txid;
            let mut data = hex::decode(s).unwrap();
            data.reverse();
            let mut hash = [0u8; 32];
            hash.copy_from_slice(&data);

            let n: u32 = t_inputs[i].vout.trim().parse().unwrap();
            let uoutpoint = OutPoint::new(hash,n);
            outpoints.push(uoutpoint);
        }

        //Add t inputs to transaction
        for i in 0..txouts.len() {
            trans
                .add_transparent_input(
                    sk.clone().into_secret_key(),
                    outpoints[i].clone(),
                    txouts[i].clone()
                ).unwrap();
        }
    }

    //Z inputs
    let mut notes = Vec::new();
    if tran_type == 1 {

        let z_data: TransactionFiles= serde_json::from_str(&z_in).unwrap();
        let z_files = z_data.filename;
        let mut z_inputs: Vec<NoteInputs> = Vec::new();

        for i in 0..z_files.len() {

            let file_path = data.data_path.clone() + &z_files[i].as_str();
            let file_content: String = read_file(file_path.as_str());
            let note_inputs: TransactionZInputs = serde_json::from_str(&file_content).unwrap();
            for i in 0..note_inputs.z_inputs.len() {
                z_inputs.push(note_inputs.z_inputs[i].clone());
            }
        }

        for i in 0..z_inputs.len() {

            let tx = &z_inputs[i];
            let mut cout = CompactOutput::new();
            cout.set_cmu(tx.cmu.0.to_vec());
            cout.set_epk(tx.ephemeralKey.0.to_vec());
            cout.set_ciphertext(tx.encCiphertext[..52].to_vec());

            //Decrypt Note
            let mut repr = FrRepr::default();
            if repr.read_le(&cout.cmu[..]).is_err() {
                return serde_json::to_string(&json!({"result":"Invalid cmu", "error":"true"})).unwrap();
            }
            let cmu = match Fr::from_repr(repr) {
                Ok(cmu) => cmu,
                Err(_) => return serde_json::to_string(&json!({"result":"Invalid cmu", "error":"true"})).unwrap(),
            };

            let epk = match edwards::Point::<Bls12, _>::read(&cout.epk[..], &JUBJUB) {
                Ok(p) => match p.as_prime_order(&JUBJUB) {
                    Some(epk) => epk,
                    None => return serde_json::to_string(&json!({"result":"Invalid epk", "error":"true"})).unwrap(),
                },
                Err(_) => return serde_json::to_string(&json!({"result":"Invalid epk", "error":"true"})).unwrap(),
            };

            let ct = cout.ciphertext;
            let (note, _to) = match try_sapling_compact_note_decryption(&ivk, &epk, &cmu, &ct) {
                Some(ret) => ret,
                None => return serde_json::to_string(&json!({"result":"Decryption failed", "error":"true"})).unwrap(),
            };

            notes.push(note.clone());
            total += note.value as i64;
        }


        //Add Z inputs to transaction
        for i in 0..notes.len() {
            trans
                .add_sapling_spend(
                    extsk.clone(),
                    z_origin_address.diversifier,
                    notes[i].clone(),
                    IncrementalWitness::read(&hex::decode(z_inputs[i].witness.clone()).unwrap()[..]).unwrap(),
                )
                .unwrap();
        }
    }

    if total >= int_amount + int_fee {
    //Add T output
        if t_payment_address.is_ok() {
            trans.add_transparent_output(
                &t_payment_address.unwrap().unwrap(),
                Amount::from_i64(int_amount).unwrap())
            .unwrap();
        }

        //Add Z Output
        if z_payment_address.is_ok() {
            trans.add_sapling_output(
                ovk.clone(),
                z_payment_address.unwrap().unwrap().clone(),
                Amount::from_i64(int_amount).unwrap(),
                None)
            .unwrap();
        }
    }


    if total - int_amount - int_fee > 0 {
    //Z Change if spending from Z address
        if notes.len() > 0 {
        //Add Change Output back to sending address
            trans.add_sapling_output(
                ovk.clone(),
                z_origin_address.clone(),
                Amount::from_i64(total-int_amount-int_fee).unwrap(),
                None)
            .unwrap();
        }

        //T Change if sending from T Address
        if txouts.len() > 0 {
            trans.add_transparent_output(
                &t_origin_address.unwrap().unwrap(),
                Amount::from_i64(total-int_amount-int_fee).unwrap())
            .unwrap();
        }
    }

    let spend_param_path = Path::new(&data.spend_path);
    let output_param_path = Path::new(&data.output_path);
    let tx_prover = LocalTxProver::new(&spend_param_path, &output_param_path);
    let (tx, _tx_metadata) = trans.build(1935765626, tx_prover).ok().unwrap();
    let mut tmp = Vec::new();
    match tx.write(&mut tmp) {
        Ok(ret) => ret,
        Err(_) => return serde_json::to_string(&json!({"result":"tx write failed", "error":"true"})).unwrap()
    }

    rtx.result = hex::encode(&tmp[..]);
    rtx.error = "false".to_string();
    serde_json::to_string(&rtx).unwrap()

}
