import { DataGrid } from "@mui/x-data-grid";

export const DataTable = ({ columns, rows }) => {

  return (
    <div style={{ height: 350, width: "100%", background: "#f4f4f4" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{fontFamily: "GalaxyFont, sans-serif !important"}}
        getRowClassName={(params)=>{
          return params.row.id % 2 === 0 ? 'even-row' : 'odd-row'
        }}
        
      />
    </div>
  );
};
