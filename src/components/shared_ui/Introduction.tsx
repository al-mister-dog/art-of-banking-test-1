import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectUI, toggleTextExpanded } from "../../features/ui/uiSlice";
import Title from "./Title";
import Text from "./Text";
import { Button } from "@mui/material";

interface Texts {
  title: string;
  paragraphs: string[];
  assignment: string;
}
export default function Introduction({ texts }: { texts: Texts }) {
  const dispatch = useAppDispatch();
  const { textExpanded } = useAppSelector(selectUI);
  function toggleText(bool: boolean) {
    dispatch(toggleTextExpanded({ textExpanded: bool }));
  }
  return (
    <div
      style={{
        marginBottom: "25px",
      }}
    >
      <Title>{texts.title}</Title>
      {textExpanded ? (
        texts.paragraphs.map((paragraph, i) => <Text key={i}>{paragraph}</Text>)
      ) : (
        <Text>{texts.paragraphs[0]}</Text>
      )}
      {textExpanded && <Text bold={true}>{texts.assignment}</Text>}
      {textExpanded ? (
        <Button onClick={() => toggleText(false)}>...Close</Button>
      ) : (
        <Button onClick={() => toggleText(true)}>...Continue reading</Button>
      )}
    </div>
  );
}
