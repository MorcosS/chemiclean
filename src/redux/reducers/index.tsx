import { productsReducer } from "./productsReducer/productsReducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  products: productsReducer
});

export type AppState = ReturnType<typeof rootReducer>;
