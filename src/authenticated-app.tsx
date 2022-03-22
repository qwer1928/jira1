import { useAuth } from "context/auth_context";
import React from "react";
import ProjectListScreen from "screens";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <div>
      <button onClick={logout}>登出</button>
      <ProjectListScreen />
    </div>
  );
};
