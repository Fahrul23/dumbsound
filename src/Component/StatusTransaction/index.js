import React from 'react';
import Button from '../Button';
import './status.scss'
export default function StatusTransaction({payAgain,title, image, description, status}) {
    let statusPayment = ''
    if(status === "pending"){
        statusPayment = "pending-status"
    }else if(status === "success"){
        statusPayment="success-status"
    }else {
        statusPayment = "failed-status"
    }
    return (
        <div className="status-payment">
            <div className="img-status">
                <img src={image} alt="failed" />
            </div>
            <div className="description-status">
                <h4 className={statusPayment}>{title}</h4>
                <p>{description}</p>
            </div>
            {status === "failed" && (
            <div className="try-again">
                <Button  
                className="btn btn-full btn-orange" 
                text="Pay Again"
                onClick={() => payAgain()}
                />
            </div>
            )}
        </div>
  )
}
