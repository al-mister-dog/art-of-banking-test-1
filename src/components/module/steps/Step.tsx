import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {defaultSetup, creditSetup} from "../../../features/moduleState/setupConfig"
import {
  selectParties,
  setupModule,
  reset,
} from "../../../features/moduleState/fundamentalsSlice";
import { resetTotalCreditData } from "../../../features/auxilliary/auxilliarySlice";
import { useState, useEffect } from "react";
import IndexMobile from "../mobile/Index";
import IndexDesktop from "../desktop/Index";
import { IBank } from "../../../features/moduleState/program/types";

const Step: React.FunctionComponent<{ text: any; config: any }> = ({
  text,
  config,
}) => {
  const dispatch = useAppDispatch();

  const parties = useAppSelector(selectParties);

  const configCustomers = config.parties.filter((party: string) =>
    party.includes("customer")
  );
  const configBanks = config.parties.filter((party: string) =>
    party.includes("bank")
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
  const breakpoint = 700;

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
    <></>
    // <IndexMobile
    //   texts={texts1}
    //   customerParties={customerParties}
    //   bankParties={bankParties}
    //   selected={selected}
    //   selectPlayer={selectPlayer}
    // />
  );
};

export default Step;
