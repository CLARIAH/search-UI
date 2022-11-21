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
  TextField,
  Input,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";

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
    <Container component="article">
      <img src={require("./clariahLogo2.png")} width="500" height="333" />
      <h2>Vocabulary Recommender</h2>
      <Button
        onClick={() => {
          setSomeObject({ key: 1 });
        }}
        variant="contained"
      >
        Contained
      </Button>
      <OutlinedInput placeholder="Enter search term"></OutlinedInput>
      <Button
        onClick={() => {
          setNavigation("Hi");
        }}
        variant="contained"
      >
        start search
      </Button>
      <div>{nav}</div>
      <FormGroup>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Class (C)" />
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
        <FormControlLabel control={<Checkbox defaultChecked />} label="Property (P)" />
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
      <span>
        Brought to you by <Svg className={styles.svg} src={triplyLogo} />
      </span>
    </Container>
  );
};
export default LandingPage;
