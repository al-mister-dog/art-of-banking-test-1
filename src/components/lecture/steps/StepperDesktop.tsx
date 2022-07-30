import { Box, Step, StepButton, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { colors } from "../../../config/colorPalette";
import StepperFooter from "../../ui/stepper/StepperFooter";
import StepperHeader from "../../ui/stepper/StepperHeader";

const StepperDeskTop: React.FunctionComponent<{
  steps: string[];
  activeStep: number;
  completed: {
    [k: number]: boolean;
  };
  getStepContent: (step: number) => JSX.Element | "Unknown step";
  handleSetActiveStep: (step: number) => void;
  handleSetActiveStepBack: () => void;
  handleSetCompleted: (v?: any) => void;
  nextStep?: string;
}> = ({
  steps,
  activeStep,
  completed,
  getStepContent,
  handleSetActiveStep,
  handleSetActiveStepBack,
  handleSetCompleted,
  nextStep,
}) => {
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    handleSetActiveStep(newActiveStep);
  };

  const handleBack = () => {
    handleSetActiveStepBack();
  };

  const handleStep = (step: number) => () => {
    handleSetActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    handleSetCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    handleSetActiveStep(0);
    handleSetCompleted({});
  };

  let navigate = useNavigate()
  return (
    <Box
      sx={{
        width: "90%",
        margin: "auto",
        borderRadius: "5px",
        background: colors.paper,
        marginTop: "150px",
        paddingTop: "20px",
      }}
    >
      <StepperHeader activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              <Typography sx={{ fontFamily: "Roboto", fontWeight: "bold" }}>
                {label}
              </Typography>
            </StepButton>
          </Step>
        ))}
      </StepperHeader>
      <div>
        {allStepsCompleted() ? (
          <>
            
            
              <Typography sx={{ margin: "auto" }} onClick={() => navigate(`/${nextStep}`)}>
                Click here to go to the next lecture!
              </Typography>
            

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </>
        ) : (
          <>
            <>{getStepContent(activeStep)}</>
            <StepperFooter>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{ display: "inline-block" }}
                  >
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Step"}
                  </Button>
                ))}
            </StepperFooter>
          </>
        )}
      </div>
    </Box>
  );
};

export default StepperDeskTop