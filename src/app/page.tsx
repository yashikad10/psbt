"use client"
import AddInscriptions from "@/components/AddInscriptions";
import WalletButton from "@/components/Wallet/WalletButton";


export default function Home() {
  return (
    <div>
      <WalletButton/>
      <AddInscriptions/>
    </div>
  );
}
