import { useAppSelector } from "../../../app/hooks";
import { selectRecords } from "../../../features/players/playersSlice";
import { useEffect, useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepButton,
  Button,
  Typography,
} from "@mui/material";

import * as React from "react";
import { useTheme } from "@mui/material/styles";

import MobileStepper from "@mui/material/MobileStepper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import Introduction from "./1-introduction";
import BillsExchange from "./2-bills";
import RemitBills from "./3-remit";
import RechangeOne from "./4-rechange1";
import RechangeTwo from "./5-rechange2";
import Playground from "./6-playground";

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <Introduction />;
    case 1:
      return <BillsExchange />;
    case 2:
      return <RemitBills />;
    case 3:
      return <RechangeOne />;
    case 4:
      return <RechangeTwo />;
    case 5:
      return <Playground />;
    default:
      return "Unknown step";
  }
}
const steps = [
  "Introduction",
  "Bills of Exchange",
  "Remitting Bills",
  "Rechange Part 1",
  "Rechange Part 2",
  "Playground",
];

const StepperIndex: React.FunctionComponent = () => {
  const records = useAppSelector(selectRecords);
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    console.log(records);
    const record1 = "salviati imports 1 marc worth of goods from me";
    const record2 = "me draws bill on you for 1 marc";
    const record3 = "you remits bill to tomasso";
    const record4 = "tomasso draws bill on salviati for 1";
    const record5 = "federigo imports 1 marc worth of goods from piero";
    const record6 = "piero draws bill on tomasso for 1 marc";
    const record7 = "tomasso remits bill to you";
    const record8 = "you draws bill on federigo for 1";

    const step1Complete = () => {
      return records[0] === record1 && records[1] === record2;
    };
    const step2Complete = () => {
      return records[2] === record3 && records[3] === record4;
    };
    const step3Complete = () => {
      return records[4] === record5 && records[5] === record6;
    };
    const step4Complete = () => {
      return records[6] === record7 && records[7] === record8;
    };
    if (step1Complete()) {
      const newCompleted = completed;
      newCompleted[1] = true;
      handleSetCompleted(newCompleted);
    }
    if (step1Complete() && step2Complete()) {
      const newCompleted = completed;
      newCompleted[2] = true;
      handleSetCompleted(newCompleted);
    }
    if (step1Complete() && step2Complete() && step3Complete()) {
      const newCompleted = completed;
      newCompleted[3] = true;
      handleSetCompleted(newCompleted);
    }
    if (step1Complete() && step2Complete() && step3Complete() && step4Complete()) {
      const newCompleted = completed;
      newCompleted[4] = true;
      handleSetCompleted(newCompleted);
    }
  }, [records]);
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
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 700;
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
        activeStep={activeStep}
        completed={completed}
        handleSetActiveStep={handleSetActiveStep}
        handleSetActiveStepBack={handleSetActiveStepBack}
        handleSetCompleted={handleSetCompleted}
      />
    );
  }
  return (
    <StepperMobile
      activeStep={activeStep}
      handleSetActiveStep={handleSetActiveStep}
      handleNext={handleNext}
      handleBack={handleBack}
    />
  );
};

const StepperDeskTop: React.FunctionComponent<{
  activeStep: number;
  completed: {
    [k: number]: boolean;
  };
  handleSetActiveStep: (step: number) => void;
  handleSetActiveStepBack: () => void;
  handleSetCompleted: (v?: any) => void;
}> = ({
  activeStep,
  completed,
  handleSetActiveStep,
  handleSetActiveStepBack,
  handleSetCompleted,
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
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
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

  return (
    <Box
      sx={{
        width: "90%",
        margin: "auto",
        borderRadius: "15px",
        background: "#F2EECB",
        marginTop: "150px",
        paddingTop: "20px",
      }}
    >
      <Stepper
        nonLinear
        activeStep={activeStep}
        sx={{ width: "90%", margin: "auto" }}
      >
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
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
  activeStep: number;
  handleSetActiveStep: (step: number) => void;
  handleNext: () => void;
  handleBack: () => void;
}> = ({ activeStep, handleSetActiveStep, handleNext, handleBack }) => {
  const theme = useTheme();

  const maxSteps = steps.length;

  return (
    <Box
      sx={{
        margin: "auto",
        borderRadius: "15px",
        background: "#F2EECB",
        marginTop: "50px",
        padding: "20px 5px",
      }}
    >
      <MobileStepper
        sx={{ background: "#F2EECB" }}
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
        sx={{ background: "#F2EECB" }}
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
