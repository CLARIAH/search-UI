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
  TablePagination,
  TableFooter,
  Tooltip,
} from "@material-ui/core";
import clariahImg from "./clariahLogo2.png";
import clariahIcon from "./clariahIcon.png";
import { Endpoint, Input, Result } from "vocabulary-recommender/dist/interfaces";
import { homogeneousRecommendation } from "vocabulary-recommender/dist/homogeneous";
import { singleRecommendation } from "vocabulary-recommender/dist/singleRecommend";

interface Props {}

const LandingPage: React.FC<Props> = () => {
  const [category, setCategory] = React.useState<string>("all");
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [endpoint, setEndpoint] = React.useState<string>(
    "https://api.triplydb.com/datasets/okfn/lov/services/lov/sparql"
  );
  const [results, setResult] = React.useState<Result[]>();
  const [searchError, setSearchError] = React.useState<string>();
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = React.useState(false);

  const changePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    // Go to the next results page
    setCurrentPage(page);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  // const handleCatChange = (event: React.ChangeEvent<{}>) => {
  //   setCategory(event.target.value as string);
  // }

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
          bind(if(regex(str(?iri),'${searchTerm}','i'),1,0) as ?_score)
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
          bind(if(regex(str(?description),'${searchTerm}','i'),0.8,0) as ?_score)
        } union {
          { ?iri a owl:Class. } union { ?iri a rdfs:Class. }
          ?iri rdfs:label|
               skos:altLabel|
               skos:prefLabel|
               skos:hiddenLabel ?label.
          bind(if(regex(str(?label),'${searchTerm}','i'),1,0) as ?_score)
        }
      }
      group by ?iri
      order by desc(?score)
    }
    filter(?score > 0)
  }
  `;
  const queryProp: string = `prefix dct: <http://purl.org/dc/terms/>
  prefix owl: <http://www.w3.org/2002/07/owl#>
  prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  prefix skos: <http://www.w3.org/2004/02/skos/core#>
  select ?iri ?label ?description ?score {
    {
      select ?iri (sample(?label) as ?label) (sample(?description) as ?description) (sum(?_score) as ?score) {
        {
          { ?iri a owl:DatatypeProperty. } union { ?iri a owl:ObjectProperty. } 
          bind(if(regex(str(?iri),'${searchTerm}','i'),10,0) as ?_score)
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
          bind(if(regex(str(?description),'${searchTerm}','i'),8,0) as ?_score)
        } union {
          { ?iri a owl:DatatypeProperty. } union { ?iri a owl:ObjectProperty. }  
          ?iri rdfs:label|
               skos:altLabel|
               skos:prefLabel|
               skos:hiddenLabel ?label.
               bind(if(regex(str(?label),'${searchTerm}','i'),10,0) as ?_score)
        }
      }
      group by ?iri
      order by desc(?score)
    }
    filter(?score > 0)
  }
  `;

  let inputList: Input[] = [{ searchTerm: searchTerm, category: category }];

  const defaultEndpoint: Endpoint = {
    type: "sparql",
    url: endpoint,
    queryClass: queryClass,
    queryProperty: queryProp,
  };

  const search = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    //?
    setSearchError(undefined);
    //?
    event.preventDefault();

    homogeneousRecommendation(inputList, defaultEndpoint, {})
      .then((value) => {
        const resultList = value[0][0].single;
        //setResult(resultList.filter((result: Result) => result.vocabPrefix != "no results"));
        resultList.filter((result: Result) => result.vocabPrefix != "no results");
        resultList.map((result: Result) => {
          if (result.score < 0.01) {
            return (result.label = "weak");
          } else if (result.score < 0.1) {
            return (result.label = "moderate");
          } else {
            return (result.label = "strong");
          }
        });
        setResult(resultList);
        setLoading(false);
        setCurrentPage(0);
      })
      .catch((error) => {
        setSearchError(error.message);
        console.error(error);
      });
  };

  const searchCat = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
    setLoading(true);
    //?
    setSearchError(undefined);
    //?
    event.preventDefault();

    homogeneousRecommendation(inputList, defaultEndpoint, {})
      .then((value) => {
        const resultList = value[0][0].single;
        //setResult(resultList.filter((result: Result) => result.vocabPrefix != "no results"));
        resultList.filter((result: Result) => result.vocabPrefix != "no results");
        resultList.map((result: Result) => {
          if (result.score < 0.01) {
            return (result.label = "weak");
          } else if (result.score < 0.1) {
            return (result.label = "moderate");
          } else {
            return (result.label = "strong");
          }
        });
        setResult(resultList);
        setLoading(false);
        setCurrentPage(0);
      })
      .catch((error) => {
        setSearchError(error.message);
        console.error(error);
      });
  };

  // Returns the website
  return (
    <Container>
      <div>
        <img src={clariahImg} className={styles.logo} alt="Clariah logo" />
      </div>
      <form className={styles.searchInput} onSubmit={search}>
        <div className={styles.searchTerm}>
          <h1>Vocabulary Recommender</h1>
          {/* searchBar */}
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
                    value={category}
                    label="Category type of results"
                    onChange={(event) => {
                      setCategory(event.target.value as string);
                      search(event);
                    }}
                    className={styles.selectInput}
                    title="Select the category"
                    aria-label="category selection"
                  >
                    <MenuItem value={"all"}>all</MenuItem>
                    <MenuItem value={"class"}>class</MenuItem>
                    <MenuItem value={"property"}>property</MenuItem>
                  </Select>
                  <Select
                    value={endpoint}
                    label="Endpoint selection"
                    onChange={(event) => {
                      console.log(endpoint);
                      setEndpoint(event.target.value as string);
                      console.log(endpoint);
                      //searchAuto(event)
                    }}
                    title="Select the endpoint"
                    aria-label="endpoint selection"
                  >
                    <MenuItem value={"https://api.triplydb.com/datasets/okfn/lov/services/lov/sparql"}>lov</MenuItem>
                    <MenuItem value={"https://api.druid.datalegend.net/datasets/IISG/iisg-kg/services/iisg-kg/sparql"}>
                      iisg
                    </MenuItem>
                  </Select>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit" aria-label="Search" title="Search">
                    <img src={clariahIcon} className={styles.icon} alt="" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
          ></TextField>
          {loading && <span>Loading...</span>}
        </div>
      </form>
      {/* if search is successful: return the results */}
      {results && (
        <div className={styles.resultsContainer}>
          <hr></hr>
          <span>{results.length} results</span>
          <Table aria-label="table of the results">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Tooltip
                    title={<span className={styles.infoText}>IRIs are used to uniquely describe information.</span>}
                  >
                    <span>IRI</span>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip
                    title={
                      <span className={styles.infoText}>
                        Vocabularies define information terms that can be used to describe information in a standardized
                        format.
                      </span>
                    }
                  >
                    <span>Vocabulary</span>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title={<span className={styles.infoText}>A description of the IRI.</span>}>
                    <span>Description</span>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip
                    title={
                      <span className={styles.infoText}>
                        The score defines how well the IRI matches the search term. The highest score is 1, the lowest
                        is 0.
                      </span>
                    }
                  >
                    <span>Score</span>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip
                    title={
                      <span className={styles.infoText}>
                        Classes describe the type of an instance. They can be in the subject or object position of a
                        triple. Properties describe the relationship between two instances. They are in the predicate
                        position. (subject, predicate, object)
                      </span>
                    }
                  >
                    <span>Category</span>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results
                .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
                .map((result, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        {<a href={result.iri}>{result.iri.replace(result.vocabDomain, result.vocabPrefix + ":")}</a>}
                      </TableCell>
                      <TableCell>{<a href={result.vocabDomain}>{result.vocabPrefix}</a>}</TableCell>
                      <TableCell>{result.description}</TableCell>
                      {/* <TableCell>{result.score.toFixed(2)}</TableCell> */}
                      <TableCell>
                        {result.label} ({result.score.toFixed(2)})
                      </TableCell>
                      <TableCell>{result.category}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <TableFooter>
            <TablePagination
              count={results.length}
              onPageChange={changePage}
              page={currentPage}
              rowsPerPage={rowsPerPage}
              component="div"
              onRowsPerPageChange={handleChangeRowsPerPage}
            ></TablePagination>
          </TableFooter>
        </div>
      )}
    </Container>
  );
};
export default LandingPage;
