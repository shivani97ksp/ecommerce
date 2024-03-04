// import {createStore} from "redux";
import rootReducers from "./reducer";

// const store= createStore(rootReducers);

// export default store;

import {configureStore} from '@reduxjs/toolkit';


export const store = configureStore({
  reducer: {
    rootReducers
  }
})

export default store;