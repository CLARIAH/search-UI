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

const Results: React.FC<Props> = () => {
  // For the info
  const [open, setOpen] = React.useState(false);
  const handleClickAway = () => {
    setOpen(false);
  };
  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  const numOfResults = 3;
  const results = [
    "http://xmlns.com/foaf/0.1/Person",
    "http://xmlns.com/foaf/0.1/Baum",
    "http://xmlns.com/foaf/0.1/Tablett",
  ];

  return (
    <Container component="article">
      {/* <img src={require("./clariahLogo2.png")} width="500" height="333"/> */}
      <h2>Vocabulary Recommender</h2>
      {/* <Button
        onClick={() => {
          setSomeObject({ key: 1 });
        }}
        variant="contained"
      >
        Contained
      </Button> */}
      <OutlinedInput placeholder="Here comes my search term"></OutlinedInput>
      <FormGroup>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Class (C)" />
        <ClickAwayListener onClickAway={handleClickAway}>
          <Box sx={{ position: "relative" }}>
            <button type="button" onClick={handleClick}>
              Info
            </button>
            {open ? (
              <Box>
                “Class (C)”: A class defines the type of a thing. In a triple classes are found in the subject or in the
                object position. (Subject, Predicate, Object)
              </Box>
            ) : null}
          </Box>
        </ClickAwayListener>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Property (P)" />
        <ClickAwayListener onClickAway={handleClickAway}>
          <Box sx={{ position: "relative" }}>
            <button type="button" onClick={handleClick}>
              Info
            </button>
            {open ? (
              <Box>
                “Property (P)”: A property defines the relationship between two things. In a triple properties are found
                in the predicate position. (Subject, Predicate, Object) “Class (C)”: A class defines the type of a
                thing. In a triple classes are found in the subject or in the object position. (Subject, Predicate,
                Object)
              </Box>
            ) : null}
          </Box>
        </ClickAwayListener>
      </FormGroup>
      <hr></hr>
      <div>{numOfResults} results</div>
      <div>{results}</div>
      {/* <div>Result: {JSON.stringify(someObject, null, 2)}</div> */}
      {/* <span> */}
      {/* Brought to you by <Svg className={styles.svg} src={triplyLogo} /> */}
      {/* </span> */}
    </Container>
  );
};
export default Results;
