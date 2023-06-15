import { useSelector } from "react-redux";


const UserChatInfo = () => {
    const messages = useSelector(state => state.messages.messages);
    const lastMessage = messages[messages.length - 1]
    return (
        <div className="userChat">
            <img src="https://cdn-icons-png.flaticon.com/512/1053/1053244.png" alt="user" />
            <div className="userChatInfo">
                <span>User</span>
                <p>{messages[0] && lastMessage?.text.slice(0, 10)}{lastMessage?.text.length > 11 ? '...' : ''}</p>
            </div>
        </div>
    )
}
export default UserChatInfo