import {
  Button,
  ButtonGroup,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";
import { DataTable } from "./DataTable";

const theme = createTheme();

export const TodoList = ({ tasks, onEdit, onDelete }) => {
  const todoColumns = [
    { field: "title", headerName: "Title", headerAlign: 'center', width: 150 },
    { field: "description", headerName: "Description", headerAlign: 'center', width: 430 },
    { field: "isCompleted", headerName: "Status", headerAlign: 'center', width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      headerAlign: 'center',
      width: 100,
      renderCell: (params) => (
        <>
          <ButtonGroup
            size="medium"
            variant="text"
            aria-label="text button group"
          >
            <Button color="primary" size="small" startIcon={<EditIcon/>} onClick={() => onEdit(params.row.id)} />
            <Button color="error" size="small" endIcon={<DeleteIcon/>} onClick={() => onDelete(params.row.id)} />
          </ButtonGroup>
        </>
      ),
    },
  ];

  const todoRows = tasks.map((task) => ({
    id: task.id,
    title: task.title,
    description: task.description,
    isCompleted: task.isCompleted ? "Completed" : "Pending",
  }));

  return (
    <>
      <br />
      <ThemeProvider theme={theme}>
        <Container maxWidth="md">
          {tasks.length > 0 ? (
            <DataTable columns={todoColumns} rows={todoRows} />
          ) : (
            <p>No tasks</p>
          )}
        </Container>
      </ThemeProvider>
    </>
  );
};

export default TodoList;
