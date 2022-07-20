import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {lecture1StateConfig} from "../../../config/initialStateConfig"
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

const {defaultSetup, creditSetup} = lecture1StateConfig

const Step: React.FunctionComponent<{ text: any; config: any }> = ({
  text,
  config,
}) => {
  const dispatch = useAppDispatch();

  const parties = useAppSelector(selectParties);
  const configCustomers = config.parties.filter((party: string) =>
    party.includes("central")
  );
  const configBanks = config.parties.filter((party: string) =>
    (party.includes("bank") && !party.includes("central"))
  );

  const [selected, setSelected] = useState<string>("customer1");

  let partiesArray: IBank[] = [];

  for (const key in parties) {
    partiesArray = [...partiesArray, parties[key]];
  }

  const customerParties = partiesArray.filter((party) =>
    configCustomers.includes(party.id)
  );

  const bankParties = partiesArray.filter((party) =>
    configBanks.includes(party.id)
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
      dispatch(setupModule({setup: config.state}));
      dispatch(resetTotalCreditData());
      return
    }
    else if (config.credit) {
      dispatch(reset());
      dispatch(setupModule({setup: creditSetup}));
      dispatch(resetTotalCreditData());
    } else {
      dispatch(reset());
      dispatch(setupModule({setup: defaultSetup}));
      dispatch(resetTotalCreditData());
    }
  }, [config]);

  if (width > breakpoint) {
    return (
      <IndexDesktop
        config={config}
        texts={text}
        customerParties={customerParties}
        bankParties={bankParties}
        selected={selected}
        selectParty={selectParty}
      />
    );
  }
  return (
    <IndexMobile
    config={config}
    texts={text}
    customerParties={customerParties}
    bankParties={bankParties}
    selected={selected}
    selectParty={selectParty}
    />
  );
};

export default Step;