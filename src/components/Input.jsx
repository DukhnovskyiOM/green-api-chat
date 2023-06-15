import { useState } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addMessage } from "../store/messageSlice";

const Input = () => {
    const navigate = useNavigate()
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.userInfo.userInfo);


    const getNotification = async () => {

        try {
            const data = await axios.get(`https://api.green-api.com/waInstance${userInfo[0].id}/receiveNotification/${userInfo[0].token}`)
            console.log(data?.data?.receiptId)
            const recId = data?.data?.receiptId
            const text = data.data?.body?.messageData?.textMessageData?.textMessage
            const coming = true
            const time = new Date().toLocaleTimeString()
            if(data?.data?.body?.typeWebhook === 'incomingMessageReceived'){
                dispatch(addMessage({text, coming, time}));
                await axios.delete(`https://api.green-api.com/waInstance${userInfo[0].id}/deleteNotification/${userInfo[0].token}/${recId}`);
                //getNotification();
            } else if(data === undefined){
                getNotification();
            } else {
                getNotification();
            }

            await axios.delete(`https://api.green-api.com/waInstance${userInfo[0].id}/deleteNotification/${userInfo[0].token}/${recId}`);

        } catch (error) {
           console.log('error'); 
        }
    }

//setInterval(getNotification, 5000)


const sendMessage = async (e) => {
    e.preventDefault();
    if(!userInfo[0].id){
        navigate("/login")
    }
    const coming = false
    const time = new Date().toLocaleTimeString()
    dispatch(addMessage({text, coming, time}))
    const body = {
         "chatId": `${userInfo[0].phone}@c.us`,
         "message": text
        }
    try {
        await axios.post(`https://api.green-api.com/waInstance${userInfo[0].id}/sendMessage/${userInfo[0].token}`, body)
        setText('')
    } catch (error) {
        console.log('error setMessage'); 
    }
    
}

const handleChange = (e) => {
    setText(e.target.value)
}
    return (
        <div className="input">
            <form onSubmit={sendMessage}>
            <input type="text" placeholder="Type something..." value={text} onChange={handleChange} required/>
            <div className="send">
                <button>Send</button>
            </div>
            </form>
            {/* <button onClick={getNotification}>+</button> */}
        </div>
    )
}
export default Input