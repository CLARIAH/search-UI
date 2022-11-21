import { Routes, Route } from "react-router-dom";
import React from "react";
import About from "containers/About";
import Topics from "containers/Topics";
import LandingPage from "containers/LandingPage";
import Results from "containers/Results";
import NavBar from "./NavBar";
require("../../theme/global.scss");
interface Props {}
const App: React.FC<Props> = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/about" element={<About />}></Route>
        <Route path="/topics/*" element={<Topics />}></Route>
        <Route index element={<LandingPage />}></Route>
        <Route path="/results/*" element={<Results />}></Route>
        {/* <LandingPage/> */}
      </Routes>
    </>
  );
};
export default App;
