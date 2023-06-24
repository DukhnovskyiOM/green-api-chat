import { useEffect, useState } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addMessage } from "../store/messageSlice";

const Input = () => {
    const navigate = useNavigate()
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.userInfo.userInfo);


  const getNotification = (async () => {

        try {

            let response
        while (response = await axios.get(`https://api.green-api.com/waInstance${userInfo[0].id}/receiveNotification/${userInfo[0].token}`)) {
            
            let webhookBody = response?.data?.body;
            const recId = response?.data?.receiptId
            const text = response.data?.body?.messageData?.textMessageData?.textMessage
            const coming = true
            const time = new Date(response?.data?.body?.timestamp * 1000).toLocaleTimeString()
            if(response.data === null){
                continue 
            }

            if (webhookBody?.typeWebhook === 'incomingMessageReceived') {
                await axios.delete(`https://api.green-api.com/waInstance${userInfo[0].id}/deleteNotification/${userInfo[0].token}/${recId}`);
                if(text){
                    dispatch(addMessage({text, coming, time}));
                }
            } 
            else if (webhookBody.typeWebhook === 'stateInstanceChanged') {
                if(response){
                    await axios.delete(`https://api.green-api.com/waInstance${userInfo[0].id}/deleteNotification/${userInfo[0].token}/${recId}`);
                }
            } 
            else if (webhookBody.typeWebhook === 'outgoingMessageStatus') {
                if(response){
                    await axios.delete(`https://api.green-api.com/waInstance${userInfo[0].id}/deleteNotification/${userInfo[0].token}/${recId}`);
                }
            } else if (webhookBody.typeWebhook === 'deviceInfo') {
                if(response){
                    await axios.delete(`https://api.green-api.com/waInstance${userInfo[0].id}/deleteNotification/${userInfo[0].token}/${recId}`);
                }
            }
        }


        } catch (error) {
           console.log('error'); 
        }
    })

    useEffect(()=>{
        getNotification()
    },[])



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
        </div>
    )
}
export default Input