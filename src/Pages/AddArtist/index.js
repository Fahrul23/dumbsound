import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Component/Button';
import Input from '../../Component/Input';
import Navbar from '../../Component/Navbar';
import { API } from '../../Config/Api';
import '../AddMusic/addMusic.scss'

export default function AddArtist() {

    const [name, setName] = useState('')
    const [old, setOld] = useState('')
    const [type, setType] = useState('')
    const [startCareer, setStartCareer] = useState('')
    const [loading, setLoading] = useState(false)
    let navigate = useNavigate();
    
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
            const response = await API.post('artist',data,config)
            console.log("response",response)
            setLoading(false)
            navigate('/artist')
        } catch (error) {
            setLoading(false)
            console.log(error.message)
        }
    }

    return (
        <div>
            <Navbar theme="dark"/>
            <div className="form-wrapper">
                <div className="head-music">
                    <h4>Add Artist</h4>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-music">
                        <div className="form-input">
                            <Input 
                                type="text" 
                                name="name" 
                                placeholder="Name" 
                                onChange={(e) => setName(e.target.value)}
                            />            
                        </div>
                        <div className="form-input">
                            <Input 
                                type="text" 
                                name="old" 
                                placeholder="Old" 
                                onChange={(e) => setOld(e.target.value)}
                            />            
                        </div>
                        <div className="form-input">
                            <select 
                                id="standard-select" 
                                onChange={(e) => setType(e.target.value)}
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
                            />
                        </div>
                        <div className='submit'>
                            <Button 
                            type="submit" 
                            className="btn btn-full btn-orange" 
                            text="Add Artist"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
