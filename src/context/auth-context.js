import * as React from "react";

const AuthContext = React.createContext({
  user: { username: "fantomas", tagline: "", bio: "" },
});

AuthContext.displayName = "AuthContext";

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider = ({ user, ...props }) => {
  <AuthContext.Provider value={user} {...props} />;
};
