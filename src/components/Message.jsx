import { useEffect, useRef } from "react"

const Message = ({data}) => {

    
    const ref = useRef()

    useEffect(()=>{
        ref.current?.scrollIntoView({behavior: "smooth"})
    },[data])

    return (

        <div ref={ref} className={`message ${!data.coming && 'owner'}`}>
        
            <div className="messageInfo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png" alt="user" />
                <span>{data.time}</span>
            </div>
            <div className="messageContent">
                <p>{data.text}</p>
            </div>
        </div>
    )
}
export default Message