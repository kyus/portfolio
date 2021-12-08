import React, {useState} from "react";
import {Route, Routes} from "react-router-dom";
import Portfolio from "./Portfolio";
import About from "./About";

function Main() {
  return (
    <Routes>
      <Route path={"/*"} element={<Portfolio />} />
      <Route path={"/about"} element={<About />} />
    </Routes>
  )
}

export default Main;
