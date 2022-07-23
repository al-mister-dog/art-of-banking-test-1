import Box from "@mui/material/Box";
import React from "react";

const StepperFooter = ({ children }: { children: React.ReactNode }) => {
  return (
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
      {children}
    </Box>
  );
};

export default StepperFooter