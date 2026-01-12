import { Provider } from "react-redux";
import store from "./store/store";
import { Container, Typography } from "@mui/material";
import AddHabitForm from "./components/AddHabitForm";
import HabitList from "./components/HabitList";
import HabitStats from "./components/HabitStats";
import DebugState from "./components/DebugState";

function App() {
  return (
    <Provider store={store}>
      <Container maxWidth="md">
        <Typography component={"h1"} variant="h2" align="center">
          Habit Tracker
        </Typography>
        <AddHabitForm />
        <HabitList />
        <HabitStats />
        {window.location.hostname === "localhost" && <DebugState />}
      </Container>
    </Provider>
  );
}

export default App;
