import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserApi, registerUserApi } from "../api/UserApi";

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
    initialState: { user: null, loading: false, error: null },
    reducers: {
        logOut:(state,action)=>{
            state.user=null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => { state.loading = true; })
            .addCase(loginUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
            .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            .addCase(registerUser.pending, (state) => { state.loading = true; })
            .addCase(registerUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
            .addCase(registerUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
    }
});

export const { logOut } = userSlice.actions;
export default userSlice.reducer;
