import React from "react";
import styles from "./style.scss";
import {
  Container,
  IconButton,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@material-ui/core";
import clariahImg from "./clariahLogo2.png";
import clariahIcon from "./clariahIcon.png";
import FontAwesomeIcon from "components/FontAwesomeIcon";
import { recommend } from "vocabulary-recommender/dist/recommend";
import { Arguments, Result } from "vocabulary-recommender/dist/interfaces";

interface Props {}

const LandingPage: React.FC<Props> = () => {
  const [category, setCategory] = React.useState<string>("all");
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [results, setResult] = React.useState<(Result & { category: string })[]>();
  const [searchError, setSearchError] = React.useState<string>();
  const [isHovering, setIsHovering] = React.useState<boolean>(false);

  const showInfoText = () => {
    // setIsHoveringIri(true);
    setIsHovering(true);
  };
  const hideInfoText = () => {
    // setIsHoveringIri(false);
    setIsHovering(false);
  };

  const queryClass: string = `# Contains a configured SPARQL query to search classes. 
  prefix dct: <http://purl.org/dc/terms/>
  prefix owl: <http://www.w3.org/2002/07/owl#>
  prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  prefix skos: <http://www.w3.org/2004/02/skos/core#>
  select ?iri ?label ?description ?score {
    {
      select ?iri (sample(?label) as ?label) (sample(?description) as ?description) (sum(?_score) as ?score) {
        {
          { ?iri a owl:Class. } union { ?iri a rdfs:Class. }
          filter(regex(str(?iri),'${searchTerm}','i'))
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
          filter(regex(str(?description),'${searchTerm}','i'))
          # Changed score from 1 to 0.8
          bind(0.8 as ?_score)
        } union {
          { ?iri a owl:Class. } union { ?iri a rdfs:Class. }
          ?iri rdfs:label|
               skos:altLabel|
               skos:prefLabel|
               skos:hiddenLabel ?label.
          filter(regex(str(?label),'${searchTerm}','i'))
          bind(1 as ?_score)
        }
      }
      group by ?iri
      order by desc(?score)
    }
  }
  limit 20`;
  const queryProp: string = `prefix dct: <http://purl.org/dc/terms/>
  prefix owl: <http://www.w3.org/2002/07/owl#>
  prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  prefix skos: <http://www.w3.org/2004/02/skos/core#>
  select ?iri ?label ?description ?score {
    {
      select ?iri (sample(?label) as ?label) (sample(?description) as ?description) (sum(?_score) as ?score) {
        {
          { ?iri a owl:DatatypeProperty. } union { ?iri a owl:ObjectProperty. } 
          filter(regex(str(?iri),'${searchTerm}','i'))
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
          filter(regex(str(?description),'${searchTerm}','i'))
          bind(0.8 as ?_score)
        } union {
          { ?iri a owl:DatatypeProperty. } union { ?iri a owl:ObjectProperty. }  
          ?iri rdfs:label|
               skos:altLabel|
               skos:prefLabel|
               skos:hiddenLabel ?label.
          filter(regex(str(?label),'${searchTerm}','i'))
          bind(1 as ?_score)
        }
      }
      group by ?iri
      order by desc(?score)
    }
  }
  limit 20`;

  let cat: string[] = [category];
  let terms: string[] = [searchTerm];
  if (category === "all") {
    cat = ["class", "property"];
    terms = [searchTerm, searchTerm];
  }

  const search = (event: React.FormEvent<HTMLFormElement>) => {
    setSearchError(undefined);
    event.preventDefault();
    // Jana: Add multiple searchTerms & categories
    const input: Arguments = {
      searchTerms: terms,
      categories: cat,
      endpoints: [],
      defaultEndpoint: {
        name: "iisg",
        type: "sparql",
        url: "https://api.druid.datalegend.net/datasets/IISG/iisg-kg/services/iisg-kg/sparql",
        queryClass: queryClass,
        queryProperty: queryProp,
      },
    };

    recommend(input)
      .then((value) => {
        const resultList = value?.resultObj
          ? value.resultObj
              .map((resultObj) => resultObj.results.map((result) => ({ ...result, category: resultObj.category })))
              .flat()
          : [];

        setResult(resultList.sort((first, second) => (second.score || -1) - (first.score || -1)));
      })
      .catch((error) => {
        setSearchError(error.message);
        console.error(error);
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
          <span>{results.length} results</span>
          <div className={styles.tableContainer}>
            <Table aria-label="table of the results">
              <TableHead>
                <TableRow>
                  <TableCell>
                    IRI
                    {isHovering && (
                      <>
                        <br></br>
                        <span>IRIs are used to uniquely describe information.</span>
                      </>
                    )}
                  </TableCell>
                  <TableCell>
                    Vocabulary
                    {isHovering && (
                      <>
                        <br></br>
                        <span>
                          Vocabularies define information terms that can be used to describe information in a
                          standardized format.
                        </span>
                      </>
                    )}
                  </TableCell>
                  <TableCell>
                    Description
                    {isHovering && (
                      <>
                        <br></br>
                        <span>A description of the IRI.</span>
                      </>
                    )}
                  </TableCell>
                  <TableCell>
                    Score
                    {isHovering && (
                      <>
                        <br></br>
                        <span>The score defines how well the IRI matches the search term.</span>
                      </>
                    )}
                  </TableCell>
                  <TableCell>
                    Category
                    {isHovering && (
                      <>
                        <br></br>
                        <span>
                          Classes describe the type of an instance. They can be in the subject or object position of a
                          triple. Properties describe the relationship between two instances. They are in the predicate
                          position. (subject, predicate, object)
                        </span>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((result, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{<a href={result.iri}>{result.iri}</a>}</TableCell>
                      <TableCell>{result.vocabulary}</TableCell>
                      <TableCell>{result.description}</TableCell>
                      <TableCell>{result.score}</TableCell>
                      <TableCell>{result.category}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <div className={styles.infoContainer} onMouseOver={showInfoText} onMouseOut={hideInfoText}>
              <FontAwesomeIcon icon={["fal", "circle-info"]} />
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};
export default LandingPage;
