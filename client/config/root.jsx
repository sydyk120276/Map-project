import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Maps from '../components/map'
import Karta from '../components/karta'

const Root = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Maps />} />
        <Route path="/test" element={<div>This is Test</div>} />
        <Route path="*" element={<h3>404</h3>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Root
