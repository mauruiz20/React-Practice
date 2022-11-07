import { combineReducers } from "redux";
import contadorReducer from "./contadorReducer";

const reducer = combineReducers({
  contador: contadorReducer,
});

export default reducer;
