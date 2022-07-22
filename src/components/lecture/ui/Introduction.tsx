import Title from "./Title";
import Text from "./Text";
import { useState } from "react";
import { Button, Typography } from "@mui/material";
import { colors } from "../../../config/colorPalette";
import { lectures } from "../../../config/lecturesConfig";
import { Link } from "react-router-dom";

interface Texts {
  lectureTitle: string;
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
        margin: "10px",
        marginBottom: "25px",
      }}
    >
      <Typography sx={{ fontFamily: "Roboto", color: colors.darkMain }}>
        {texts.lectureTitle}
      </Typography>
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
