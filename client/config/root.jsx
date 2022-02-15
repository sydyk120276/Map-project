import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Maps from '../components/map'
import Shaurma from "../components/shaurma";
import Shkoly from '../components/shkoly';
import Police from '../components/polise';
import Hotels from '../components/hotels';

const Root = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Maps />} />
        <Route path="/test" element={<Shaurma />} />
        <Route path="/test/school" element={<Shkoly />} />
        <Route path="/test/school/hotels/police" element={<Police />} />
        <Route path="/test/school/hotels" element={<Hotels />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Root
