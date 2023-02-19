import { routerReducer } from "@ngrx/router-store";
import { fetchErrorsReducer } from "@reducers/errors.reducer";
import { boxReducer } from "@reducers/boxes.reducer";
import { walletReducer } from "@reducers/wallet.reducer";
import { userReducer } from "@reducers/user.reducer";

export const reducers = {
  fetchErrors: fetchErrorsReducer,
  boxes: boxReducer,
  router: routerReducer,
  wallet: walletReducer,
  user: userReducer,
};
