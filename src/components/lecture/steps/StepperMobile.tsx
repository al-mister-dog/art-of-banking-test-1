import { useTheme } from "@mui/material/styles";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Box, MobileStepper, Button } from "@mui/material";
import { colors } from "../../../config/colorPalette";


const StepperMobile: React.FunctionComponent<{
  steps: string[];
  activeStep: number;
  getStepContent: (step: number) => JSX.Element | "Unknown step";
  handleSetActiveStep: (step: number) => void;
  handleNext: () => void;
  handleBack: () => void;
  nextStep?: string;
}> = ({
  steps,
  activeStep,
  getStepContent,
  handleSetActiveStep,
  handleNext,
  handleBack,
  nextStep,
}) => {
  const theme = useTheme();

  const maxSteps = steps.length;

  return (
    <Box
      sx={{
        margin: "auto",
        borderRadius: "5px",
        background: colors.paper,
        marginTop: "170px",
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

export default StepperMobile