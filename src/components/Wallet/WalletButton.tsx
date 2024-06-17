import React, { useState } from "react";
import { ConnectMultiButton } from "bitcoin-wallet-adapter";
import InnerMenu from "./InnerMenu";

const WalletButton = () => {

  return (
    <div className="fixed top-0 right-0 m-4">
      <ConnectMultiButton
        walletImageClass="w-[60px]"
        walletLabelClass="pl-3 font-bold text-xl ml-2"
        walletItemClass="border w-full md:w-6/12 cursor-pointer border-transparent rounded-xl mb-4 hover:border-green-500 transition-all"
        headingClass="text-white text-4xl pb-12 font-bold text-center"
        buttonClassname="bg-purple-400 hover:bg-purple-200 rounded-sm flex items-center text-purple-800 px-4 py-1 mb-4 font-bold"
        InnerMenu={InnerMenu}
        icon=""
        iconClass=""
        balance={1000}
        //onConnect={handleConnect}
        //onOpen={handleOpenMenu}
      />
    </div>
  );
};

export default WalletButton;
