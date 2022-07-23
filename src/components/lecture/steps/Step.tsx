import { useAppDispatch } from "../../../app/hooks";
import { setState } from "../../../features/lectures/lecturesSlice";
import { resetTotalCreditData } from "../../../features/auxilliary/auxilliarySlice";
import { useState, useEffect } from "react";
import IndexMobile from "../views/mobile/Index";
import IndexDesktop from "../views/desktop/Index";

const Step: React.FunctionComponent<{ text: any; config: any }> = ({
  text,
  config,
}) => {
  const dispatch = useAppDispatch();
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 950;

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  useEffect(() => {
    dispatch(setState({ setup: config.state }));
    dispatch(resetTotalCreditData());
  }, [config]);

  if (width > breakpoint) {
    return <IndexDesktop config={config} texts={text} />;
  }
  return <IndexMobile config={config} texts={text} />;
};

export default Step;
