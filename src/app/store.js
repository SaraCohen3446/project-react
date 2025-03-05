import { configureStore } from '@reduxjs/toolkit';
import cartSlice from '../features/OrderSlice.js';
import productSlice from '../features/productSlice.js';
import userSlice from '../features/userSlice.js'; // הוספנו את ה-userSlice

export const store = configureStore({
  reducer: {
    cart: cartSlice, // סל הקניות
    product: productSlice, // המוצרים
    user: userSlice // הוספת ה-reducer של המשתמש
  }
});
