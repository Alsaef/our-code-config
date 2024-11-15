import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const initialState = {
    user: null,
    loading: true,
    error: null,
};

// Async thunk to fetch the current user
export const fetchCurrentUser = createAsyncThunk(
    'auth/fetchCurrentUser',
    async (email, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/v1/current-user`, {
                params: { email },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export const { setUser, clearUser, setLoading } = authSlice.actions;

export const login = (token) => (dispatch) => {
    localStorage.setItem('token', token);
    const decodedToken = jwtDecode(token);
    dispatch(setUser(decodedToken));
    dispatch(fetchCurrentUser(decodedToken.email));
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('token');
    dispatch(clearUser());
};

export const initializeAuth = () => async (dispatch) => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            dispatch(setUser(decodedToken));
            await dispatch(fetchCurrentUser(decodedToken.email));
        } catch (error) {
            console.error('Invalid token:', error);
            localStorage.removeItem('token');
        }
    }
    dispatch(setLoading(false));
};

export default authSlice.reducer;
