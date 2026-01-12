import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { clearActions } from "../store/debugSlice";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useState, type SetStateAction } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const DebugState = () => {
  const dispatch = useDispatch();
  const actions = useSelector((state: RootState) => state.debug.actions);
  const fullState = useSelector((state: RootState) => state.habits);

  const [filter, setFilter] = useState("");

  const filteredActions = actions.filter((a) =>
    a.type.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Paper
      elevation={6}
      sx={{ p: 2, mt: 4, background: "white", overflowX: "auto" }}
    >
      <Typography variant="h6" color="primary" gutterBottom>
        Redux State Debugger
      </Typography>
      <TextField
        size="small"
        fullWidth
        label="Filter actions"
        value={filter}
        onChange={(e: { target: { value: SetStateAction<string> } }) =>
          setFilter(e.target.value)
        }
        sx={{ my: 1 }}
      />
      <Button
        size="small"
        color="error"
        onClick={() => dispatch(clearActions())}
      >
        Clear Actions
      </Button>

      <Divider sx={{ my: 1 }} />

      <Typography variant="subtitle2">Actions</Typography>
      <Box
        component="pre"
        sx={{
          m: 0,
          fontSize: "1rem",
          fontFamily: "Fira Mono, monospace",
          color: "black",
          background: "transparent",
        }}
      >
        {JSON.stringify(filteredActions, null, 2)}
      </Box>

      <Divider sx={{ my: 1 }} />

      <Typography variant="subtitle2">State</Typography>
      <Box
        component="pre"
        sx={{
          m: 0,
          fontSize: "1rem",
          fontFamily: "Fira Mono, monospace",
          color: "black",
          background: "transparent",
        }}
      >
        {JSON.stringify(fullState, null, 2)}
      </Box>
    </Paper>
  );
};

export default DebugState;
