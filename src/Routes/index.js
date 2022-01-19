import React from 'react'
import {
    Routes,
    Route,
  } from "react-router-dom";
import Home from '../Pages/Home';
import Payment from '../Pages/Payment';

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pay" element={<Payment />} />
        </Routes>
    )
}

export default Router
