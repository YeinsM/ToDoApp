import { DataGrid } from "@mui/x-data-grid";

export const DataTable = ({ columns, rows }) => {
  return (
    <div style={{ height: 350, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowsPerPageOptions
        
      />
    </div>
  );
};
