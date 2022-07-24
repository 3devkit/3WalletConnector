import { BaseStore } from '@3walletconnector/helpers';

export type StoreDto = StoreData;

export interface StoreData {
  chainId?: number;
  account?: string;
  eagerlyConnecting: boolean;
  connecting: boolean;
}

export class Store extends BaseStore<StoreData> {
  public constructor() {
    super({
      chainId: undefined,
      account: undefined,
      eagerlyConnecting: false,
      connecting: false,
    });
  }
}
