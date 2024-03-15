import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button className = 'btn btn-danger' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Cerrar Sesión
    </button>
  );
};

export default LogoutButton;