import { DataGrid, GridColDef, GridCellParams } from "@mui/x-data-grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import { Box, Typography } from "@mui/material";

const columnsAssets: GridColDef[] = [
  {
    field: "dueFrom",
    headerName: "Due From",
    width: 100,
    headerClassName: "poo",
  },
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
    <Box>
      <Box>
        <Typography align="left" sx={{ fontWeight: "bold" }}>
          Assets
        </Typography>
        
          <Box sx={{ display: "flex", height: "100%", marginBottom: 2 }}>
            <Box
              sx={{
                flexGrow: 1,
                // "& .poo": {
                //   height: "250px"
                // },
              }}
            >
              <DataGrid
                autoHeight
                headerHeight={30}
                rows={selected.assets}
                columns={columnsAssets}
                hideFooter
              />
            </Box>
          </Box>
        
      </Box>
      <Box>
        <Typography align="left" sx={{ fontWeight: "bold" }}>
          Liabilities
        </Typography>
        
          <Box sx={{ display: "flex", height: "100%" }}>
            <Box sx={{ flexGrow: 1 }}>
              <DataGrid
                autoHeight
                headerHeight={30}
                rows={selected.liabilities}
                columns={columnsLiabilities}
                hideFooter
              />
            </Box>
          </Box>
        
      </Box>
    </Box>
  );
};

export default Balances;
