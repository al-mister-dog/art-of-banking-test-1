import { lectures } from "../config/lecturesConfig";
import Introduction from "../components/lecture/steps/Introduction";
import StepComponent from "../components/lecture/steps/Step";
import StepperIndex from "../components/lecture/steps/Stepper";

const config = lectures.fundamentals.steps;


function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <Introduction text={config[1].text} />;
    case 1:
      return <StepComponent text={config[2].text} config={config[2]} />;
    case 2:
      return <StepComponent text={config[3].text} config={config[3]} />;
    case 3:
      return <StepComponent text={config[4].text} config={config[4]} />;
    case 4:
      return <StepComponent text={config[5].text} config={config[5]} />;
    // case 5:
    //   return <Playground />;
    default:
      return "Unknown step";
  }
}
export const steps = [
  "Introduction",
  "Balance Sheets and Deposits",
  "Deposit Transfers",
  "Overdrafts",
  "Constraints",
  "Playground",
];

export default function Fundamentals() {
  return (
    <StepperIndex steps={steps} getStepContent={getStepContent}/>
  )
}
