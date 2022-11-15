import { Link, Routes, Route } from "react-router-dom";
import React from "react";
import Topic from "containers/Topic";
import { Container } from "@material-ui/core";

interface Props {}
const Topics: React.FC<Props> = () => {
  return (
    <Container>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`components`}>Components</Link>
        </li>
        <li>
          <Link to={`props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Routes>
        <Route index element={<h3>Please select a topic.</h3>}></Route>
        <Route path={`:topicId`} element={<Topic />}></Route>
      </Routes>
    </Container>
  );
};

export default Topics;
