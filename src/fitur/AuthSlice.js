// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// const getApiBaseUrl = () => {
//     const protocol = window.location.protocol === 'https:' ? 'https' : 'http';
//    const baseUrl = process.env.REACT_APP_URL.replace(/^https?:\/\//, '');
//     return `${protocol}://${baseUrl}`;
//   };
  

// // Initial state untuk auth admin
// const initialState = {
//     user: null,
//     isError: false,
//     isSuccess: false,
//     isLoading: false,
//     message: ""
// }

// // Axios instance dengan baseURL dan credentials
// const api = axios.create({
//     baseURL: getApiBaseUrl(),
//     withCredentials: true
// });

// // Fungsi login admin
// export const LoginAdmin = createAsyncThunk("admin/login", async (user, thunkAPI) => {
//     try {
//         const response = await api.post('/login', {
//             username: user.username,
//             password: user.password
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Login error:', error.response?.data || error.message);
//         return thunkAPI.rejectWithValue(error.response?.data?.msg || 'An error occurred');
//     }
// });

// // Fungsi getMe untuk admin (memvalidasi sesi)
// export const getMeAdmin = createAsyncThunk("admin/me", async (_, thunkAPI) => {
//     try {
//         console.log("Fetching admin user data");
//         const response = await api.get('/me');
//         console.log("Admin user data response:", response.data);
//         return response.data;
//     } catch (error) {
//         console.error("GetMeAdmin error:", error.response?.data || error.message);
//         return thunkAPI.rejectWithValue(error.response?.data?.msg || "An error occurred");
//     }
// });

// // Fungsi logout admin
// export const LogOutAdmin = createAsyncThunk("admin/logout", async () => {
//     await api.delete('/logout');
// });

// // Slice Redux untuk auth admin
// export const authAdminSlice = createSlice({
//     name: "authAdmin",
//     initialState,
//     reducers: {
//         reset: (state) => initialState
//     },
//     extraReducers: (builder) => {
//         // Login Admin
//         builder.addCase(LoginAdmin.pending, (state) => {
//             state.isLoading = true;
//         });
//         builder.addCase(LoginAdmin.fulfilled, (state, action) => {
//             state.isLoading = false;
//             state.isSuccess = true;
//             state.user = action.payload;
//         });
//         builder.addCase(LoginAdmin.rejected, (state, action) => {
//             state.isLoading = false;
//             state.isError = true;
//             state.message = action.payload;
//         });

//         // GetMe Admin (validasi sesi)
//         builder.addCase(getMeAdmin.pending, (state) => {
//             state.isLoading = true;
//         });
//         builder.addCase(getMeAdmin.fulfilled, (state, action) => {
//             state.isLoading = false;
//             state.isSuccess = true;
//             state.user = action.payload;
//         });
//         builder.addCase(getMeAdmin.rejected, (state, action) => {
//             state.isLoading = false;
//             state.isError = true;
//             state.message = action.payload;
//         });

//         // Logout Admin
//         builder.addCase(LogOutAdmin.fulfilled, (state) => {
//             state.user = null;
//         });
//     }
// });

// export const { reset } = authAdminSlice.actions;
// export default authAdminSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const getApiBaseUrl = () => {
    const protocol = window.location.protocol === 'https:' ? 'https' : 'http';
   const baseUrl = process.env.REACT_APP_URL.replace(/^https?:\/\//, '');
    return `${protocol}://${baseUrl}`;
  };
  

// Initial state untuk auth admin
const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

// Axios instance dengan baseURL dan credentials
const api = axios.create({
    baseURL: getApiBaseUrl(),
    withCredentials: true
});

// Fungsi login admin
// export const LoginAdmin = createAsyncThunk("admin/login", async (user, thunkAPI) => {
//     try {
//         const response = await api.post('/login', {
//             username: user.username,
//             password: user.password
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Login error:', error.response?.data || error.message);
//         return thunkAPI.rejectWithValue(error.response?.data?.msg || 'An error occurred');
//     }
// });
export const LoginAdmin = (credentials) => async (dispatch) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
        const response = await api.post('/login', credentials, { withCredentials: true });
        dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
        dispatch(getMeAdmin());
    } catch (error) {
        dispatch({ type: 'LOGIN_FAILURE', error: error.response.data });
    }
};


// Fungsi getMe untuk admin (memvalidasi sesi)
export const getMeAdmin = () => async (dispatch, getState) => {
    const { isAuthenticated } = getState().auth;
    if (!isAuthenticated) return; // Pastikan hanya dipanggil jika isAuthenticated

    try {
        const response = await axios.get('/api/me', { withCredentials: true });
        dispatch({ type: 'SET_USER', payload: response.data });
    } catch (error) {
        console.error("Gagal mendapatkan data admin:", error);
    }
};

// Fungsi logout admin
export const LogOutAdmin = createAsyncThunk("admin/logout", async () => {
    await api.delete('/logout');
});

// Slice Redux untuk auth admin
export const authAdminSlice = createSlice({
    name: "authAdmin",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        // Login Admin
        builder.addCase(LoginAdmin.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(LoginAdmin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(LoginAdmin.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        // GetMe Admin (validasi sesi)
        builder.addCase(getMeAdmin.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getMeAdmin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(getMeAdmin.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        // Logout Admin
        builder.addCase(LogOutAdmin.fulfilled, (state) => {
            state.user = null;
        });
    }
});

export const { reset } = authAdminSlice.actions;
export default authAdminSlice.reducer;

