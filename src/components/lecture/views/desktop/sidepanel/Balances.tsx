import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { Account } from "../../../../../features/lectures/program/types";
import { deCamelize } from "../../../helpers/parsers";

const columnsAssets: GridColDef[] = [
  {
    field: "id",
    headerName: "Account",
    width: 100,
    valueGetter: (params: GridValueGetterParams) =>
      `${deCamelize(params.row.id)}`,
  },
  {
    field: "type",
    headerName: "Type",
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      `${deCamelize(params.row.type)}`,
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 100,
    valueGetter: (params: GridValueGetterParams) => `$${params.row.amount}`,
  },
];

const columnsLiabilities: GridColDef[] = [
  {
    field: "id",
    headerName: "Account",
    width: 100,
    valueGetter: (params: GridValueGetterParams) =>
      `${deCamelize(params.row.id)}`,
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
  function assetsArray() {
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

    return newAssetsArray;
  }

  function liabilitiesArray() {
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

    return newLiabilitiesArray;
  }
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
              <DataGrid
                rows={assetsArray()}
                columns={columnsAssets}
                hideFooter
              />
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
                rows={liabilitiesArray()}
                columns={columnsAssets}
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
