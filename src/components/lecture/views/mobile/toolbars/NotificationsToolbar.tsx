import { Box } from "@mui/material";

import ReserveRequirementSlider from "../../../../ui/charts/ReserveRequirementSlider";
import TotalCreditChart from "../../../../ui/charts/TotalCredit";
import CentralBankCredit from "../../../../ui/charts/CentralBankCredit";
import FedFundsRateSlider from "../../../../ui/charts/FedFundsRateSlider";

const NotificationsToolbar: React.FunctionComponent<{ config?: any }> = ({
  config,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {config.constraint && <ReserveRequirementSlider />}
      {config.parties.includes("centralbank") && (
        <>
          <CentralBankCredit />
          <FedFundsRateSlider />
        </>
      )}
      {config.credit && !config.parties.includes("centralbank") && (
        <TotalCreditChart />
      )}
    </Box>
  );
};

export default NotificationsToolbar;
