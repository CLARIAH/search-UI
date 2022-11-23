import React from "react";
import Svg from "components/Svg";
import triplyLogo from "./triply.svg";
import styles from "./style.scss";
import {
  ClickAwayListener,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Container,
  Input,
  IconButton,
} from "@material-ui/core";
import clariahImg from "./clariahLogo2.png";
import clariahIcon from "./clariahIcon.png";
import FontAwesomeIcon from "components/FontAwesomeIcon";
import { size } from "lodash-es";

interface Props {}

const LandingPage: React.FC<Props> = () => {
  // For the Button
  const [someObject, setSomeObject] = React.useState<{ key: number }>();
  const [nav, setNavigation] = React.useState<string>();
  // For the info
  const [open, setOpen] = React.useState(false);
  const handleClickAway = () => {
    setOpen(false);
  };
  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Container>
      <img src={clariahImg} className={styles.logo}></img>
      <div className={styles.div1}>
        <div className={styles.div2}>
          <h1>Vocabulary Recommender</h1>
          <div className={styles.searchBar}>
            <Input fullWidth={true} disableUnderline={true} placeholder="Enter search term"></Input>
            <IconButton children={<img src={clariahIcon} className={styles.icon} />}></IconButton>
          </div>
          <div className={styles.classProp}>
            <div>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Class (C)" />
              <button className={styles.info}>info</button>
            </div>
            <div>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Property (P)" />
              <button className={styles.info}>info</button>
            </div>
          </div>
        </div>
      </div>
      {/* <Button
        onClick={() => {
          setSomeObject({ key: 1 });
        }}
        variant="contained"
      >
        Contained
      </Button> */}
      <div>{nav}</div>
      <FormGroup>
        {/* <ClickAwayListener onClickAway={handleClickAway}>
          <Box sx={{ position: 'relative' }}>
            <button type="button" onClick={handleClick}>
              Info
            </button>
          {/* {open ? (
            <Box sx={styles}>
              “Class (C)”:
              A class defines the type of a thing.
              In a triple classes are found in the subject or in the object position.
              (Subject, Predicate, Object)
            </Box>
          ) : null} */}
        {/* </Box>
        </ClickAwayListener> */}

        <ClickAwayListener onClickAway={handleClickAway}>
          <Box sx={{ position: "relative" }}>
            <button type="button" onClick={handleClick}>
              Info
            </button>
            {open ? (
              <Box sx={styles}>
                “Property (P)”:~{"\n"}A property defines the relationship between two things. In a triple properties are
                found in the predicate position. (Subject, Predicate, Object) “Class (C)”: A class defines the type of a
                thing. In a triple classes are found in the subject or in the object position. (Subject, Predicate,
                Object)
              </Box>
            ) : null}
          </Box>
        </ClickAwayListener>
      </FormGroup>
      <div>Result: {JSON.stringify(someObject, null, 2)}</div>
    </Container>
  );
};
export default LandingPage;
