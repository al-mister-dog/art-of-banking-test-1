import Title from "./Title";
import Text from "./Text";
import { useState } from "react";
import { Button } from "@mui/material";

interface Texts {
  title: string;
  paragraphs: string[];
  assignment: string;
}
export default function Introduction({ texts }: { texts: Texts }) {
  const [expanded, setExpanded] = useState<boolean>(false);
  function toggleText() {
    setExpanded(!expanded);
  }
  return (
    <div
      style={{
        marginBottom: "25px",
      }}
    >
      <Title>{texts.title}</Title>
      {expanded ? (
        texts.paragraphs.map((paragraph, i) => <Text key={i}>{paragraph}</Text>)
      ) : (
        <Text>{texts.paragraphs[0]}</Text>
      )}
      {expanded && <Text bold={true}>{texts.assignment}</Text>}
      {expanded ? (
        <Button onClick={toggleText}>...Close</Button>
      ) : (
        <Button onClick={toggleText}>...Continue reading</Button>
      )}
    </div>
  );
}
