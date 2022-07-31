import { lectures } from "../config/lecturesConfig";
import Introduction from "../components/lecture/steps/Introduction";
import StepComponent from "../components/lecture/steps/Step";
import StepperIndex from "../components/lecture/steps/Stepper";

const config = lectures.centralbank.steps;
const nextStep = lectures.centralbank.nextStep;
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
    // case 4:
    //   return <StepComponent text={config[5].text} config={config[5]} />;
    // case 5:
    //   return <Playground />;
    default:
      return "Unknown step";
  }
}
export const steps = [
  "Introduction",
  "Daylight Overdrafts",
  "Fed Funds Market",
  "Funding a Mortgage",
  "The Clearing House",
  // "Playground",
];

export default function Clearinghouse() {
  return (
    <StepperIndex
      steps={steps}
      getStepContent={getStepContent}
      nextStep={nextStep}
    />
  );
}
