import React from 'react'
import Navbar from '../../Component/Navbar'
import './payment.scss';
import Input from '../../Component/Input';
import Button from '../../Component/Button';
import File from '../../assets/icon/file.png'
import InputFile from '../../Component/Input/InputFile';

export default function Payment() {
    
    return (
        <div>
            <Navbar />
            <div class="payment-wrapper">
                <div class="payment">
                    <h4>Premium</h4>
                    <div class="desc">
                        <p>Bayar sekarang dan nikmati streaming music yang kekinian dari </p>
                        <p class="app-name">DUMB<span>SOUND</span></p>
                    </div>
                    <div class="contact">
                        <p class="app-name">DUMB<span>SOUND</span></p>
                        <p class="number">: 0981312323</p>
                    </div>
                    <form>
                        <div class="form-payment">
                            <div class="form-input">
                                <Input type="text" placeholder="Input your account number" />
                            </div>
                            <InputFile text="Attache proof of transfer"/>
                            {/* <div class="img-preview">
                                <img src={File} alt="img-preview" />
                            </div>         */}
                            <div class="submit">
                                <Button 
                                    type="submit" 
                                    className="btn btn-full btn-orange" 
                                    text="Pay"
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
