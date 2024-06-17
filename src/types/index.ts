export interface IUser {
    address: string;
    fee: number;
  }

  export interface Data{
    cardinal_address: string,
    ordinal_address: string,
    cardinal_pubkey: string,
    wallet:string,
    userInfos: IUser[]
  }