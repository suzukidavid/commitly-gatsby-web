import React from "react";
import { navigate } from "gatsby";

import { useAuthState } from "../../hooks/useAuthState";

export const PrivateRoute: React.FC = ({ children }) => {
  const { userDoc, loading } = useAuthState();
  if (!loading && !userDoc) {
    navigate("/");
    return null;
  }
  return <>{children}</>;
};
