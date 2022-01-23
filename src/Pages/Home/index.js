import React, { useContext, useEffect, useState } from 'react'
// import Banner from '../Component/Banner'
import Navbar from '../../Component/Navbar';
import Cover from '../../assets/image/cover.png';
import Banner from '../../assets/image/banner.png';
import {API} from '../../Config/Api';
import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'
import './home.scss';
import { UserContext } from '../../Context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [musics, setMusics] = useState([])
    const [list, setList] = useState([])
    const [audioList,setAudioList] = useState([])
    const [play, setPlay] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [state, dispatch] = useContext(UserContext)
    let navigate = useNavigate();



    const getMusics = async () => {
        try {
            let response = await API.get('musics')
            setMusics(response.data.data)
            response.data.data.map(music => {    
                audioList.push(
                    {
                        name : music.title,
                        singer: music.Artist.name,
                        musicSrc: `http://localhost:5000/uploads/${music.attache}`
                    }
                )
                list.push("hello")
            })
        } catch (error) {
            console.log(error)
        }
    }

    const options = {
        theme: "dark",
        autoPlay: true,
        audioLists: audioList,
        toggleMode: false,
        showDestroy: false,
        showReload: false,
        showDownload: false,
        showLyric: false,
        drag: false,
        showThemeSwitch: false,
        quietUpdate: false,
        clearPriorAudioLists: true,
        showMediaSession: true,
        responsive: false,
        mode: "full",
    }

    const onPlayHandler = (title, singer,music) => {
        
        // cek login
        if(state.isLogin === false){
            setShowLogin(!showLogin)
        }
        
        // cek subscribe
        if(state.user.length > 0) {
            if(state.user[0].subscribe === false){
                navigate('/pay')
            }else {
                setPlay(!play);
                setPlay(true)
                const newAudioList= [...audioList]
                const filterAudio = newAudioList.filter(audio => audio.name !== title )
                filterAudio.unshift({
                    name: title,
                    singer: singer,
                    musicSrc:`http://localhost:5000/uploads/${music}`
                })
                setAudioList(filterAudio)        
            }
        }
    }
    useEffect(() => {
        getMusics()
    },[])

    return (
        <div>
            <Navbar showLogin={showLogin}/>
            <div className="banner">
                <img class="banner-image" src={Banner} alt="banner" />
                <div class="banner-content">
                    <div class="banner-title">
                        <h2>Connect on DumbSound</h2>
                    </div>
                    <div class="banner-description">
                        <p>Discovery, Stream, and share a constantly expanding mix of music
                            from emerging and major artists around the world</p>
                    </div>
                </div>
            </div>        
            <div class="music-wrapper">
                <div class="head">
                    <h4>Dengar dan Rasakan</h4>
                </div>
                <div class="music-list">
                    {musics.length > 0 ? musics.map(music => {
                        return (
                            <div 
                                class="card-music" 
                                onClick={() => onPlayHandler(music.title, music.Artist.name, music.attache) }
                            >
                                <div class="card-header">
                                    <img src={`http://localhost:5000/uploads/${music.thumbnail}`} alt="cover" />
                                </div>
                                <div class="card-body">
                                    <div class="title">
                                        <p>{music.title}</p>
                                        <p>{music.year}</p>
                                    </div>
                                    <div class="content">
                                        <p>{music.Artist.name}</p>
                                        {/* <a href="#"></a> */}
                                    </div>
                                </div>
                            </div>
                        )
                    })   
                        : <div></div>
                    }

                    
                </div>

            </div>
            {play === true && 
                <ReactJkMusicPlayer 
                    {...options}
                    onAudioPlay={play}
                />
            }
        </div>
    )
}
