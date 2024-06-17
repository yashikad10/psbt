"use server"

import * as bitcoin from "bitcoinjs-lib";
import secp256k1 from "@bitcoinerlab/secp256k1";


export async function updateOrder( signedPsbt: string){

    if(!signedPsbt){
    throw Error("Data missing");
    }

    try{
         const url =
      process.env.NEXT_PUBLIC_NETWORK === "testnet"
        ? `https://mempool.space/testnet/api/tx`
        : `https://mempool-api.ordinalnovus.com/tx`;
        
        bitcoin.initEccLib(secp256k1);

        let parsedPsbt = bitcoin.Psbt.fromBase64(signedPsbt);
    for (let i = 0; i < parsedPsbt.data.inputs.length; i++) {
      try {
        parsedPsbt.finalizeInput(i);
      } catch (e) {
        console.error(`Error finalizing input at index ${i}: ${e}`);
      }
    }
    const signed_psbt_hex = parsedPsbt.extractTransaction().toHex();

    const broadcastRes = await fetch(url, {
        method: "post",
        body: signed_psbt_hex,
      });
  
      if (broadcastRes.status != 200) {
        throw Error(
          "error broadcasting tx " +
            broadcastRes.statusText +
            "\n\n" +
            (await broadcastRes.text())
        );
      }
      const txid = await broadcastRes.text();

    //   const result = await FileData.updateOne(
    //     { order_id },
    //     {
    //       $set: {
    //         txid,
    //         status: "payment received",
    //       },
    //     }
    //   );

      return { success: true, message: "Order updated successfully", txid };


    } catch (error){
        console.error("error");

    }


}