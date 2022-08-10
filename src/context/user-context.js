import * as React from "react";

import { useAuth } from "./auth-context";
import * as Client from "../client/client";

const UserContext = React.createContext();
UserContext.displayName = "UserContext";

export const UserProvider = ({ children, formState }) => {
  function reducerFunc(state, action) {
    const { type, payload, updatedUser, error } = action;
    switch (type) {
      case "start update": {
        return {
          ...state,
          user: { ...state.user, ...payload },
          status: "pending",
          storedUser: state.user,
        };
      }
      case "finish update": {
        return {
          ...state,
          user: updatedUser,
          status: "resolved",
          storedUser: null,
          error: null,
        };
      }
      case "fail update": {
        return {
          ...state,
          status: "rejected",
          error,
          user: state.storedUser,
          storedUser: null,
        };
      }
      case "reset": {
        return {
          ...state,
          status: null,
          error: null,
        };
      }
      default:
        throw new Error(`Unknown action type: ${type} `);
    }
  }
  const { user } = useAuth();

  const [state, dispatch] = React.useReducer(reducerFunc, {
    status: null,
    error: null,
    storedUser: user,
    user,
  });

  const reset = (dispatch) => dispatch({ type: "reset" });
  const update = (dispatch) => {
    dispatch({ type: "start update", payload: formState });
    Client.updateUser(user, formState).then(
      (updatedUser) => dispatch({ type: "finish update", updatedUser }),
      (error) => dispatch({ type: "fail update", error })
    );
  };

  const value = [state, dispatch, reset, update];

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context === undefined) {
    throw new Error("Must be in wrapped in UserProvider");
  }
  return context;
};
