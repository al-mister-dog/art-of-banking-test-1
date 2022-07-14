import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridCellParams,
} from "@mui/x-data-grid";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
const rows: GridRowsProp = [
  {
    id: 1,
    dueTo: "Me",
    dueFrom: "Salviati",
    city: "Florence",
    amount: 1,
    status: true,
  },
  {
    id: 2,
    dueTo: "Me",
    dueFrom: "Piero",
    city: "Florence",
    amount: 1,
    status: true,
  },
  {
    id: 3,
    dueTo: "Me",
    dueFrom: "Federigo",
    city: "Florence",
    amount: 1,
    status: false,
  },
];

const columns: GridColDef[] = [
  { field: "dueTo", headerName: "Due To", width: 100 },
  { field: "dueFrom", headerName: "Due From", width: 100 },
  { field: "city", headerName: "City", width: 100 },
  {
    field: "amount",
    headerName: "Amount: Marcs",
    width: 130,
  },
  {
    field: "status",
    headerName: "Paid",
    width: 100,
    renderCell: (params: GridCellParams<boolean>) => params.value ? <CheckCircleIcon/> : <PendingIcon/>,
  },
];

export default function App({bills}: {bills: GridRowsProp}) {
  return (
    <div style={{ height: 250, width: "100%" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid rows={bills} columns={columns} />
        </div>
      </div>
    </div>
  );
}
