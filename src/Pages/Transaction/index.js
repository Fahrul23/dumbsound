import React, { useContext, useEffect, useState } from 'react';
import action from '../../assets/icon/action.png'
import { API } from '../../Config/Api';
import { UserContext } from '../../Context/UserContext';
import Navbar from '../../Component/Navbar/'
import '../Music/tabel.scss'

export default function Transaction() {
    const [active, setActive] = useState('')
    const [transactions, setTransactions] = useState([])
    const [change, setChange] = useState(false)
    const [state, dispatch] = useContext(UserContext)
    
    const getTransaction = async () => {
        try {
            let response = await API.get('transactions')
            setTransactions(response.data.data)
            console.log(transactions)
        } catch (error) {
            console.log(error)
        }
    }
    const handleApprove = async (id) => {
        
        const initDate = new Date()
        const finishDate = new Date()
        finishDate.setMonth(1)
        const endDate = finishDate.toISOString().slice(0, 10)
        const startDate = initDate.toISOString().slice(0, 10)
        
        try {
            const config = {
                Headers: {
                  "Content-type": "aplication/json"
                }
            }
            const data = {
                startDate,
                endDate
            }
            
            const response = await API.post(`transaction/${id}`,data,config)
            setChange(!change)
                        
        } catch (error) {
            console.log(error)
        }
    }
    const handleCancel = async (id) => {
        
        try {
            const config = {
                Headers: {
                  "Content-type": "aplication/json"
                }
            }
            const response = await API.patch(`transaction/${id}`,config)
            setChange(!change)
                        
        } catch (error) {
            console.log(error)
        }
    }
    const reamingActive = (data1, data2) => {
        if(!data1 && !data2){
            return 0
        }
        const date1 = new Date(data1)
        const date2 = new Date(data2)
        const Difference_In_Time = date2.getTime() - date1.getTime();
        const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

        return Difference_In_Days
    }

    useEffect(()=>{
        getTransaction()
        console.log(transactions)

    },[change])
    return (
        <div>
            <Navbar theme="dark"/>    
            <div className="tabel-wrapper">
                <div className="title">
                    <h4>Incoming Transaction</h4>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>User</th>
                            <th>Bukti Transfer</th>
                            <th>Reaming Active</th>
                            <th>Status User</th>
                            <th>Status Payment</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.length > 0 && transactions.map((transaction, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{transaction.User.fullName}</td>
                                    <td>{transaction.attache}</td>
                                    <td>{reamingActive(transaction.startDate, transaction.endDate)} / hari</td>             
                                    {transaction.User.subscribe === false ? 
                                        <td className="failed">Non Active</td>
                                        :
                                        <td className="success">Active</td>
                                    }
                                    {transaction.status === "pending" ? 
                                        <td className="pending">{transaction.status}</td>
                                        : transaction.status === "success" ?
                                        <td className="success">{transaction.status}</td>
                                        :
                                        <td className="failed">{transaction.status}</td>
                                    }
                                    <td>
                                        <div className="action" onClick={() => setActive(index)}>
                                            <img src={action} width={20} height={20} alt="action" />
                                            <div className={`option ${active === index ? "" : "active"}`}>
                                                <div className="triangle-wrapper">
                                                    <div className="triangle"></div>
                                                </div>
                                                <p 
                                                    className="success"
                                                    onClick={() => handleApprove(transaction.id)}    
                                                >approve</p>
                                                <p 
                                                    className="failed"
                                                    onClick={() => handleCancel(transaction.id)}    
                                                >cancel</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        
        </div>
    )
}
