import React from "react";
import LandingPage from "containers/LandingPage";
require("../../theme/global.scss");
interface Props {}
const App: React.FC<Props> = () => {
  return (
    <>
      {/* Insert all pages here to be dymamically loaded */}
      <LandingPage />
    </>
  );
};
export default App;
