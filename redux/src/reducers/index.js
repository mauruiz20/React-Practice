import { combineReducers } from "redux";
import contadorReducer from "./contadorReducer";
import { shoppingReducer } from "./shoppingReducer";

const reducer = combineReducers({
  contador: contadorReducer,
  shopping: shoppingReducer,
});

export default reducer;
