import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import Button from '../../Component/Button';
import Input from '../../Component/Input';
import InputFile from '../../Component/Input/InputFile';
import Navbar from '../../Component/Navbar';
import { API } from '../../Config/Api';
import './addMusic.scss'


export default function AddMusic() {
    const [artists, setArtist] = useState([])
    const [preview, setPreview] = useState('')
    const [loading, setLoading] = useState(false)
    const [artistId, setArtistId] = useState('')
    const [title, setTitle] = useState('')
    const [year, setYear] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [attache, setAttache] = useState('')
    const [audioPreview, setAudioPreview] = useState('')

    const alert = useAlert();

    const getArtists = async (req, res) => {

        try {
            let response = await API.get('artists')
            setArtist(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleThumbnail = (e) => {
        let url = URL.createObjectURL(e.target.files[0]);
        setPreview(url);
        setThumbnail(e.target.files)
    }

    const handleAttache = (e) => {
        setAudioPreview(e.target.files[0].name);
        setAttache(e.target.files)
    }

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
            formData.set("artistId",artistId)
            formData.set("title",title)
            formData.set("year",year)
            formData.set("thumbnail", thumbnail[0], thumbnail[0].name)
            formData.set("attache", attache[0], attache[0].name)
            
            const response = await API.post('music',formData,config)
            setLoading(false)
            alert.success("Add Music Success!!");
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    } 

    useEffect(() => {
        getArtists()
    },[])

    return (
        <div>
            <Navbar theme="dark"/>    
            <div className="form-wrapper">
                <div className="head-music">
                    <h4>Add Music</h4>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-music">
                        <div className="music-file">
                            <div className="form-input">
                                <Input 
                                    type="text" 
                                    name="title" 
                                    placeholder="Title" 
                                    onChange={(e) => setTitle(e.target.value)}
                                />            
                            </div>
                            <InputFile 
                                name="attache" 
                                text="Attache Thumbnail"
                                onChange={handleThumbnail}
                            />
                        </div>
                        {preview && (
                            <div className="img-preview">
                                <img src={preview} alt="img-preview" />
                            </div>
                        )}
                        <div className="form-input">
                            <Input 
                            type="text" 
                            name="year" 
                            placeholder="Year" 
                            onChange={(e) => setYear(e.target.value)}
                            />
                        </div>
                        <div className="form-input">
                            <select 
                                id="standard-select" 
                                onChange={(e) => setArtistId(e.target.value)}>
                                {artists.length > 0 ? artists.map(artist => {
                                return (
                                        <option value={artist.id}>{artist.name}</option>
                                    )
                                }) 
                                :
                                    <option value="Pop">Singer</option>
                                }
                            </select>
                        </div>
                        <div className="form-input-file">
                            <div className="file-input">
                                <input 
                                    type="file" 
                                    id="file" 
                                    className="file" 
                                    onChange={handleAttache}
                                />
                                <label for="file">Attache</label>
                            </div>
                            {audioPreview && (
                                <div className="audio-file">
                                <h5>{audioPreview}</h5>
                                </div>
                            )}
                        </div>
                        <div className='submit'>
                            <Button 
                                type="submit" 
                                className="btn btn-full btn-orange" 
                                text="Add Song"
                                loading={loading}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
