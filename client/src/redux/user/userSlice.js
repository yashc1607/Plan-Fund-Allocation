import { createSlice } from "@reduxjs/toolkit";
const initialState={
    currentUser:null,
    error:null,
    loading:false,
};

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(start) =>{
            start.loading=true;
        },
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        signInFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        signOutUserStart:(start) =>{
            start.loading=true;
        },
        signOutUserSuccess:(state,action)=>{
            state.currentUser=null;
            state.loading=false;
            state.error=null;
        },
        signOutUserFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        }
    }
});
export const{signInStart,
    signInSuccess,
    signInFailure,
    signOutUserStart,
    signOutUserSuccess,
    signOutUserFailure}=userSlice.actions;
export default userSlice.reducer;