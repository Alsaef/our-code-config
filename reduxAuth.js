import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import auth from '../../firebase/firebase.config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
const initialState = {
  user:{
    email:'',
    role:''
  }
,
  isLoading:true,
  isError:false,
  error:''
  }

export const createAccount=createAsyncThunk('auth/createAccount',async({email,password,displayName})=>{
     const data=await createUserWithEmailAndPassword(auth,email,password)
     await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      return data.user.email;
})
export const getUser=createAsyncThunk('auth/getUser',async(email)=>{
    const res=await fetch(`exampleUserApi/${email}`)
    const data=await res.json()
    if (data.status) {
        return data
      }
      return email
})
export const loginAccount=createAsyncThunk('auth/loginAccount',async({email,password})=>{
     const data=await signInWithEmailAndPassword(auth,email,password)
      return data.user.email;
})



  const authSlice=createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setUser:(state,{payload})=>{
            state.isLoading=false
            state.user.email=payload
            state.isError=false
        },
        toggoleLoading:(state,{payload})=>{
            state.isLoading=false
            state.user={email:'',role:''}
            state.isError=false
        },
        logout:(state,{payload})=>{
            state.isLoading=false
            state.user={email:'',role:''}
            state.isError=false
        }
    },

extraReducers:(builder)=>{
//create account
builder.addCase(createAccount.pending,(state)=>{
    state.isLoading=true;
    state.isError=false;
    state.error='';
})
builder.addCase(createAccount.fulfilled,(state,{payload})=>{
    state.isLoading=false;
     state.user.email=payload
    state.isError=false;
    state.error='';
})
builder.addCase(createAccount.rejected,(state,action)=>{
    state.isLoading=false;
     state.user.email=''
    state.isError=true;
    state.error=action.error.message
})
// login
builder.addCase(loginAccount.pending,(state)=>{
    state.isLoading=true;
    state.isError=false;
    state.error='';
})
builder.addCase(loginAccount.fulfilled,(state,{payload})=>{
    state.isLoading=false;
     state.user.email=payload
    state.isError=false;
    state.error='';
})
builder.addCase(getUser.rejected,(state,action)=>{
    state.isLoading=false;
     state.user.email=''
    state.isError=true;
    state.error=action.error.message
})
// 
builder.addCase(getUser.pending,(state)=>{
    state.isLoading=true;
    state.isError=false;
    state.error='';
})
builder.addCase(getUser.fulfilled,(state,{payload})=>{
    state.isLoading=false;
   if (payload.status) {
    state.user=payload.data;
   }
   else{
    state.user.email=payload;
   }
    state.isError=false;
    state.error='';
})
builder.addCase(loginAccount.rejected,(state,action)=>{
    state.isLoading=false;
     state.user.email=''
    state.isError=true;
    state.error=action.error.message
})


}


})

export const {setUser,toggoleLoading,logout}=authSlice.actions
export default authSlice.reducer
