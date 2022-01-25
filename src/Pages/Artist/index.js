import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import action from '../../assets/icon/action.png'
import Navbar from '../../Component/Navbar';
import { API } from '../../Config/Api';
import '../Music/tabel.scss'

export default function Artist() {
    const [active, setActive] = useState('')
    const [artists, setArtists] = useState([])
    const [change, setChange] = useState(false)
    const navigate = useNavigate();
    const alert = useAlert();

    
    const getArtists = async () => {
        try {
            let response = await API.get('artists')
            setArtists(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    const deleteArtist = async (id) => {
        try {
            await API.delete(`artist/${id}`)
            setChange(!change) 
            alert.success("Delete Success");
            
        } catch (error) {
            console.log(error)
        }
    }

    const editArtist = async (id) => {
        navigate(`/artist/${id}`)
    }

    useEffect(()=>{
        getArtists()
    },[change])
    return (
        <div>
            <Navbar theme="dark"/>    
            <div className="tabel-wrapper">
                <div className="title">
                    <h4>List Artist</h4>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Old</th>
                            <th>Type</th>
                            <th>start Career</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {artists.length > 0 && artists.map((artist, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{artist.name}</td>
                                    <td>{artist.old}</td>
                                    <td>{artist.type}</td>
                                    <td>{artist.startCareer}</td>
                                    <td>
                                        <div className="action" onClick={() => setActive(index)}>
                                            <img src={action} width={20} height={20} alt="action" />
                                            <div className={`option ${active === index ? "" : "active"}`}>
                                                <div className="triangle-wrapper">
                                                    <div className="triangle"></div>
                                                </div>
                                                <p 
                                                    className="success"
                                                    onClick={() => editArtist(artist.id)}
                                                >Edit</p>
                                                <p 
                                                    className="failed"
                                                    onClick={() => deleteArtist(artist.id)}
                                                >Delete</p>
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
