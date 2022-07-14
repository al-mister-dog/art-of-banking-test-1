import { createTheme } from "@mui/material/styles";
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
  
});

export default theme;
