import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from '../pages/LoginPage'
import MainPage from '../pages/MainPage'

export default function AllRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/giris" element={<LoginPage />} />
        <Route path="/" element={<MainPage />}>
          {/* <Route index={true} element={<Collections />} />
          <Route path=":colID" element={<Folders />} />
          <Route path=":colID/:foldID" element={<Files />} />
          <Route path=":colID/:foldID/:fileID" element={<ChartLayout />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
