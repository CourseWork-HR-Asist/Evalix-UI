import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { GoogleAuthResponse, User, UserWithToken } from "../services/type";
import { createUserService } from "../services/user.service";
import { parseJwt } from "../../../libs/jwt";

interface UserState {
    list: User[];
    currentUser: (User & { token: string }) | null;
    loading: boolean;
    error: string | null;
    theme: 'light' | 'dark';
}

const initialState: UserState = {
    list: [],
    currentUser: null,
    loading: false,
    error: null,
    theme: 'light',
}

const fetchUsers = createAsyncThunk<User[]>(
    "users/fetchAll", 
    async (_, { signal }) => {
      const service = createUserService(signal);
      return await service.getAll();
    }
  );

const googleAuth = createAsyncThunk<UserWithToken, GoogleAuthResponse>(
    "users/googleAuth", 
    async (credential: GoogleAuthResponse, { signal, rejectWithValue }) => {
        try {
            const service = createUserService(signal);
            const response = await service.googleAuth(credential);
            return response;
        } catch {
            return rejectWithValue('Failed to authenticate with Google');
        }
    }
);

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            const newTheme = state.theme === 'light' ? 'dark' : 'light';
            state.theme = newTheme;
            localStorage.setItem('theme', newTheme);
        },
        setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
            state.theme = action.payload;
            localStorage.setItem('theme', action.payload);
        },
        setCurrentUser: (state, action: PayloadAction<string | UserWithToken | null>) => {
            const service = createUserService();
            
            if (action.payload === null) {
                state.currentUser = null;
                service.setToken("");
                return;
            }

            if (typeof action.payload === 'string') {
                service.setToken(action.payload);
                const decodedToken = parseJwt(action.payload);
                if (decodedToken) {
                    state.currentUser = {
                        id: decodedToken.sub || "",
                        firstName: decodedToken.unique_name || "",
                        username: decodedToken.unique_name || "",
                        email: decodedToken.email || "",
                        updatedAt: new Date().toISOString(),
                        roleId: decodedToken.role || "",
                        role: {
                            id: decodedToken.role || "",
                            title: decodedToken.role || "User"
                        },
                        token: action.payload
                    };
                }
            } else {
                const { token, ...userData } = action.payload;
                service.setToken(token);
                state.currentUser = { ...userData, token };
            }
        }
    },
    extraReducers: (builder) => {   
        builder
           .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Something went wrong";
            })
            .addCase(googleAuth.pending, (state) => {
                state.loading = true;
            })
            .addCase(googleAuth.fulfilled, (state, action) => {
                state.loading = false;
                // The payload from googleAuth is already a UserWithToken object
                state.currentUser = action.payload as UserWithToken;
                // Set the token in the service
                const service = createUserService();
                service.setToken(action.payload.token);
            })
            .addCase(googleAuth.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Something went wrong";
            })
    }
})

export const { setCurrentUser, toggleTheme, setTheme } = userSlice.actions;

export default userSlice.reducer;

export {
    fetchUsers,
    googleAuth,
}