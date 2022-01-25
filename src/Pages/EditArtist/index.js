import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useNavigate, useParams  } from 'react-router-dom';
import Button from '../../Component/Button';
import Input from '../../Component/Input';
import Navbar from '../../Component/Navbar';
import { API } from '../../Config/Api';
import '../AddMusic/addMusic.scss'

export default function EditArtist() {

    const [name, setName] = useState('')
    const [old, setOld] = useState('')
    const [type, setType] = useState('')
    const [startCareer, setStartCareer] = useState('')
    const [loading, setLoading] = useState(false)
    let navigate = useNavigate();
    let params = useParams();
    const alert = useAlert();
    const {id} = params
    
    const getArtist = async () => {
        try {
            let response = await API.get(`artist/${id}`)
            setName(response.data.data.name)
            setOld(response.data.data.old)
            setType(response.data.data.type)
            setStartCareer(response.data.data.startCareer)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        setLoading(true)
        try {
            e.preventDefault();
            const config = {
                Headers: {
                  "Content-type": "aplication/json"
                }
            }
            const data = {
                name,
                old,
                type,
                startCareer
            }
            const response = await API.patch(`artist/${id}`,data,config)
            console.log("response",response)
            setLoading(false)
            alert.success("Edit Artist Success!!");
            navigate('/artist')
        } catch (error) {
            setLoading(false)
            console.log(error.message)
        }
    }

    useEffect(() => {
        getArtist()
    },[])

    return (
        <div>
            <Navbar theme="dark"/>
            <div className="form-wrapper">
                <div className="head-music">
                    <h4>Edit Artist</h4>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-music">
                        <div className="form-input">
                            <Input 
                                type="text" 
                                name="name" 
                                placeholder="Name" 
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />            
                        </div>
                        <div className="form-input">
                            <Input 
                                type="text" 
                                name="old" 
                                placeholder="Old" 
                                onChange={(e) => setOld(e.target.value)}
                                value={old}
                            />            
                        </div>
                        <div className="form-input">
                            <select 
                                id="standard-select" 
                                onChange={(e) => setType(e.target.value)}
                                value={type}
                            >
                                <option value="#">-- Category --</option>
                                <option value="band">Band</option>
                                <option value="solo">Solo</option>
                            </select>
                        </div>
                        <div className="form-input">
                            <Input 
                            type="text" 
                            name="Start Career" 
                            placeholder="Start Career" 
                            onChange={(e) => setStartCareer(e.target.value)}
                            value={startCareer}
                            />
                        </div>
                        <div className='submit'>
                            <Button 
                                type="submit" 
                                className="btn btn-full btn-orange" 
                                text="Update Artist"
                                loading={loading}
                            />
                        </div>
                    </div>
                </form>      
            </div>
        </div>
    )
}
