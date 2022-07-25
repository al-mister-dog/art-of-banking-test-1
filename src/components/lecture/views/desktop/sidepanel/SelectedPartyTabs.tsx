import Operations from "./Accordions";
import Balances from "./Balances";

import { Tabs, Tab, Box } from "@mui/material";

import { useState } from "react";
import Records from "./Records";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ overflowX: "hidden" }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const PlayerTabs: React.FunctionComponent<{ config: any; selected: any }> = ({
  config,
  selected,
}) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          centered
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab sx={{fontSize: "1rem", padding: 1, margin: "0px"}} label="Operations" {...a11yProps(0)} />
          <Tab sx={{fontSize: "1rem", padding: 1, margin: "0px"}} label="Balance Sheets" {...a11yProps(1)} />
          <Tab sx={{fontSize: "1rem", padding: 1, margin: "0px"}} label="Records" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <Operations config={config} selected={selected} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Balances selected={selected} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Records selected={selected} />
      </TabPanel>
    </>
  );
};

export default PlayerTabs;
