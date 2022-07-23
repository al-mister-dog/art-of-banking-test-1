import React from "react";
import { Box, Stepper } from "@mui/material";
import { colors } from "../../config/colorPalette";

const StepperHeader = ({
  children,
  activeStep,
}: {
  children: React.ReactNode;
  activeStep: number;
}) => {
  return (
    <Stepper
      alternativeLabel
      nonLinear
      activeStep={activeStep}
      sx={{
        width: "90%",
        margin: "auto",
        marginTop: "25px",
        marginBottom: "75px",
      }}
    >
      {children}
    </Stepper>
  );
};

export default StepperHeader;
