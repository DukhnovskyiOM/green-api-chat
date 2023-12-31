import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice'
import messageReducer from './messageSlice'


export default configureStore({
    reducer: {
        userInfo: userReducer,
        messages: messageReducer
    }
})