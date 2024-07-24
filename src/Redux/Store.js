import { configureStore } from "@reduxjs/toolkit";
import { brandsReducer } from "./brandsSlice.js";



 export let store  = configureStore({
    reducer:{
        brand: brandsReducer,
    }
})
