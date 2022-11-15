import React from "react";
import Svg from "components/Svg";
import triplyLogo from "./triply.svg";
import styles from "./style.scss";
import { Container } from "@material-ui/core";
interface Props {}
const LandingPage: React.FC<Props> = () => {
  return (
    <Container component="article">
      <h2>Landing Page</h2>
      <span>
        Brought to you by <Svg className={styles.svg} src={triplyLogo} />
      </span>
    </Container>
  );
};
export default LandingPage;
