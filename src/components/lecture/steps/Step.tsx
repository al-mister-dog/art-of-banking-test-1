import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  selectParties,
  setupModule,
} from "../../../features/lectures/lecturesSlice";
import { resetTotalCreditData } from "../../../features/auxilliary/auxilliarySlice";
import { useState, useEffect } from "react";
import IndexMobile from "../views/mobile/Index";
import IndexDesktop from "../views/desktop/Index";
import usePartiesArray from "../helpers/useParties";


const Step: React.FunctionComponent<{ text: any; config: any }> = ({
  text,
  config,
}) => {
  const dispatch = useAppDispatch();
  const parties = useAppSelector(selectParties);
  const [selected, setSelected] = useState<string>(
    config.state.system === "centralbank" ? "bank1" : "customer1"
  );

  const configPartiesOne = config.parties.filter(
    (party: string) => party.includes("central") || party.includes("customer")
  );
  const configPartiesTwo = config.parties.filter(
    (party: string) =>
      (party.includes("bank") || party.includes("clearinghouse")) &&
      !party.includes("central")
  );

  const [partiesArray] = usePartiesArray(parties);

  const partiesRowOne = partiesArray.filter((party) =>
    configPartiesOne.includes(party.id)
  );

  const partiesRowTwo = partiesArray.filter((party) =>
    configPartiesTwo.includes(party.id)
  );

  function selectParty(player: any) {
    setSelected(player.id);
  }

  //HANDLE BREAKPOINTS
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
    dispatch(setupModule({ setup: config.state }));
    dispatch(resetTotalCreditData());
  }, [config]);

  if (width > breakpoint) {
    return (
      <IndexDesktop
        config={config}
        texts={text}
        partiesRowOne={partiesRowOne}
        partiesRowTwo={partiesRowTwo}
        selected={selected}
        selectParty={selectParty}
      />
    );
  }
  return (
    <IndexMobile
      config={config}
      texts={text}
      partiesRowOne={partiesRowOne}
      partiesRowTwo={partiesRowTwo}
      selected={selected}
      selectParty={selectParty}
    />
  );
};

export default Step;
