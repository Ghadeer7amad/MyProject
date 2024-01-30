import { createStore } from "redux";
import thunk from "redux-thunk";
// import requestReducer from './request/requestReducer';
import rootReducer from "./rootReducer";
// const store = createStore(requestReducer, applyMiddleware(thunk));
const store = createStore(rootReducer);

export default store;
