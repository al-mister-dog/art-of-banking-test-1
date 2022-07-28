import { useState, useEffect } from "react";

import Box from "@mui/material/Box"
import Introduction from "../../shared_ui/text/Introduction";

const Intro = ({text}: {text: any}) => {
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 700;
  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);
  if (width > breakpoint) {
    return (
      <Box sx={{paddingLeft: "75px", paddingRight: "75px", marginTop: "50px"}}>
      <Introduction texts={text}/>
      </Box>
      
    )
  }
  return (
    <>
    <Introduction texts={text}/>
    </>
    
  )
}

export default Intro