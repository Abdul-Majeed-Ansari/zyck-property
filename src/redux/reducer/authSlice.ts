import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserType {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    avatarUrl: string | null,
    createdAt:string ,
    isAdmin: boolean ,
    phoneNumber: string |null,
    longitude: string |null,
    latitude: string | null,
    city: string |null,
    province: string |null,
    streetAddress: string |null,
    ProfileComplete:boolean,
}

interface AuthState {
  user: UserType | null;
  loader: boolean;
  isAdmin: boolean;
}

const initialState: AuthState = {
  user: null,
  loader: true,
  isAdmin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userExited: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
      state.loader = false;
    },
    userNotExited: (state) => {
      state.user = null;
      state.loader = false;
    },
  },
});

export default authSlice;

export const { userExited, userNotExited } = authSlice.actions;