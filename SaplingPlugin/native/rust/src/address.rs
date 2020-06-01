
use zcash_client_backend::{
    encoding::encode_payment_address,
    encoding::encode_extended_spending_key,
    encoding::encode_extended_full_viewing_key,
    constants::mainnet::HRP_SAPLING_EXTENDED_FULL_VIEWING_KEY,
    constants::mainnet::HRP_SAPLING_EXTENDED_SPENDING_KEY,
    constants::mainnet::HRP_SAPLING_PAYMENT_ADDRESS,
};

use zcash_primitives::{
    zip32::{ChildIndex, ExtendedSpendingKey, ExtendedFullViewingKey},
};

use bip39::{Mnemonic, Language};
use rand::{Rng, rngs::OsRng};

pub fn check_pass_phrase(seed_phrase: &str) ->String {
    match Mnemonic::from_phrase(seed_phrase.to_string(), Language::English) {
        Ok(_) => {
            let data = json!({"passPhraseCheck": "Ok"});
            return serde_json::to_string(&data).unwrap()
        },
        Err(_) => {
            let data = json!({"passPhraseCheck": "Error"});
            return serde_json::to_string(&data).unwrap()
        }
    };
}

pub fn get_pass_phrase() -> String {

    let mut seed_bytes = [0u8; 32];
    let mut system_rng = OsRng;
            system_rng.fill(&mut seed_bytes);

    let data = json!({
        "pass_phrase": Mnemonic::from_entropy(&seed_bytes,Language::English,).unwrap().phrase().to_string()
    });

    serde_json::to_string(&data).unwrap()
}

pub fn get_sapling_address(seed_phrase: &str) -> String {

    let mut seed_bytes = [0u8; 32];
    let coin_type: u32 = 141;
    let mut master = ExtendedSpendingKey::master(seed_phrase.as_bytes());

    let mut bip39_result = "ok";

    match Mnemonic::from_phrase(seed_phrase.to_string(), Language::English) {
        Ok(p) => {
            seed_bytes.copy_from_slice(&p.entropy());
            let bip39_seed = bip39::Seed::new(&Mnemonic::from_entropy(&seed_bytes, Language::English).unwrap(), "");
            master = ExtendedSpendingKey::master(bip39_seed.as_bytes());
        },
        Err(_) => {
            bip39_result = "failed";
        }
    };

    let extsk = ExtendedSpendingKey::from_path(
        &master,
        &[
            ChildIndex::Hardened(32), // ZIP 32
            ChildIndex::Hardened(coin_type),
            ChildIndex::Hardened(0), // Account 0
        ],
    );

    let extfvks = ExtendedFullViewingKey::from(&extsk);

    let data = json!({
        "payment_address": encode_payment_address(HRP_SAPLING_PAYMENT_ADDRESS,&extsk.default_address().unwrap().1),
        "extended_spending_key": encode_extended_spending_key(HRP_SAPLING_EXTENDED_SPENDING_KEY, &extsk),
        "full_viewing_key": encode_extended_full_viewing_key(HRP_SAPLING_EXTENDED_FULL_VIEWING_KEY, &extfvks),
        "bip39_status": bip39_result
    });

    serde_json::to_string(&data).unwrap()
}
