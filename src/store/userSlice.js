import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: 'userInfo',
    initialState: {
        userInfo: []
    },
    reducers: {
        addUserInfo(state, action){
            state.userInfo.push({
                id: action.payload.id,
                token: action.payload.token,
                phone: action.payload.phone,
            })
        }
    }
})

export const {addUserInfo} = userSlice.actions

export default userSlice.reducer