import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Wallet } from "../models/wallet";

export interface WalletState extends EntityState<Wallet> {
  loading: boolean;
}

export const walletAdapter: EntityAdapter<Wallet> = createEntityAdapter<Wallet>({
  selectId: (entity: Wallet) => entity.id,
});
