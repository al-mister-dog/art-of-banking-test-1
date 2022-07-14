import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Home from "./pages/home/Home"
import Nav from "./components/Nav"
import Fundamentals from "./pages/Fundamentals";
import Clearinghouse from "./pages/Clearinghouse";
import Medici from "./components/medici/steps/Stepper";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/fundamentals" element={<Fundamentals />}/>
          <Route path="/clearinghouse" element={<Clearinghouse/>}/>
          <Route path="/medici" element={<Medici/>}/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
