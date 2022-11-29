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
  Grid,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@material-ui/core";
import clariahImg from "./clariahLogo2.png";
import clariahIcon from "./clariahIcon.png";
import FontAwesomeIcon from "components/FontAwesomeIcon";
import { result, size } from "lodash-es";
import { recommend } from "vocabulary-recommender/dist/recommend";
import { Arguments, Recommended } from "vocabulary-recommender/dist/interfaces";

interface Props {}

const LandingPage: React.FC<Props> = () => {
  const [category, setCategory] = React.useState<string>("class");
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [results, setResult] = React.useState<Recommended>();
  const [searchError, setSearchError] = React.useState<string>();
  const search = (event: React.FormEvent<HTMLFormElement>) => {
    setSearchError(undefined);
    event.preventDefault();
    // Jana: Add multiple searchTerms & categories
    const input: Arguments = {
      searchTerms: ["Person"],
      categories: ["class"],
      endpoints: [],
      defaultEndpoint: {
        name: "iisg",
        type: "sparql",
        url: "https://api.druid.datalegend.net/datasets/IISG/iisg-kg/services/iisg-kg/sparql",
        queryClass: `# Contains a configured SPARQL query to search classes. 
        prefix dct: <http://purl.org/dc/terms/>
        prefix owl: <http://www.w3.org/2002/07/owl#>
        prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        prefix skos: <http://www.w3.org/2004/02/skos/core#>
        select ?iri ?label ?description ?score {
          {
            select ?iri (sample(?label) as ?label) (sample(?description) as ?description) (sum(?_score) as ?score) {
              {
                { ?iri a owl:Class. } union { ?iri a rdfs:Class. }
                filter(regex(str(?iri),'\${term}','i'))
                bind(1 as ?_score)
              } union {
                { ?iri a owl:Class. } union { ?iri a rdfs:Class. }
                ?iri dct:description|
                     rdfs:comment|
                     skos:changeNote|
                     skos:definition|
                     skos:editorialNote|
                     skos:example|
                     skos:historyNote|
                     skos:scopeNote ?description.
                filter(regex(str(?description),'\${term}','i'))
                # Changed score from 1 to 0.8
                bind(0.8 as ?_score)
              } union {
                { ?iri a owl:Class. } union { ?iri a rdfs:Class. }
                ?iri rdfs:label|
                     skos:altLabel|
                     skos:prefLabel|
                     skos:hiddenLabel ?label.
                filter(regex(str(?label),'\${term}','i'))
                bind(1 as ?_score)
              }
            }
            group by ?iri
            order by desc(?score)
          }
        }
        limit 10`,
        queryProperty: `prefix dct: <http://purl.org/dc/terms/>
        prefix owl: <http://www.w3.org/2002/07/owl#>
        prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        prefix skos: <http://www.w3.org/2004/02/skos/core#>
        select ?iri ?label ?description ?score {
          {
            select ?iri (sample(?label) as ?label) (sample(?description) as ?description) (sum(?_score) as ?score) {
              {
                { ?iri a owl:DatatypeProperty. } union { ?iri a owl:ObjectProperty. } 
                filter(regex(str(?iri),'\${term}','i'))
                bind(1 as ?_score)
              } union {
                { ?iri a owl:DatatypeProperty. } union { ?iri a owl:ObjectProperty. }  
                ?iri dct:description|
                     rdfs:comment|
                     skos:changeNote|
                     skos:definition|
                     skos:editorialNote|
                     skos:example|
                     skos:historyNote|
                     skos:scopeNote ?description.
                filter(regex(str(?description),'\${term}','i'))
                bind(0.8 as ?_score)
              } union {
                { ?iri a owl:DatatypeProperty. } union { ?iri a owl:ObjectProperty. }  
                ?iri rdfs:label|
                     skos:altLabel|
                     skos:prefLabel|
                     skos:hiddenLabel ?label.
                filter(regex(str(?label),'\${term}','i'))
                bind(1 as ?_score)
              }
            }
            group by ?iri
            order by desc(?score)
          }
        }
        limit 10`,
      },
    };
    recommend(input)
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
                      setCategory(event.target.value as string);
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
          <hr></hr>
          {results.resultObj.map((returnObj) => {
            return <>{returnObj.results.length} results</>;
          })}
          <Table aria-label="table of the results">
            <TableHead>
              <TableRow>
                <TableCell>
                  IRI
                  <FontAwesomeIcon icon={["fas", "info"]} />
                </TableCell>
                <TableCell>Vocabulary</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Category</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.resultObj.map((returnObj) =>
                returnObj.results.map((result, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{result.iri}</TableCell>
                      <TableCell>{result.vocabulary}</TableCell>
                      <TableCell>{result.description}</TableCell>
                      <TableCell>{result.score}</TableCell>
                      <TableCell>{category}</TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </Container>
  );
};
export default LandingPage;
