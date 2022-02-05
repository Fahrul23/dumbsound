import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-modal';
import propTypes from "prop-types";
import Input from '../../Input';
import Button from '../../Button';
import Alert from '../../Alert';
import { API } from '../../../Config/Api';
import { UserContext } from '../../../Context/UserContext';
import './register.scss'
import { useAlert } from 'react-alert';

const modalStyles = { 
    overlay :{
        backgroundColor: 'rgba(4, 4, 4, 0.7)',
        zIndex: 1000,
    },
    content : {
        borderRadius:'10px',
        margin : 0,
        top: '40px',
        left: '33%',
        height: '86%',
        width : '380px',
        backgroundColor: '#1F1F1F',
        paddingLeft: '25px',
        paddingRight: '25px',
        paddingTop: '28px',
    }
}

function RegisterModal(props) {
    const {isOpen, closeModal, showModalLogin, setChange} = props
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [, dispatch] = useContext(UserContext)
    const alert = useAlert();


    const [form, setForm] = useState({
        email: "",
        password: "",
        fullName: ""
    });
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const toLogin = () => {
        closeModal()
        showModalLogin()
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
            let response = await API.post('/register', form, config)
        
            setLoading(false)
            dispatch({
                type: 'REGISTER_SUCCESS',
                payload: response.data.data
            })
            closeModal()
            setChange(true)

        } catch (error) {
            console.log(error)
            setMessage("Register Failed")
            setLoading(false)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setMessage('')
        },4000)
    },[message])

    return (
        <Modal isOpen={isOpen} onRequestClose={() => closeModal()} style={modalStyles}>
            <div className="login-wrapper">
            {message ? <Alert message={message}/> : <div></div>}
                <h2 style={{color: '#fff'}}>Register</h2>
                <form onSubmit={handleSubmit}>
                    <Input 
                        type="email"
                        name="email" 
                        placeholder="Email" 
                        onChange={handleChange}
                    />
                    <Input 
                        type="password"
                        name="password" 
                        placeholder="Password" 
                        onChange={handleChange}    
                    />
                    <Input 
                        type="text" 
                        name="fullName"
                        placeholder="Full Name" 
                        onChange={handleChange}
                    />
                    <div className="form-input">
                        <select 
                            id="standard-select"
                            name="gender" 
                            onChange={handleChange}
                        >
                        <option value="#">-- Gender --</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        </select>
                    </div>
                    <Input 
                        type="number" 
                        name="phone"
                        placeholder="Phone" 
                        onChange={handleChange}
                    />
                    <Input 
                        type="text" 
                        name="address"
                        placeholder="Address" 
                        onChange={handleChange}
                    />
                    <div className="button-submit">
                        <Button 
                            type="submit" 
                            className="btn btn-full btn-orange" 
                            text="Register"
                            loading={loading}
                        />
                    </div>
                </form>
                <div style={{color: '#ffffff', textAlign: 'center',marginTop: 15}}>
                    <p style={{cursor: 'pointer'}}  onClick={() => toLogin()}>Already have an account ? Klik <span>Here</span></p>
                </div>
            </div>
        </Modal>
    )
}

RegisterModal.propTypes = {
    isOpen : propTypes.bool,
    closeModal : propTypes.func,
    showModalLogin: propTypes.func
}

export default RegisterModal
