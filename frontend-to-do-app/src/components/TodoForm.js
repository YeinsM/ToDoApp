import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";

import AddTaskIcon from "@mui/icons-material/AddTask";
import CancelIcon from "@mui/icons-material/Cancel";

import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Container,
  createTheme,
  FormControlLabel,
  ThemeProvider,
  Typography,
} from "@mui/material";

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
      reset();
    } else {
      onAddTask(task);
      reset();
    }
  };

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h3">
            ToDo App
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            id="title"
            label="Title"
            name="title"
            value={task.title}
            onChange={handleChange}
            placeholder="Title"
          />

          <TextField
            margin="normal"
            fullWidth
            id="description"
            label="Description"
            name="description"
            multiline
            value={task.description}
            onChange={handleChange}
            placeholder="Write some description"
          />
          <FormControlLabel
            name="isCompleted"
            control={
              <Checkbox
                onChange={handleChange}
                color="secondary"
                checked={task.isCompleted}
              />
            }
            label="Completed"
            labelPlacement="start"
          />
          <ButtonGroup
            size="medium"
            variant="outlined"
            aria-label="text button group"
          >
            <Button type="submit" color="success" startIcon={<AddTaskIcon />}>
              {selectedTask ? "Update Task" : "Add Task"}
            </Button>
            {selectedTask && (
              <Button
                type="button"
                onClick={onCancel}
                color="error"
                endIcon={<CancelIcon />}
              >
                Cancel
              </Button>
            )}
          </ButtonGroup>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default TodoForm;
