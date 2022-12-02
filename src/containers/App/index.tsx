import React from "react";
import LandingPage from "containers/LandingPage";
require("../../theme/global.scss");
interface Props {}
const App: React.FC<Props> = () => {
  return (
    <>
      <LandingPage />
    </>
  );
};
export default App;
