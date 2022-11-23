import React from "react";
import Svg from "components/Svg";
import styles from "./style.scss";
import {
  ClickAwayListener,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Container,
  OutlinedInput,
} from "@material-ui/core";
import clariahImg from "./clariahLogo2.png";
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
      <img src={clariahImg} className={styles.logo}></img>
      <h2>Vocabulary Recommender</h2>
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
    </Container>
  );
};
export default Results;
