import { useAppDispatch } from "../../../app/hooks";
import { toggleTextExpanded } from "../../../features/ui/uiSlice";
import * as React from "react";
import { useState } from "react";
import StepperDeskTop from "./StepperDesktop";
import StepperMobile from "./StepperMobile";

const StepperIndex: React.FunctionComponent<{
  getStepContent: (step: number) => JSX.Element | "Unknown step";
  steps: string[];
  nextStep?: string;
}> = ({ getStepContent, steps, nextStep }) => {
  const dispatch = useAppDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  function scrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    dispatch(toggleTextExpanded({ textExpanded: false }));
  }

  function handleSetActiveStep(step: number) {
    setActiveStep(step);
    scrollToTop();
  }
  function handleSetActiveStepBack() {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    scrollToTop();
  }
  function handleSetCompleted(v?: any) {
    setCompleted(v);
  }
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    scrollToTop();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    scrollToTop();
  };

  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 900;

  React.useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);
  if (width > breakpoint) {
    return (
      <StepperDeskTop
        steps={steps}
        activeStep={activeStep}
        completed={completed}
        getStepContent={getStepContent}
        handleSetActiveStep={handleSetActiveStep}
        handleSetActiveStepBack={handleSetActiveStepBack}
        handleSetCompleted={handleSetCompleted}
        nextStep={nextStep}
      />
    );
  }
  return (
    <StepperMobile
      steps={steps}
      activeStep={activeStep}
      getStepContent={getStepContent}
      handleSetActiveStep={handleSetActiveStep}
      handleNext={handleNext}
      handleBack={handleBack}
      nextStep={nextStep}
    />
  );
};

export default StepperIndex