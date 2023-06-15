import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {addUserInfo} from '../store/userSlice'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        const id = e.target[0].value
        const token = e.target[1].value
        const phone = e.target[2].value
        dispatch(addUserInfo({id, token, phone}))
        navigate("/")
    }

    return (
        <div className="formContainer">
            <div className="formWrapper">
            <span className="title">Заполните форму</span>
                <form onSubmit={handleSubmit}>
                <label id="id" className="label__form">
                    <input type="text" className="input__form" required/>
                    <span className="span__form">ID</span>
                </label>
                <label id="token" className="label__form">
                    <input type="text" className="input__form" required/>
                    <span className="span__form">TOKEN</span>
                </label>
                <label id="phone" className="label__form">
                    <input type="text" className="input__form" required/>
                    <span className="span__form">PHONE</span>
                </label>
                <button type="submit" className="enter">Создать чат</button>
                </form>
            </div>
        </div>
    )
}
export default Login