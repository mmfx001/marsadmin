// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './page/ProductSlice';

import adminReducer from './page/adminslice';


const store = configureStore({
    reducer: {
     
        admin: adminReducer,
        products: productsReducer,

     
    },
});

export default store;
