import * as bitcoin from "bitcoinjs-lib";

export interface AddressTxsUtxo {
    txid: string;
    vout: number;
    status: TxStatus;
    value: number;
}
export interface TxStatus {
    confirmed: boolean;
    block_height: number;
    block_hash: string;
    block_time: number;
}

export interface UTXO {
    status: {
      block_hash: string;
      block_height: number;
      block_time: number;
      confirmed: boolean;
    };
    txid: string;
    value: number;
    vout: number;
    tx: bitcoin.Transaction;
  }
