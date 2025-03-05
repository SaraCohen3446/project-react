import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 
    selectedProduct: null
}
const productSlice = createSlice({
    name: "productNameForDebug",
    initialState,
    reducers: {
        selectProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
        },

    }
})

export const { selectProduct, clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
