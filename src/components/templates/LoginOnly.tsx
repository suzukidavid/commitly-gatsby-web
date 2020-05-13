import React from "react";
import { navigate } from "gatsby";
import { useSelector } from "react-redux";
import { Router } from "@reach/router";

export const LoginOnly: React.FC = ({ children }) => {
  const { userDoc, loading } = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (!loading && !userDoc) {
      navigate("/");
    }
  }, [loading, userDoc]);

  if (!userDoc) {
    return null;
  }

  return <Router>{children}</Router>;
};
