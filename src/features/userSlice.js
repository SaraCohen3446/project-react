import { createSlice } from '@reduxjs/toolkit';
import { loginUserApi, registerUserApi } from "../api/UserApi";
import { resetCart } from "./OrderSlice";

/**
 * פונקציה לטעינת נתוני המשתמש מהאחסון המקומי (localStorage)
 * @returns {Object|null} אובייקט המשתמש אם קיים, אחרת null
 */
const loadUserFromLocalStorage = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

/**
 * מצב התחלתי של חנות Redux עבור המשתמש
 * כולל טעינת נתוני המשתמש מהאחסון המקומי אם קיימים
 */
const initialState = {
    user: loadUserFromLocalStorage(),
    loading: false,                  
    error: null,                    
};

/**
 * Slice של Redux לניהול מצב המשתמש
 * כולל פעולות להתחברות, רישום והתנתקות
 */
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        /**
         * מגדיר את המצב להתחלת תהליך ההתחברות
         */
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        /**
         * מעדכן את המצב לאחר התחברות מוצלחת
         * @param {Object} action.payload - נתוני המשתמש שהתקבלו מהשרת
         */
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },
        /**
         * מעדכן את המצב אם ההתחברות נכשלה
         * @param {Object} action.payload - נתוני השגיאה שהתקבלו מהשרת
         */
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        /**
         * מגדיר את המצב להתחלת תהליך הרישום
         */
        registerStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        /**
         * מעדכן את המצב לאחר רישום מוצלח
         * @param {Object} action.payload - נתוני המשתמש שהתקבלו מהשרת
         */
        registerSuccess: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },
        /**
         * מעדכן את המצב אם הרישום נכשל
         * @param {Object} action.payload - נתוני השגיאה שהתקבלו מהשרת
         */
        registerFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        /**
         * מבצע התנתקות של המשתמש
         * מוחק את נתוני המשתמש מהמצב ומהאחסון המקומי
         */
        logOut: (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;
            localStorage.removeItem("user");
            localStorage.removeItem("cart");
        },

        /**
         * מנקה את מצב השגיאה
         */
        clearError: (state) => {
            state.error = null;
        }
    }
});

export const {  loginStart,  loginSuccess,  loginFailure,  registerStart,  registerSuccess,  registerFailure, logOut, clearError } = userSlice.actions;

/**
 * פונקציית thunk להתחברות משתמש
 * מטפלת בתהליך ההתחברות מול השרת ומעדכנת את המצב בהתאם
 * @param {Object} userData - נתוני ההתחברות (אימייל וסיסמה)
 * @returns {Function} פונקציית thunk שמקבלת dispatch
 */
export const loginUser = (userData) => async (dispatch) => {
    try {
        // מעדכן שהתחיל תהליך טעינה
        dispatch(loginStart());
        // שולח בקשת התחברות לשרת
        const response = await loginUserApi(userData);
        // שומר את נתוני המשתמש באחסון המקומי
        localStorage.setItem("user", JSON.stringify(response.data));
        // מעדכן את המצב עם נתוני המשתמש החדשים
        dispatch(loginSuccess(response.data));
    } catch (error) {
        // במקרה של שגיאה, מעדכן את מצב השגיאה
        dispatch(loginFailure(error.response?.data));
    }
};

/**
 * פונקציית thunk לרישום משתמש חדש
 * מטפלת בתהליך הרישום מול השרת ומעדכנת את המצב בהתאם
 * @param {Object} userData - נתוני הרישום (שם משתמש, אימייל וסיסמה)
 * @returns {Function} פונקציית thunk שמקבלת dispatch
 */
export const registerUser = (userData) => async (dispatch) => {
    try {
        // מעדכן שהתחיל תהליך טעינה
        dispatch(registerStart());
        // שולח בקשת רישום לשרת
        const response = await registerUserApi(userData);
        // שומר את נתוני המשתמש באחסון המקומי
        localStorage.setItem("user", JSON.stringify(response.data));
        // מעדכן את המצב עם נתוני המשתמש החדשים
        dispatch(registerSuccess(response.data));
    } catch (error) {
        // במקרה של שגיאה, מעדכן את מצב השגיאה
        dispatch(registerFailure(error.response?.data));
    }
};

/**
 * פונקציה להתנתקות ואיפוס העגלה
 */
export const logOutAndResetCart = () => (dispatch) => {
    dispatch(logOut());
    dispatch(resetCart());
};

export default userSlice.reducer;
