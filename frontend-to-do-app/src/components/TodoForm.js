import { useState, useEffect } from "react";
import AddTaskIcon from "@mui/icons-material/AddTask";
import CancelIcon from "@mui/icons-material/Cancel";

import {
  Box,
  Button,
  ButtonGroup,
  Container,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { generateField } from "../utils/generateField";

export const TodoForm = ({
  onAddTask,
  onUpdateTask,
  onCancelEdit,
  selectedTask,
}) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    isCompleted: false,
  });

  const reset = () => {
    setTask({
      title: "",
      description: "",
      isCompleted: false,
    });
  };

  const onCancel = () => {
    onCancelEdit();
    reset();
  };

  useEffect(() => {
    if (selectedTask) {
      setTask(selectedTask);
    }
  }, [selectedTask]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title || !task.description) {
      return;
    }

    if (selectedTask) {
      onUpdateTask(selectedTask.id, task);
      onCancel();
    } else {
      onAddTask(task);
    }

    reset();
  };

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{ backgroundColor: "#fff" }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h3" fontFamily="GalaxyFontB">
            {selectedTask ? "Update ToDo" : "Create ToDo"}
          </Typography>
          {generateField(
            "title",
            "Title",
            task.title,
            "text",
            null,
            null,
            handleChange
          )}
          {generateField(
            "description",
            "Description",
            task.description,
            "text",
            null,
            true,
            handleChange
          )}
          {generateField(
            "isCompleted",
            "Completed",
            null,
            "checkbox",
            task.isCompleted,
            null,
            handleChange
          )}

          <ButtonGroup
            size="medium"
            variant="contained"
            aria-label="text button group"
          >
            <Button type="submit" color="success" startIcon={<AddTaskIcon />}>
              {selectedTask ? (
                <span className="normal">"Update Task"</span>
              ) : (
                <span className="normal">"Add Task"</span>
              )}
            </Button>
            {selectedTask && (
              <Button
                type="button"
                onClick={onCancel}
                color="error"
                endIcon={<CancelIcon />}
              >
                <span className="normal">"Cancel"</span>
              </Button>
            )}
          </ButtonGroup>
          <br />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default TodoForm;
