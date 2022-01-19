import React from 'react'
import Navbar from '../../Component/Navbar'
import './payment.scss';
import Input from '../../Component/Input';
import Button from '../../Component/Button';

export default function Payment() {
    
    const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        });
    }
    return (
        <div>
            <Navbar />
            <div className="payment">
                <div className="title">
                    <h2>Premium</h2>
                </div>
                <div className="description">
                    <p className="desc">Bayar sekarang dan nikmati streaming music yang kekinian dari DUMBSOUND</p>
                    <p className="contact">DUMBSOUND : 0981312323</p>
                </div>
                <form>
                    <Input 
                        type="text" 
                        placeholder="input your account number" 
                    />
                    <Input 
                        type="file"  
                    />
                    <Button 
                        type="submit" 
                        className="btn btn-full btn-orange" 
                        text="Send"
                    />
                </form>
            </div>
        </div>
    )
}
