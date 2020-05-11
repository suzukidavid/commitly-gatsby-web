import React from "react";
import { navigate } from "gatsby";
import { useSelector } from "react-redux";

import { useAuthState } from "../../hooks/useAuthState";

export const LoginOnly: React.FC = ({ children }) => {
  const { userDoc, loading } = useSelector((state) => state.auth);
  useAuthState();

  React.useEffect(() => {
    if (!loading && !userDoc) {
      navigate("/");
    }
  }, [loading, userDoc]);

  if (!userDoc) {
    return null;
  }

  return <>{children}</>;
};
