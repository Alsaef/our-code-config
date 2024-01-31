export  const getUser=createAsyncThunk('auth/getUser',async(email,displayName)=>{
  const res= await fetch(`http://localhost:3000/api/v1/user/${email}`)
  const data=await res.json()
  if (data.status) {
    return data
  }
  return email
  })



//extrareducer

  builder.addCase(getUser.fulfilled,(state,{payload})=>{
        state.isLoading=false;
        if (payload.status) {
          
          state.user=payload.data
        }else{
          state.user.email=payload
        }
        state.isError=false;
      })

