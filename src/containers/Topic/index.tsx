import { useParams } from "react-router-dom";
import React from "react";
import { Card, CardContent, CardHeader } from "@material-ui/core";

interface Props {}
const Topic: React.FC<Props> = () => {
  let { topicId } = useParams<{ topicId: string }>();
  return (
    <Card>
      <CardHeader title="Requested topic ID:"></CardHeader>
      <CardContent>{topicId}</CardContent>
    </Card>
  );
};
export default Topic;
