import { useState, useContext } from 'react';
import profile from '../../assets/image/profile.png';
import logo from '../../assets/icon/logo.png';
import Button from '../../Component/Button'
import LoginModal from '../Modal/LoginModal';
import RegisterModal from '../Modal/RegisterModal';
import { UserContext } from '../../Context/UserContext';
import Bill from '../../assets/icon/bill.png'
import logout from '../../assets/icon/logout.png'
import {Link} from "react-router-dom"

import './Navbar.scss'

export default function Navbar() {
    const [ModalRegister, setModalRegister] = useState(false)
    const [ModalLogin, setModalLogin] = useState(false)
    const [dropdown, setDropdown] = useState(false)
    const [user, setUser] = useState([])
    const [change, setChange] = useState(false)
    const [state, dispatch] = useContext(UserContext)

    const showModalRegister = () => {
        setModalRegister(true)
    }
    const showModalLogin = () => {
        setModalLogin(true)
    }
    const closeModalRegister = () => {
        setModalRegister(false)
    }
    const closeModalLogin = () => {
        setModalLogin(false)
    }

    const dropdownActive = dropdown === true ? "active" : "non-active"

    const handleLogout = () => {
        dispatch({type: 'LOGOUT'})
        setDropdown(false)
    }

    return (
        <div className="navbar">
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
                <Link to="/">
                    <h4>Dumb<span>Sound</span></h4>
                </Link>
            </div>
            <div className="nav-item">
            {state.isLogin === false ?  

                <div className="auth">
                    <Button 
                        className="btn btn-medium btn-transparant" 
                        text="Login"
                        onClick={() => setModalLogin(true)}
                    />
                    <Button 
                        className="btn btn-medium btn-orange" 
                        text="Register" 
                        onClick={() => setModalRegister(true)}
                    />
                </div>
                :
                <div className="avatar" onClick={() => {setDropdown(!dropdown)}}>
                    <img src={profile} alt="profile" />
                </div>
            }
            </div>
            <div className={`dropdown-wrapper ${dropdownActive}`}>
                <div className="dropdown">
                    <div className="triangle-wrapper">
                        <div className="triangle"></div>
                    </div>
                    <div className="item-wrapper active">
                        <div className="item">
                            <div className="icon">
                                <img src={Bill} alt="bil" />
                            </div>
                            <Link to="/pay">
                                <p>Pay</p>
                            </Link>
                        </div>
                        <div className="line"></div>
                        <div className="item" >
                            <div className="icon">
                                <img src={logout} alt="logout" />
                            </div>
                            <p onClick={handleLogout}>Logout</p>
                        </div>
                    </div>
                </div>
            </div>
            <RegisterModal 
                isOpen={ModalRegister} 
                closeModal={closeModalRegister} 
                showModalLogin={showModalLogin}
                setChange={setChange}
            />
            <LoginModal 
                isOpen={ModalLogin} 
                closeModal={closeModalLogin} 
                showModalRegister={showModalRegister}
                setChange={setChange}
            />
        </div>
    )
}
