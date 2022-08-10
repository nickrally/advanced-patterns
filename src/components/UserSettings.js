import { dequal } from "dequal";
import * as React from "react";
import { useUser } from "../context/user-context";
import * as Client from "../client/client";

const UserSettings = ({ formState, setFormState }) => {
  const [state, dispatch, reset, update] = useUser();
  const { user, status, error } = state;
  const isPending = status === "pending";
  const isRejected = status === "rejected";

  //const [formState, setFormState] = React.useState(user);

  const isChanged = !dequal(user, formState);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //userDispatch({ type: "start update", payload: formState });
    update(dispatch);
    /* Client.updateUser(user, formState).then(
      (updatedUser) => userDispatch({ type: "finish update", updatedUser }),
      (error) => userDispatch({ type: "fail update", error })
    ); */
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block" }} htmlFor="username">
          Username
        </label>
        <input
          id="username"
          name="username"
          disabled
          readOnly
          value={formState.username}
          stype={{ width: "100%" }}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block" }} htmlFor="tagline">
          Tagline
        </label>
        <input
          id="tagline"
          name="tagline"
          value={formState.tagline}
          stype={{ width: "100%" }}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block" }} htmlFor="bio">
          Biography
        </label>
        <textarea
          id="bio"
          name="bio"
          value={formState.bio}
          style={{ width: "100%" }}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            setFormState(user);
            //userDispatch({ type: "reset" });
            reset(dispatch);
          }}
          disabled={!isChanged || isPending}
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={(!isChanged && !isRejected) || isPending}
        >
          {isPending
            ? "..."
            : isRejected
            ? "Try again"
            : isChanged
            ? "Submit"
            : "✔"}
        </button>
        {isRejected ? (
          <pre style={{ color: "red" }}>{error.message}</pre>
        ) : null}
      </div>
    </form>
  );
};

export default UserSettings;
