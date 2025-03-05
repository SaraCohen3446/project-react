import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserApi, registerUserApi } from "../api/UserApi";
import { resetCart } from "./OrderSlice";  // Import את הפעולה לניקוי העגלה

export const loginUser = createAsyncThunk("user/login", async (userData, thunkAPI) => {
    try {
        console.log(userData);
        
        return await loginUserApi(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const registerUser = createAsyncThunk("user/register", async (userData, thunkAPI) => {
    try {
        return await registerUserApi(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

const userSlice = createSlice({
    name: "user",
    initialState: { user: JSON.parse(localStorage.getItem("user")) || null, loading: false, error: null },
    reducers: {
        logOut: (state, action) => {
            state.user = null;
            localStorage.removeItem("user");  // Remove user from localStorage
            localStorage.removeItem('cart');  // Remove cart from localStorage
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => { state.loading = true; })
            .addCase(loginUser.fulfilled, (state, action) => { 
                state.loading = false; 
                state.user = action.payload; 
                localStorage.setItem("user", JSON.stringify(action.payload)); // Save user to localStorage
            })
            .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            .addCase(registerUser.pending, (state) => { state.loading = true; })
            .addCase(registerUser.fulfilled, (state, action) => { 
                state.loading = false; 
                state.user = action.payload; 
                localStorage.setItem("user", JSON.stringify(action.payload)); // Save user to localStorage
                localStorage.removeItem('cart');  // Remove cart from localStorage

            })
            .addCase(registerUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
    }
});

export const { logOut } = userSlice.actions;
export default userSlice.reducer;
