import { generateUnsignedPsbtForInscription, getFeeRate } from "@/utils/psbt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
      const data = await req.json();
      const {cardinal_address, ordinal_address, cardinal_pubkey, wallet, userInfos } = data;
      
  
      const fee_rate= await getFeeRate();
  
      console.log("-----------------data--------------",data)
      const { psbt } = await generateUnsignedPsbtForInscription(
        cardinal_address,
        cardinal_pubkey,
        fee_rate,
        wallet,
        userInfos
      );
  
  
      console.log({ psbt });
      data.psbt = psbt;
      
      return NextResponse.json({psbt});
    } catch (err: any) {
      console.log(err);
      return NextResponse.json({ message: 'SERVER ERROR' }, { status: 500 });
    }
  }