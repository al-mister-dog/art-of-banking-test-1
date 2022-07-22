import { useAppDispatch } from "../../../app/hooks";
import { reset } from "../../../features/lectures/lecturesSlice";
import * as React from "react";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Stepper,
  Step,
  StepButton,
  Button,
  Typography,
} from "@mui/material";
import MobileStepper from "@mui/material/MobileStepper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { colors } from "../../../config/colorPalette";


const StepperIndex: React.FunctionComponent<{
  getStepContent: (step: number) => JSX.Element | "Unknown step";
  steps: string[];
}> = ({ getStepContent, steps }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});
  function handleSetActiveStep(step: number) {
    setActiveStep(step);
  }
  function handleSetActiveStepBack() {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }
  function handleSetCompleted(v?: any) {
    setCompleted(v);
  }
  const handleNext = () => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    setActiveStep((prevActiveStep) => prevActiveStep + 1);    
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
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
    />
  );
};

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
}> = ({
  steps,
  activeStep,
  completed,
  getStepContent,
  handleSetActiveStep,
  handleSetActiveStepBack,
  handleSetCompleted,
}) => {
  const dispatch = useAppDispatch();
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
    dispatch(reset());
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    handleSetActiveStep(newActiveStep);
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  };

  const handleBack = () => {
    dispatch(reset());
    handleSetActiveStepBack();
  };

  const handleStep = (step: number) => () => {
    dispatch(reset());

    handleSetActiveStep(step);
  };

  const handleComplete = () => {
    dispatch(reset());
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    handleSetCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    dispatch(reset());
    handleSetActiveStep(0);
    handleSetCompleted({});
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  };

  return (
    <Box
      sx={{
        width: "90%",
        margin: "auto",
        borderRadius: "15px",
        background: colors.paper,
        marginTop: "150px",
        paddingTop: "20px",
      }}
    >
      <Stepper
        alternativeLabel
        nonLinear
        activeStep={activeStep}
        sx={{ width: "90%", margin: "auto", marginTop: "25px", marginBottom: "75px" }}
      >
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]} >
            <StepButton color="inherit" onClick={handleStep(index)}>
              <Typography sx={{fontFamily: "Roboto", fontWeight: "bold", }}>{label}</Typography>
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </>
        ) : (
          <>
            <>{getStepContent(activeStep)}</>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                pt: 2,
                width: "90%",
                margin: "auto",
                paddingBottom: "10px",
              }}
            >
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
            </Box>
          </>
        )}
      </div>
    </Box>
  );
};

const StepperMobile: React.FunctionComponent<{
  steps: string[];
  activeStep: number;
  getStepContent: (step: number) => JSX.Element | "Unknown step";
  handleSetActiveStep: (step: number) => void;
  handleNext: () => void;
  handleBack: () => void;
}> = ({
  steps,
  activeStep,
  getStepContent,
  handleSetActiveStep,
  handleNext,
  handleBack,
}) => {
  const theme = useTheme();

  const maxSteps = steps.length;

  return (
    <Box
      sx={{
        margin: "auto",
        borderRadius: "15px",
        background: colors.paper,
        marginTop: "120px",
        padding: "20px 5px",
      }}
    >
      <MobileStepper
        sx={{ background: colors.paper, marginBottom: "30px" }}
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
      <Box>{getStepContent(activeStep)}</Box>
      <MobileStepper
        sx={{ background: colors.paper }}
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
};

export default StepperIndex;
