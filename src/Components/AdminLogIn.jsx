import MenuPrincipal from './MenuPrincipal.jsx';
import { useState } from 'react';
import LogIn from './Login.jsx';

export default function AdminLogIn() {

    // Datos del inicio de sesion del usuario
    const [user, setUser] = useState(false);

    const setValidUser = (valid) => {
        setUser(valid)
    }
    return (user
        ? <MenuPrincipal /> :
        <LogIn setValidUser={setValidUser} />
    );
}
