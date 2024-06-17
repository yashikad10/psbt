import React from "react";
import { Popover } from "@mui/material";
import { useWalletAddress} from "bitcoin-wallet-adapter";
import { FaCopy, FaDiscord, FaPowerOff, FaBitcoin ,FaCircle,FaRegCircle} from "react-icons/fa";



const InnerMenu  = ({open, onClose, disconnect }:any) => {

  
  const walletDetails = useWalletAddress();

  if (!walletDetails) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const truncateAddress = (address: string) => {
    if (!address) return "";
    const truncatedLength = 4;
    const firstPart = address.slice(0, truncatedLength);
    const lastPart = address.slice(-truncatedLength);
    return `${firstPart}...${lastPart}`;
  };
  
  

  return (
    <Popover
      anchorOrigin={{
        vertical: "center",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={open}
      onClose={onClose}
    >
      <div className="bg-gray-800 text-white p-4 w-96">
        <div className="mb-4">
          <p className="text-sm">
            {truncateAddress(walletDetails.cardinal_address)}
          </p>
        </div>
        <div className="mb-4 ">
        <div className="flex items-center">
        <FaBitcoin className="mr-2 text-3xl mt-2" />
            <p className="text-lg font-semibold">BTC Wallet</p>
            </div>
          <div className="flex items-center mb-2 ml-9">
          <p className="text-sm">
            {truncateAddress(walletDetails.cardinal_address)}
          </p>

          <FaCopy
              className="cursor-pointer ml-2"
              onClick={() => copyToClipboard(walletDetails.cardinal_address || '')}
            />
            </div>
        </div>
        <div className="mb-4 ">
        <div className="flex items-center">
        <div className="mr-2">
      <FaCircle className="text-white text-3xl" /> 
    </div> 
            <p className="text-lg font-semibold">Ordinals Wallet</p>
            </div>
            <div className="flex items-center mb-2 ml-10">  
          <p className="text-sm">
            {truncateAddress(walletDetails.ordinal_address)}
          </p>
          <FaCopy
              className="cursor-pointer ml-2"
              onClick={() => copyToClipboard(walletDetails.ordinal_address || '')}
            />
          </div>
        </div>
        <div className="mb-4">
          <button
            className="bg-violet-600 text-white py-2 px-4 flex items-center justify-center w-full hover:bg-red-500 transition-colors duration-300"
            onClick={disconnect}
          >
            <FaPowerOff className="mr-2" /> Disconnect
          </button>
        </div>

        <div className="flex ">
          <img
            alt="xverse"
            src="https://play-lh.googleusercontent.com/UiUoRVY5QVI5DAZyP5s6xanuPRrd8HNbKGpjKt3HVPVuT6VJcnXVqR7V4ICQ9rYRCg=w240-h480-rw"
            className="w-8 h-8 mb-4 mr-4"
          />
          <FaDiscord className="text-3xl text-indigo-500 " />
        </div>
      </div>
    </Popover>
  );
};

export default InnerMenu;
