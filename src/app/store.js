import { legacy_createStore } from "redux";
import mediaReducer from "../features/mediaActions";

const store = legacy_createStore(mediaReducer);

export default store;
