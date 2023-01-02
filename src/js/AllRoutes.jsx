import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from '../pages/LoginPage'
import MainPage from '../pages/MainPage'
import CariKayit from '../pages/CariKayit'
import CariHareket from '../pages/CariHareket'
import StokKayit from '../pages/StokKayit'
import Siparis from '../pages/Siparis'
import GorevTakip from '../pages/GorevTakip'

export default function AllRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/giris" element={<LoginPage />} />
        <Route path="/" element={<MainPage />}>
          <Route path=":cari-kayit" element={<CariKayit />} />
          <Route path=":cari-hareket" element={<CariHareket />} />
          <Route path=":stok-kayit" element={<StokKayit />} />
          <Route path=":siparis" element={<Siparis />} />
          <Route path=":gorev-takip" element={<GorevTakip />} />
          {/* <Route index={true} element={<Collections />} />
          <Route path=":colID" element={<Folders />} />
          <Route path=":colID/:foldID" element={<Files />} />
          <Route path=":colID/:foldID/:fileID" element={<ChartLayout />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}