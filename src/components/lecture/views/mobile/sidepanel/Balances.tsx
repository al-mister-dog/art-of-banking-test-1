import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { Account } from "../../../../../features/lectures/program/types";
import { deCamelize } from "../../../helpers/parsers";
import { useEffect, useState } from "react";
import { AccountMethods } from "../../../../../features/lectures/program/methods";

interface NewAccount {
  id: string;
  party: string | undefined;
  type: string | undefined;
  amount: number | undefined;
}
const columnsAssets: GridColDef[] = [
  {
    field: "party",
    headerName: "Party",
    width: 100,
    valueGetter: (params: GridValueGetterParams) =>
      `${deCamelize(params.row.party)}`,
  },
  {
    field: "type",
    headerName: "Type",
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      console.log(params.row.type);
      return `${deCamelize(params.row.type)}`;
    },
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 130,
    valueGetter: (params: GridValueGetterParams) => `$${params.row.amount}`,
  },
];

const columnsLiabilities: GridColDef[] = [
  {
    field: "party",
    headerName: "Party",
    width: 100,
    valueGetter: (params: GridValueGetterParams) =>
      `${deCamelize(params.row.party)}`,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
    valueGetter: (params: GridValueGetterParams) =>
      `${deCamelize(params.row.type)}`,
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 130,
    valueGetter: (params: GridValueGetterParams) => `$${params.row.amount}`,
  },
];

const Balances = ({ selected }: { selected: any }) => {
  let newAssetsArray: Account[] = [];
  for (const asset in selected.assets) {
    if (asset.length > 0) {
      newAssetsArray = [
        ...newAssetsArray,
        ...selected.assets[asset].filter(
          (account: { amount: number }) => account.amount > 0
        ),
      ];
    }
  }
  let assetsArray: NewAccount[] = [];
  newAssetsArray.forEach((account: Partial<NewAccount>) => {
    assetsArray.push({
      id: `${Math.random()}`,
      party: account.id,
      type: account.type,
      amount: account.amount,
    });
    console.log(assetsArray)
  });

  let newLiabilitiesArray: Account[] = [];

  for (const liability in selected.liabilities) {
    if (liability.length > 0) {
      newLiabilitiesArray = [
        ...newLiabilitiesArray,
        ...selected.liabilities[liability].filter(
          (account: { amount: number }) => account.amount > 0
        ),
      ];
    }
  }
  //work around Object.preventExtensions()
  let liabilitiesArray: NewAccount[] = [];
  newLiabilitiesArray.forEach((account: Partial<NewAccount>) => {
    liabilitiesArray.push({
      id: `${Math.random()}`,
      party: account.id,
      type: account.type,
      amount: account.amount,
    });
  });

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ marginBottom: 5 }}>
        <Typography align="left">Assets</Typography>
        <Box sx={{ height: 200, width: "100%" }}>
          <Box sx={{ display: "flex", height: "100%" }}>
            <Box sx={{ flexGrow: 1 }}>
              <DataGrid rows={assetsArray} columns={columnsAssets} hideFooter />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography align="left">Liabilities</Typography>
        <Box sx={{ height: 200, width: "100%" }}>
          <Box sx={{ display: "flex", height: "100%" }}>
            <Box sx={{ flexGrow: 1 }}>
              <DataGrid
                rows={liabilitiesArray}
                columns={columnsLiabilities}
                hideFooter
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Balances;
