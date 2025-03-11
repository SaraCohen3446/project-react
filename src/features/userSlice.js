import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUserApi, registerUserApi } from "../api/UserApi";
import { resetCart } from "./OrderSlice"; // ייבוא של פעולה לניקוי העגלה

/**
 * פעולה אסינכרונית להתחברות משתמש.
 * שולחת את פרטי המשתמש ל-API ומחזירה את הנתונים אם ההתחברות הצליחה.
 */
export const loginUser = createAsyncThunk("user/login", async (userData, thunkAPI) => {
    try {
        console.log("Login Request Data:", userData);
        const response = await loginUserApi(userData);
        console.log("Response from API:", response);
        return response.data;
    } catch (error) {
        console.log("Login Error:", error.response?.data);
        return thunkAPI.rejectWithValue(error.response?.data);
    }
});

/**
 * פעולה אסינכרונית לרישום משתמש חדש.
 * שולחת את הנתונים ל-API ומחזירה את המשתמש שנוצר.
 */
export const registerUser = createAsyncThunk("user/register", async (userData, thunkAPI) => {
    try {
        console.log("Register Request Data:", userData);
        const response = await registerUserApi(userData);
        console.log("Response from API:", response);
        return response.data;
    } catch (error) {
        console.log("Register Error:", error.response?.data);
        return thunkAPI.rejectWithValue(error.response?.data);
    }
});

/**
 * פעולה אסינכרונית להתנתקות משתמש.
 * מוחקת את הנתונים מה-localStorage ומאפסת את העגלה ב-Redux.
 */
export const logOut = createAsyncThunk("user/logOut", async (_, thunkAPI) => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    thunkAPI.dispatch(resetCart()); // ניקוי העגלה
});

/**
 * מצב ראשוני של המשתמש, כולל טעינת הנתונים מ-LocalStorage אם קיימים.
 */
const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null
};

/**
 * Slice של Redux לניהול משתמשים, כולל התחברות, רישום וניתוק.
 */
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        /**
         * פעולה לעדכון תמונת הפרופיל של המשתמש.
         * מעדכנת את התמונה ב-state וב-LocalStorage.
         */
        updateProfileImage: (state, action) => {
            if (state.user) {
                state.user.profileImage = action.payload;
                localStorage.setItem("user", JSON.stringify(state.user)); // עדכון גם ב-LocalStorage
            }
        }
    },

    extraReducers: (builder) => {
        builder
            // התחברות
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                localStorage.setItem("user", JSON.stringify(action.payload)); // שמירת המשתמש ב-LocalStorage
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // רישום
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                localStorage.setItem("user", JSON.stringify(action.payload)); // שמירת המשתמש ב-LocalStorage
                localStorage.removeItem("cart"); // ניקוי העגלה לאחר הרשמה
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // התנתקות
            .addCase(logOut.fulfilled, (state) => {
                state.user = null;
            });
    }
});

export const { updateProfileImage } = userSlice.actions;
export default userSlice.reducer;
