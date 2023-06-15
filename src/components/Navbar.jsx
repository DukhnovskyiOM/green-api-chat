import { useNavigate } from "react-router-dom"

const Navbar = () => {
    const navigate = useNavigate()
    return (
        <div className="navbar">
            <span className="logo">Green API Chat</span>
            <div className="user">
                <img src="https://cdn-icons-png.flaticon.com/512/1053/1053244.png" alt="User"/>
                
                <button onClick={() => navigate("/login")}>Exit</button>
            </div>
        </div>
    )
}
export default Navbar