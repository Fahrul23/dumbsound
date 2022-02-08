import React, {useContext, useEffect, useState} from 'react'
import Navbar from '../../Component/Navbar'
import './payment.scss';
import Input from '../../Component/Input';
import Button from '../../Component/Button';
import InputFile from '../../Component/Input/InputFile';
import { API } from '../../Config/Api';
import successImg from '../../assets/image/success.jpg'
import pendingImg from '../../assets/image/pending.png'
import failedImg from '../../assets/image/failed.png'
import StatusTransaction from '../../Component/StatusTransaction';
import { useAlert } from 'react-alert';

export default function Payment() {
    const [preview, setPreview] = useState('')
    const [loading, setLoading] = useState(false)
    const [userId, setUserId] = useState('')
    const [attache, setAttache] = useState('')
    const [transaction,setTransaction] = useState([])
    const alert = useAlert();

    const handleChange = (e) => {
        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
            setAttache(e.target.files)
        }
    };

  const handleSubmit = async (e) => {
    setLoading(true)
        try {
            e.preventDefault();
            const config = {
                Headers: {
                  "Content-type": "multipart/form-data"
                }
            }
            const formData = new FormData()
            formData.set("userId",userId)
            formData.set("attache", attache[0], attache[0].name)
            
            const response = await API.post('transaction',formData,config)
            getTransaction()
            alert.success("upload Success!!");
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    const getTransaction = async () => {
        try {
            let response = await API.get(`transaction`)
            if(response.data.data !== null) {
                setTransaction(response.data.data)
            }
            console.log("response transaction", response.data.data)
        } catch (error) {
            console.log(error)
        }        
    }

    const payAgain = () => {
        setTransaction([])
    }

    useEffect(() => {
        getTransaction()
        console.log("transaction ====", transaction)
    },[])

    return (
        <div>
            <Navbar />
            {transaction.length <= 0 ? 
                <div className="payment-wrapper">
                    <div className="payment">
                        <h4>Premium</h4>
                        <div className="desc">
                            <p>Bayar sekarang dan nikmati streaming music yang kekinian dari </p>
                            <p className="app-name">DUMB<span>SOUND</span></p>
                        </div>
                        <div className="contact">
                            <p className="app-name">DUMB<span>SOUND</span></p>
                            <p className="number">: 0981312323</p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-payment">
                                <div className="form-input">
                                    <Input 
                                    type="text" 
                                    name="userId" 
                                    placeholder="Input your account number" 
                                    onChange={(e) => setUserId(e.target.value)}
                                    />
                                </div>
                                <InputFile 
                                name="attache" 
                                text="Attache proof of transfer"
                                onChange={handleChange}
                                />
                                {preview && (
                                <div className="img-preview">
                                    <img src={preview} alt="img-preview" />
                                </div>        
                                )}
                                <div className="submit">
                                    <Button 
                                        type="submit" 
                                        className="btn btn-full btn-orange" 
                                        text="Pay"
                                        loading={loading}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                :

                transaction.status === "pending" 
                    ?
                    <StatusTransaction 
                        title="Transaction Pending!!"
                        image={pendingImg}
                        status="pending"
                        description= "if the transaction status is still pending for more than 1 hour, Please contact admin via Email to confirm payment by attaching proof of payment"
                    />
                    :
                    transaction.status === "success" ?
                        <StatusTransaction 
                            title="Transaction Success"
                            image={successImg}
                            status="success"
                            description= "Your payment has been confirmed and now you can play all the music you like"
                        />
                        :
                        <StatusTransaction 
                            title="Transaction Failed"
                            image={failedImg}
                            status="failed"
                            description= "Sory, your transaction failed to be confirmed, please contact admin via email to reconfirm or make a payment again"
                            payAgain={payAgain}
                        />
                }
        </div>
    )
}
