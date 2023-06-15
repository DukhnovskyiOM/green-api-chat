import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addMessage } from "../store/messageSlice";
import Message from "./Message"
import { useNavigate } from "react-router-dom";

const Messages = () => {
    const navigate = useNavigate()
    const userInfo = useSelector(state => state.userInfo.userInfo);
    const messages = useSelector(state => state.messages.messages);
    const dispatch = useDispatch()
    const formData = {
        "chatId": `${userInfo[0].phone}@c.us`,
        //"count": 199    //история сообщений чата - Количество сообщений для получения. Значение по умолчанию 100
    }
    const getHistoryMessage = async () => {
    try {
        const response = await axios.post(`https://api.green-api.com/waInstance${userInfo[0].id}/getChatHistory/${userInfo[0].token}`, formData)
        const arrHistory = response.data.reverse()
        arrHistory.map((el) => {
            const text = el.textMessage
            const time = new Date(el.timestamp * 1000).toLocaleTimeString()
            let coming
            if(el.type === 'incoming'){
                coming = true
            } else {
                coming = false
            }
    
            dispatch(addMessage({text, coming, time}))})
    } catch (error) {
        console.log('getHistoryMessage ' + error);
        navigate('/Login')
        alert('incorrect information\nid\ntoken\nphone')
    }

}


    useEffect(()=>{
        getHistoryMessage()
    },[])

   

    return (
        <div className="messages">
            {!!messages.length && messages.map(res => {
                return <Message key={res.id} data={res} />
            })}
        </div>
    )
}
export default Messages