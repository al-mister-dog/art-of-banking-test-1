import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";

import { Account } from "../../../domain/types";
import { deCamelize } from "../../lecture/helpers/parsers";
import { colors } from "../../../config/colorPalette";

const gridStyles = {
  fontFamily: "Roboto",
  fontWeight: "bold",
  "& .MuiDataGrid-columnHeader": {
    backgroundColor: colors.main,
    color: colors.accordionTextColor,
    fontFamily: "Garamond",
    fontSize: 20,
    fontWeight: "bold",
  },
};

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
    field: "amount",
    headerName: "Amount",
    width: 130,
    valueGetter: (params: GridValueGetterParams) => `$${params.row.amount}`,
  },
  {
    field: "type",
    headerName: "Type",
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      return `${deCamelize(params.row.type)}`;
    },
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
    field: "amount",
    headerName: "Amount",
    width: 130,
    valueGetter: (params: GridValueGetterParams) => `$${params.row.amount}`,
  },
  {
    field: "type",
    headerName: "Type",
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      `${deCamelize(params.row.type)}`,
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
        <Typography
          align="left"
          variant="h6"
          sx={{
            fontFamily: "Roboto",
            fontWeight: "bold",
            color: colors.darkMain,
          }}
        >
          Assets
        </Typography>
        <Box sx={{ height: 200, width: "100%" }}>
          <Box sx={{ display: "flex", height: "100%" }}>
            <Box sx={{ flexGrow: 1 }}>
              <DataGrid
                sx={gridStyles}
                rows={assetsArray}
                columns={columnsAssets}
                hideFooter
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography
          align="left"
          variant="h6"
          sx={{
            fontFamily: "Roboto",
            fontWeight: "bold",
            color: colors.darkMain,
          }}
        >
          Liabilities
        </Typography>
        <Box sx={{ height: 200, width: "100%" }}>
          <Box sx={{ display: "flex", height: "100%" }}>
            <Box sx={{ flexGrow: 1 }}>
              <DataGrid
                sx={gridStyles}
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
