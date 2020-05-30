
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


pub fn get_sapling_address(phrase: &str) -> String {
    //Create key from phrase
    let master = ExtendedSpendingKey::master(phrase.as_bytes());
    let extsk = ExtendedSpendingKey::from_path(
        &master,
        &[
            ChildIndex::from_index(0x80000020), // ZIP 32
            ChildIndex::from_index(0x80000000), // Testnet
            ChildIndex::from_index(0x80000000), // Account 0
        ],
    );

    let extfvks = ExtendedFullViewingKey::from(&extsk);

    // I can mix free-form JSON with data of rust types which I defined
    // and which implement Serialize.
    let data = json!({
        "payment_address": encode_payment_address(HRP_SAPLING_PAYMENT_ADDRESS,&extsk.default_address().unwrap().1),
        "extended_spending_key": encode_extended_spending_key(HRP_SAPLING_EXTENDED_SPENDING_KEY, &extsk),
        "full_viewing_key": encode_extended_full_viewing_key(HRP_SAPLING_EXTENDED_FULL_VIEWING_KEY, &extfvks),
    });

    serde_json::to_string(&data).unwrap()
}
