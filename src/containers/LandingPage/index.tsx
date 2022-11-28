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
  Icon,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import clariahImg from "./clariahLogo2.png";
import clariahIcon from "./clariahIcon.png";
import FontAwesomeIcon from "components/FontAwesomeIcon";
import { result, size } from "lodash-es";
import { SparqlResult, sparqlSuggestions } from "vocabulary-recommender/dist/sparql";

type Category = "all" | "class" | "property";

interface Props {}

const LandingPage: React.FC<Props> = () => {
  const [category, setCategory] = React.useState<Category>("all");
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [results, setResult] = React.useState<SparqlResult[]>();
  const [searchError, setSearchError] = React.useState<string>();
  const search = (event: React.FormEvent<HTMLFormElement>) => {
    setSearchError(undefined);
    event.preventDefault();
    sparqlSuggestions(category, searchTerm, "https://api.triplydb.com/datasets/okfn/lov/services/lov/sparql")
      .then(setResult)
      .catch((error) => {
        setSearchError(error.message);
        console.log(error);
      });
  };
  return (
    <Container>
      <div>
        <img src={clariahImg} className={styles.logo} alt="Clariah logo" />
      </div>
      <form className={styles.searchInput} onSubmit={search}>
        <div className={styles.searchTerm}>
          <h1>Vocabulary Recommender</h1>
          <TextField
            variant="outlined"
            placeholder="Enter search term"
            autoFocus
            error={!!searchError}
            helperText={searchError}
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Age"
                    onChange={(event) => {
                      setCategory(event.target.value as Category);
                    }}
                    className={styles.selectInput}
                  >
                    <MenuItem value={"all"}>all</MenuItem>
                    <MenuItem value={"class"}>class</MenuItem>
                    <MenuItem value={"property"}>property</MenuItem>
                  </Select>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit" aria-label="Search">
                    <img src={clariahIcon} className={styles.icon} alt="" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
          ></TextField>
        </div>
      </form>
      {results && (
        <div className={styles.resultsContainer}>
          {results.length} results
          <ul>
            {results.map((result, index) => {
              return (
                <li key={index}>
                  {result.iri}
                  <br />
                  {result.description}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </Container>
  );
};
export default LandingPage;
