import { createTheme } from "@mui/material/styles";

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    smallTablet: true;
    tablet: true;
    laptop: true;
    desktop: true;
  }
}


const theme = createTheme({
  palette: {
    primary: {
      // main: "#607D8B"
      main: "#0e5e62",
    },
    action: {
      disabledBackground: "#6E3C2B",
      disabled: "#f2eecb",
    },
  },
  typography: {
    fontFamily: `"EB Garamond", "Roboto", "Helvetica", "Arial", sans-serif`,
    // "fontSize": 14,
    // "fontWeightLight": 300,
    // "fontWeightRegular": 400,
    fontWeightBold: 700,
  },
  breakpoints: {
    values: {
      mobile: 0,
      smallTablet: 500,
      tablet: 640,
      laptop: 1024,
      desktop: 1160,
    },
  },
});

export default theme;
