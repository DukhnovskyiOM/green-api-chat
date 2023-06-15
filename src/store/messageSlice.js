import { createSlice } from "@reduxjs/toolkit";
import {v4 as uuid} from "uuid"

const messageSlice = createSlice({
    name: 'messages',
    initialState: {
        messages: []
    },
    reducers: {
        addMessage(state, action){
            state.messages.push({
                id: uuid(),
                time: action.payload.time,
                text: action.payload.text,
                coming: action.payload.coming,
            })
        }
    }
})

export const {addMessage} = messageSlice.actions

export default messageSlice.reducer