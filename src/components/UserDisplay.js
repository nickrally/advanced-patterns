import { useUser } from "../context/user-context";

const UserDisplay = () => {
  const [state] = useUser();
  const { user } = state;
  return <pre>{JSON.stringify(user, null, 2)}</pre>;
};

export default UserDisplay;
