import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import LogoutButton from "./logout";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
    
  return (
    isAuthenticated && (
      <div style={{ border: '4px solid darkgray', borderRadius: '10px', padding: '20px' }}>
        <h3>Perfil:</h3>
        <p>Foto:</p>
        <img src={user.picture} alt={user.name} />
        <p>Nombre: {user.name}</p>
        <p>email: {user.email}</p>
        <LogoutButton />
      </div>
    )
  );
};

export default Profile;