import React from "react";
import FontAwesomeIcon from "components/FontAwesomeIcon";
import { Container, Paper } from "@material-ui/core";
interface Props {}
const About: React.FC<Props> = () => {
  return (
    <Container>
      <Paper>
        <Container>
          <article>
            <h2>About us</h2>
            <p>
              We like icons, espcially if they're pro!
              <FontAwesomeIcon icon={"thumbs-up"} />
              <FontAwesomeIcon icon={["fas", "thumbs-up"]} />. You can find them all at{" "}
              <a href="https://fontawesome.com/" target="_blank" rel="noopener noreferrer">
                Fontawesome.com
              </a>
            </p>
            <p>
              We also like to not have to design all components. Thats why we use{" "}
              <a href="https://mui.com/core/" target="_blank" rel="noopener noreferrer">
                Material-ui
              </a>
              . Which also makes it so that we don't need to create a style ourselves since it is based on{" "}
              <a href="https://m3.material.io/" target="_blank" rel="noopener noreferrer">
                Google's Material Design
              </a>
            </p>
          </article>
        </Container>
      </Paper>
    </Container>
  );
};
export default About;
