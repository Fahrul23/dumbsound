import React from 'react'
// import Banner from '../Component/Banner'
import Navbar from '../../Component/Navbar'
import Cover from '../../assets/image/cover.png'
import Banner from '../../assets/image/banner.png'
import './home.scss'

export default function Home() {
    return (
        <div>
            <Navbar />
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
                    <div class="card-music">
                        <div class="card-header">
                            <img src={Cover} alt="cover" />
                        </div>
                        <div class="card-body">
                            <div class="title">
                                <p>Slow Dancing</p>
                                <p>2018</p>
                            </div>
                            <div class="content">
                                <p>Rush Man</p>
                            </div>
                        </div>
                    </div>
                    <div class="card-music">
                        <div class="card-header">
                            <img src={Cover} alt="cover" />
                        </div>
                        <div class="card-body">
                            <div class="title">
                                <p>Slow Dancing</p>
                                <p>2018</p>
                            </div>
                            <div class="content">
                                <p>Rush Man</p>
                            </div>
                        </div>
                    </div>
                    <div class="card-music">
                        <div class="card-header">
                            <img src={Cover} alt="cover" />
                        </div>
                        <div class="card-body">
                            <div class="title">
                                <p>Slow Dancing</p>
                                <p>2018</p>
                            </div>
                            <div class="content">
                                <p>Rush Man</p>
                            </div>
                        </div>
                    </div>
                    <div class="card-music">
                        <div class="card-header">
                            <img src={Cover} alt="cover" />
                        </div>
                        <div class="card-body">
                            <div class="title">
                                <p>Slow Dancing</p>
                                <p>2018</p>
                            </div>
                            <div class="content">
                                <p>Joji</p>
                            </div>
                        </div>
                    </div>
                    <div class="card-music">
                        <div class="card-header">
                            <img src={Cover} alt="cover" />
                        </div>
                        <div class="card-body">
                            <div class="title">
                                <p>Slow Dancing</p>
                                <p>2018</p>
                            </div>
                            <div class="content">
                                <p>Joji</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card-music">
                        <div class="card-header">
                            <img src={Cover} alt="cover" />
                        </div>
                        <div class="card-body">
                            <div class="title">
                                <p>Slow Dancing</p>
                                <p>2018</p>
                            </div>
                            <div class="content">
                                <p>Joji</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card-music">
                        <div class="card-header">
                            <img src={Cover} alt="cover" />
                        </div>
                        <div class="card-body">
                            <div class="title">
                                <p>Slow Dancing</p>
                                <p>2018</p>
                            </div>
                            <div class="content">
                                <p>Joji</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card-music">
                        <div class="card-header">
                            <img src={Cover} alt="cover" />
                        </div>
                        <div class="card-body">
                            <div class="title">
                                <p>Slow Dancing</p>
                                <p>2018</p>
                            </div>
                            <div class="content">
                                <p>Joji</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card-music">
                        <div class="card-header">
                            <img src={Cover} alt="cover" />
                        </div>
                        <div class="card-body">
                            <div class="title">
                                <p>Slow Dancing</p>
                                <p>2018</p>
                            </div>
                            <div class="content">
                                <p>Joji</p>
                            </div>
                        </div>
                    </div>
                    <div class="card-music">
                        <div class="card-header">
                            <img src={Cover} alt="cover" />
                        </div>
                        <div class="card-body">
                            <div class="title">
                                <p>Slow Dancing</p>
                                <p>2018</p>
                            </div>
                            <div class="content">
                                <p>Joji</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
