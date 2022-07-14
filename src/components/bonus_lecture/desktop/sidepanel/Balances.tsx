import { DataGrid, GridColDef, GridCellParams } from "@mui/x-data-grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import { Box, Typography } from "@mui/material";

const columnsAssets: GridColDef[] = [
  { field: "dueFrom", headerName: "Due From", width: 100 },
  { field: "city", headerName: "City", width: 100 },
  {
    field: "amount",
    headerName: "Amount: Marcs",
    width: 130,
  },
  {
    field: "paid",
    headerName: "Paid",
    width: 100,
    renderCell: (params: GridCellParams<boolean>) =>
      params.value ? <CheckCircleIcon /> : <PendingIcon />,
  },
];

const columnsLiabilities: GridColDef[] = [
  { field: "dueTo", headerName: "Due To", width: 100 },
  { field: "city", headerName: "City", width: 100 },
  {
    field: "amount",
    headerName: "Amount: Marcs",
    width: 130,
  },
  {
    field: "paid",
    headerName: "Paid",
    width: 100,
    renderCell: (params: GridCellParams<boolean>) =>
      params.value ? <CheckCircleIcon /> : <PendingIcon />,
  },
];

const Balances = ({ selected }: { selected: any }) => {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ marginBottom: 5 }}>
        <Typography align="left">
          Assets
        </Typography>
        <Box sx={{ height: 200, width: "100%" }}>
          <Box sx={{ display: "flex", height: "100%" }}>
            <Box sx={{ flexGrow: 1 }}>
              <DataGrid
                rows={selected.assets}
                columns={columnsAssets}
                hideFooter
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography align="left" >
          Liabilities
        </Typography>
        <Box sx={{ height: 200, width: "100%" }}>
          <Box sx={{ display: "flex", height: "100%" }}>
            <Box sx={{ flexGrow: 1 }}>
              <DataGrid
                rows={selected.liabilities}
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
