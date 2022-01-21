import React, { useEffect, useState } from 'react';
import action from '../../assets/icon/action.png'
import { API } from '../../Config/Api';
import './tabel.scss'

export default function Music() {
    const [active, setActive] = useState('')
    const [musics, setMusics] = useState([])
    const [change, setChange] = useState(false)
    const getMusic = async () => {
        try {
            let response = await API.get('musics')
            setMusics(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteMusic = async (id) => {
        try {
            let response = await API.delete(`music/${id}`)
            setChange(!change) 
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getMusic()
    },[change])
    return (
        <div className="tabel-wrapper">
            <div className="title">
                <h4>List Music</h4>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Artis</th>
                        <th>Title</th>
                        <th>Year</th>
                        <th>Thumbnail</th>
                        <th>Attache</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {musics.length > 0 && musics.map((music, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{music.Artist.name}</td>
                                <td>{music.title}</td>
                                <td>{music.year}</td>
                                <td>
                                    <img 
                                        src={`http://localhost:5000/uploads/${music.thumbnail}`} 
                                        alt="thumbnail"
                                        width={60}
                                        height={60} 
                                    />
                                </td>
                                <td>{music.attache}</td>
                                <td>
                                    <div className="action" onClick={() => setActive(index)}>
                                        <img src={action} width={20} height={20} alt="action" />
                                        <div className={`option ${active === index ? "" : "active"}`}>
                                            <div className="triangle-wrapper">
                                                <div className="triangle"></div>
                                            </div>
                                            <p className="success">Edit</p>
                                            <p 
                                                className="failed"
                                                onClick={() => deleteMusic(music.id)}
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
    )
}
