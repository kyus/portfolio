import React, {Dispatch, useState} from "react";
import {Route, Routes} from "react-router-dom";
import Portfolio from "./Portfolio";
import About from "./About";

function Main({setAction}:{setAction:Dispatch<string>}) {
  return (
    <Routes>
      <Route path={"/*"} element={<Portfolio />} />
      <Route path={"/about"} element={<About setAction={setAction} />} />
    </Routes>
  )
}

export default Main;
