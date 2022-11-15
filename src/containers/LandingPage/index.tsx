import React from "react";
import Svg from "components/Svg";
import triplyLogo from "./triply.svg";
import styles from "./style.scss";
import { Button, Container } from "@material-ui/core";
interface Props {}
const LandingPage: React.FC<Props> = () => {
  const [someObject, setSomeObject] = React.useState<{ key: number }>();
  return (
    <Container component="article">
      <h2>Landing Page</h2>
      <Button
        onClick={() => {
          setSomeObject({ key: 1 });
        }}
        variant="contained"
      >
        Contained
      </Button>
      <div>Result: {JSON.stringify(someObject, null, 2)}</div>
      <span>
        Brought to you by <Svg className={styles.svg} src={triplyLogo} />
      </span>
    </Container>
  );
};
export default LandingPage;
