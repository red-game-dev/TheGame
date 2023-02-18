import { routerReducer } from "@ngrx/router-store";
import { fetchErrorsReducer } from "./errors.reducer";
import { boxReducer } from "./boxes.reducer";
import { walletReducer } from "./wallet.reducer";
import { userReducer } from "./user.reducer";

export const reducers = {
  fetchErrors: fetchErrorsReducer,
  boxes: boxReducer,
  router: routerReducer,
  wallet: walletReducer,
  user: userReducer,
};
