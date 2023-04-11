import {
  Container,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { DataTable } from "./DataTable";
import { getTodoRows, todoColumns } from "../utils/tableHelper";

const theme = createTheme();

export const TodoList = ({ tasks, onEdit, onDelete }) => {

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h3"
            fontFamily="GalaxyFontB"
            sx={{ textAlign: "center" }}
          >
            ToDo List
          </Typography>
          {tasks.length > 0 ? (
            <DataTable
              columns={todoColumns(onEdit, onDelete)}
              rows={getTodoRows(tasks)}
            />
          ) : (
            <p>No tasks</p>
          )}
        </Container>
      </ThemeProvider>
    </>
  );
};

export default TodoList;
