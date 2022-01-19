import React, {useContext, useEffect, useState} from 'react'
import Modal from 'react-modal';
import propTypes from "prop-types";
import Input from '../../Input'
import Button from '../../Button'
import Alert from '../../Alert'
import { API } from '../../../Config/Api';
import { UserContext } from '../../../Context/UserContext';


const modalStyles = { 
    overlay :{
        backgroundColor: 'rgba(4, 4, 4, 0.7)',
        zIndex: 1000,
    },
    content : {
        borderRadius:'10px',
        paddingTop: '5px',
        margin : 0,
        paddingLeft: 0,
        paddingRight:0,
        top: '106px',
        left: '33%',
        width : '380px',
        height : '260px',
        backgroundColor: '#1F1F1F',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '25px'
    }
}

function LoginModal(props) {
    const {showModalRegister, isOpen, closeModal, setChange} = props
    const [message, setMessage] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        email: "",
        password: "",
       
    });
    const [state, dispatch] = useContext(UserContext)

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
        console.log(form)
    }
    const toRegister = () => {
        closeModal()
        showModalRegister()
    }
    const handleSubmit = async (e) => {
        setLoading(true)
        try {
            e.preventDefault()

            const config = {
                Headers: {
                    "Content-type" : "aplication/json"
                }
            }
           
            let response = await API.post('/login', form, config)

            if(response.status === 200){
                setLoading(false)        
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: response.data.data
                })
                closeModal()
                setChange(true)
            }

        } catch (error) {
            setLoading(false)
            setMessage("Login Failed")
        }
    }
    
    useEffect(() => {
        setTimeout(() => {
            setMessage('')
        },4000)
        console.log(state)
    },[message])

    return (
        <Modal isOpen={isOpen} onRequestClose={() => closeModal()} style={modalStyles}>
            {message ? <Alert message={message}/> : <div></div>}
            <div className="login-wrapper">
                <h2 style={{color: '#fff'}}>Login</h2>
                <form onSubmit={handleSubmit}>
                    <Input 
                        type="email" 
                        name="email"
                        placeholder="Email" 
                        onChange={handleChange}/>
                    <Input 
                        type="password"
                        name="password" 
                        placeholder="Password" 
                        onChange={handleChange}
                    />
                    <div className="button-submit">
                        <Button 
                            type="submit" 
                            className="btn btn-full btn-orange" 
                            text="Login"
                            loading={loading}
                        />
                    </div>
                    <div style={{color: '#ffffff', textAlign: 'center',marginTop: 15}}>
                        <p style={{cursor: 'pointer'}}  onClick={() => toRegister()}>Don't have an account ? Klik <span>Here</span></p>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

LoginModal.propTypes = {
    isOpen : propTypes.bool,
    closeModal : propTypes.func,
    showModalRegister: propTypes.func
}
export default LoginModal
