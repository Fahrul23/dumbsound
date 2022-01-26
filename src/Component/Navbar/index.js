import { useState, useContext, useEffect } from 'react';
import profile from '../../assets/image/profile.png';
import logo from '../../assets/icon/logo.png';
import Button from '../../Component/Button'
import LoginModal from '../Modal/LoginModal';
import RegisterModal from '../Modal/RegisterModal';
import { UserContext } from '../../Context/UserContext';
import Bill from '../../assets/icon/bill.png'
import logout from '../../assets/icon/logout.png'
import people from '../../assets/icon/people.png'
import music from '../../assets/icon/music.png'
import {Link} from "react-router-dom"

import './Navbar.scss'
import useDidMountEffect from '../../Config/useDidMountEffect';

export default function Navbar(props) {
    const {theme, showLogin} = props
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

    const showLoginModal = () => {
        setModalLogin(true)
    }

    useDidMountEffect(() => {
        showLoginModal()
    },[showLogin])

    return (
        <div className={`navbar ${theme}`}>
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
                        {state.user.length > 0 ? 
                            state.user[0].role === "admin" ?
                            <div>
                                <div className="item">
                                    <div className="icon">
                                        <img src={music} alt="bil" />
                                    </div>
                                    <Link to="/add-music">
                                        <p>Add Music</p>
                                    </Link>
                                </div>
                                <div className="item">
                                    <div className="icon">
                                        <img src={music} alt="bil" />
                                    </div>
                                    <Link to="/music">
                                        <p>List Music</p>
                                    </Link>
                                </div>
                                <div className="item">
                                    <div className="icon">
                                        <img src={people} alt="bil" />
                                    </div>
                                    <Link to="/add-artist">
                                        <p>Add Artist</p>
                                    </Link>
                                </div>
                                <div className="item">
                                    <div className="icon">
                                        <img src={people} alt="bil" />
                                    </div>
                                    <Link to="/artist">
                                        <p>List Artist</p>
                                    </Link>
                                </div>
                                <div className="item">
                                    <div className="icon">
                                        <img src={Bill} alt="bil" />
                                    </div>
                                    <Link to="/transaction">
                                        <p>Transactions</p>
                                    </Link>
                                </div>
                            </div>
                            :
                            <div className="item">
                                <div className="icon">
                                    <img src={Bill} alt="bil" />
                                </div>
                                <Link to="/pay">
                                    <p>Pay</p>
                                </Link>
                            </div>
                            :
                            <div></div>
                        }
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
