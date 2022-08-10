import * as React from "react";
import { UserProvider } from "./context/user-context";
import UserDisplay from "./components/UserDisplay";
import UserSettings from "./components/UserSettings";
import { useAuth } from "./context/auth-context";

function App() {
  const { user } = useAuth();
  const [formState, setFormState] = React.useState(user);
  return (
    <div
      style={{
        minHeight: 350,
        width: 300,
        backgroundColor: "#ddd",
        borderRadius: 4,
        padding: 10,
      }}
    >
      <UserProvider formState={formState}>
        <UserSettings formState={formState} setFormState={setFormState} />
        <UserDisplay />
      </UserProvider>
    </div>
  );
}

export default App;
