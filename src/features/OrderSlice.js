import { createSlice } from '@reduxjs/toolkit';

// פונקציה לטעינת עגלת הקניות מה-localStorage
const loadCartFromLocalStorage = () => {
  const data = localStorage.getItem('cart');
  return data ? JSON.parse(data) : { arr: [], sum: 0, count: 0 };
};

// הגדרת מצב התחלתי של העגלה
const initialState = loadCartFromLocalStorage();

// פונקציה לשמירת עגלת הקניות ב-localStorage
const saveCartToLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// יצירת Slice לניהול עגלת הקניות
const OrderSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // פונקציה להקטנת כמות של פריט בעגלה
    reduce: (state, action) => {
      const index = state.arr.findIndex(item => item._id === action.payload._id);
      if (index === -1) return;
      if (state.arr[index].qty === 1) {
        state.arr.splice(index, 1);
      } else {
        state.arr[index].qty--;
      }
      state.count -= 1;
      state.sum = state.arr.reduce((total, item) => total + (item.price * item.qty), 0);
      saveCartToLocalStorage(state);
    },
    /**
     * איפוס בלוקל סטורג'
     * @param {*} state 
     */
    resetCart: (state) => {
      state.arr = [];
      state.count = 0;
      state.sum = 0;
    },
    // פונקציה להסרת פריט מהעגלה לחלוטין
    removeItem: (state, action) => {
      const index = state.arr.findIndex(item => item._id === action.payload._id);
      if (index === -1) return;
      state.count -= state.arr[index].qty;
      state.sum -= state.arr[index].price * state.arr[index].qty;
      state.arr.splice(index, 1);
      saveCartToLocalStorage(state);
    },
    // פונקציה להוספת פריט לעגלה
    addItem: (state, action) => {
      const existingItem = state.arr.find(item => item._id === action.payload._id);
      if (existingItem) {
        existingItem.qty++;
      } else {
        state.arr.push({ ...action.payload, qty: 1 });
      }
      state.count = state.arr.reduce((total, item) => total + item.qty, 0);
      state.sum = state.arr.reduce((total, item) => total + (item.price * item.qty), 0);
      saveCartToLocalStorage(state);
    }
  }
});

export const { resetCart, removeItem, reduce, addItem } = OrderSlice.actions;
export default OrderSlice.reducer;
