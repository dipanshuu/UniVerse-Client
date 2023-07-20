import {createAsyncThunk, createSlice} from'@reduxjs/toolkit';
import { axiosClient } from '../../utils/axiosClient';

export const getMyInfo=createAsyncThunk('user/getMyInfo',async (body)=>{
    try{

const response=await axiosClient.get('/user/getMyInfo');

return response.result;
    }
    catch(e){
return Promise.reject(e)
    }

})

export const updateMyProfile=createAsyncThunk("user/updateMyProfile",async(body)=>{
    try{
      
        const response=await axiosClient.put('/user/',body);
        console.log("update",response.result)
        return response.result;
            }
            catch(e){
        return Promise.reject(e)
            }
           
})
const appConfigSlice=createSlice({
    name:'appConfigSlice',
    initialState:{
        isLoading:false,
        toastData:{},
        myProfile:null 
    },
    reducers:{
        setLoading:(state,action)=>{
            state.isLoading=action.payload
        },
        showToast:(state,action)=>{
            state.toastData=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getMyInfo.fulfilled,(state,action)=>{
state.myProfile=action.payload
        })
        .addCase(updateMyProfile.fulfilled,(state,action)=>{
            state.myProfile=action.payload
    })
}})
export default appConfigSlice.reducer;
export const {setLoading,showToast}=appConfigSlice.actions;