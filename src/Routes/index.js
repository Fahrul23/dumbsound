import React from 'react'
import {
    Routes,
    Route,
  } from "react-router-dom";
import AddArtist from '../Pages/AddArtist';
import AddMusic from '../Pages/AddMusic';
import Artist from '../Pages/Artist';
import Home from '../Pages/Home';
import Music from '../Pages/Music';
import Payment from '../Pages/Payment';
import Transaction from '../Pages/Transaction';
import EditArtist from '../Pages/EditArtist';
import EditMusic from '../Pages/EditMusic';

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pay" element={<Payment />} />
            <Route path="/add-music" element={<AddMusic />} />
            <Route path="/music/:id" element={<EditMusic />} />
            <Route path="/add-artist" element={<AddArtist />} />
            <Route path="/music" element={<Music />} />
            <Route path="/artist" element={<Artist />} />
            <Route path="/artist/:id" element={<EditArtist />} />
            <Route path="/transaction" element={<Transaction />} />

        </Routes>
    )
}

export default Router
