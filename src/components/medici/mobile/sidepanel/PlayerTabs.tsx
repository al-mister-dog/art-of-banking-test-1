import Operations from "./Operations";
import Balances from "./Balances";

import { Tabs, Tab, Box, Typography } from "@mui/material";

import { useState } from "react";

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

const PlayerTabs = ({ selected }: { selected: any }) => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box>
        <Tabs
          centered
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab sx={{ fontSize: 10 }} label="Operations" {...a11yProps(0)} />
          <Tab sx={{ fontSize: 10 }} label="Bills" {...a11yProps(1)} />
          <Tab sx={{ fontSize: 10 }} label="Records" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <Operations selected={selected} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Balances selected={selected} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        {selected.records.map((record: string, i: number) => (
          <Typography key={i} sx={{fontSize: 12}}>{i + 1}: {record}</Typography>
        ))}
      </TabPanel>
    </>
  );
};

export default PlayerTabs;
