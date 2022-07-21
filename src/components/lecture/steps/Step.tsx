import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { lecture1StateConfig } from "../../../config/initialStateConfig";
import {
  selectParties,
  setupModule,
  reset,
} from "../../../features/lectures/lecturesSlice";
import { resetTotalCreditData } from "../../../features/auxilliary/auxilliarySlice";
import { useState, useEffect } from "react";
import IndexMobile from "../views/mobile/Index";
import IndexDesktop from "../views/desktop/Index";
import { IBank } from "../../../features/lectures/program/types";

const { defaultSetup, creditSetup } = lecture1StateConfig;

const Step: React.FunctionComponent<{ text: any; config: any }> = ({
  text,
  config,
}) => {
  const dispatch = useAppDispatch();

  const parties = useAppSelector(selectParties);

  const configPartiesOne = config.parties.filter(
    (party: string) => party.includes("central") || party.includes("customer")
  );
  const configPartiesTwo = config.parties.filter(
    (party: string) => party.includes("bank") && !party.includes("central")
  );

  const [selected, setSelected] = useState<string>(
    config.state.system === "centralbank" ? "bank1" : "customer1"
  );

  let partiesArray: IBank[] = [];

  for (const key in parties) {
    partiesArray = [...partiesArray, parties[key]];
  }

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
    if (config.state) {
      dispatch(reset());
      dispatch(setupModule({ setup: config.state }));
      dispatch(resetTotalCreditData());
      return;
    } else if (config.credit) {
      dispatch(reset());
      dispatch(setupModule({ setup: creditSetup }));
      dispatch(resetTotalCreditData());
    } else {
      dispatch(reset());
      dispatch(setupModule({ setup: defaultSetup }));
      dispatch(resetTotalCreditData());
    }
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
