'use client';

import { IUser } from '@/types';
import { useWalletAddress, useSignTx } from 'bitcoin-wallet-adapter';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { updateOrder } from '@/apiHelper/UpdateOrder';


const AddInscriptions = () => {

  const walletDetails = useWalletAddress();
  const [address, setAddress] = useState<string>('');
  const [fee, setFee] = useState<number>();
  const [info, setInfo] = useState<IUser[]>([]);
  const [unsignedPsbtBase64, setUnsignedPsbtBase64] = useState<string>("");
  const [action, setAction] = useState<string>("dummy");
  const [txLink, setTxLink] = useState("");
  const [loading, setLoading] = useState<boolean>();

  const { loading: signLoading, result, error, signTx: sign } = useSignTx();

  const handleAdd =() => {
    if (address && fee !== undefined) {
      const newInfo: IUser = {
        address: address,
        fee: fee,
      };

      setInfo([...info, newInfo]);
      setAddress('');
      setFee(0);
    }
  };

  const handleDelete = (index: number) => {
    setInfo(info.filter((_, i) => i !== index));
  };

  const handlePsbt = async ()=>{

    
    try {
      const allInfo = [...info];
      const body = {
        wallet: walletDetails?.wallet,
        cardinal_address: walletDetails?.cardinal_address,
        ordinal_address: walletDetails?.ordinal_address,
        cardinal_pubkey: walletDetails?.cardinal_pubkey,
        userInfos: allInfo
        
      };

      console.log(body);

      const response = await axios.post('/api/psbt', body, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      setUnsignedPsbtBase64(response.data.psbt);
      console.log(response.data.psbt);
      console.log('PSBT created:', response.data);

    } catch (error) {
      console.error('Error adding address:', error);
      alert('Failed to add');
    }
  }

  const signTx = useCallback(async () => {
    if (!walletDetails) {
      alert("wallet details missing")
      return;
    }
    let inputs = [];
      inputs.push({
        address: walletDetails.cardinal_address,
        publickey: walletDetails.cardinal_pubkey,
        sighash: 1,
        index: [0],
      });
    

    const options: any = {
      psbt: unsignedPsbtBase64,
      network: "Testnet",
      action: "dummy" ,
      inputs,
    };
    // console.log(options, "OPTIONS");

    await sign(options);
  }, [action, unsignedPsbtBase64]);

  const broadcast = async (signedPsbt: string) => {
    try {
      const broadcast_res = await updateOrder(
        
        signedPsbt
      );
      setLoading(false);
        setTxLink(`https://mempool.space/testnet/tx/${broadcast_res?.txid}`);
        window.open(`https://mempool.space/testnet/tx/${broadcast_res?.txid}`,"_blank");
     
  
      
    } catch (err: any) {
      // Track error in broadcasting
      setLoading(false);
      
    }
  };

  useEffect(() => {
    // Handling Wallet Sign Results/Errors
    if (result) {
      // Handle successful result from wallet sign
      console.log("Sign Result:", result);

      if (result) {
        broadcast(result);
      }

      // Additional logic here
    }

    if (error) {
      console.error("Sign Error:", error);
      
      setLoading(false);
      // Additional logic here
    }

    // Turn off loading after handling results or errors
    setLoading(false);
  }, [result, error]);


  return walletDetails ?( 
    <>
    {unsignedPsbtBase64 ? (
      <div className="flex justify-center items-center h-screen">
      <button onClick={signTx} className='bg-gray-700 text-white py-2 px-4 rounded-lg cursor-pointer border border-purple-400 '>Pay now</button>
    </div>
    ): (
      <div className='text-white mt-4 ml-2'>
      <div>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className='m-2 p-2 border border-purple-400 text-black'
        />
        <input
          type="number"
          placeholder="Fee"
          value={fee}
          onChange={(e) => setFee(Number(e.target.value))}
          className='m-2 p-2 border border-purple-400 text-black'
        />
        <button onClick={handleAdd} className='bg-gray-700 text-white py-2 px-4 rounded-lg cursor-pointer border border-purple-400 '>Add</button>
      </div>
      <ul className='space-y-4 w-1/2'>
        {info.map((details, index) => (
          <li key={index} className='m-2 p-4 border border-purple-400 rounded-lg bg-gray-800 flex justify-between items-center'>
            <div>
              <span className='block font-semibold'>ID: {details.address}</span>
              <span className="block">Fee: {details.fee}</span>
            </div>
            <button 
              onClick={() => handleDelete(index)} 
              className='bg-gray-700 text-white py-2 px-4 rounded-lg cursor-pointer border border-purple-400'>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={handlePsbt} className='bg-gray-700 text-white py-2 px-4 rounded-lg cursor-pointer border border-purple-400'>Create Psbt</button>
      </div>
    </div>
    )}
    </>
  ): null
};

export default AddInscriptions;
