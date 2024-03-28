import { useContext } from 'react';
import { Auth } from '../Contexts/Auth';
import Gate from './Auth/Gate';


export default function TopNav() {
    

    const { user, logout } = useContext(Auth);

    return (
        <nav>
            <div className="menu">
                <a href="#home">Home</a>
                <Gate roles="admin|user|animal"><a href="#fruits">Fruits</a></Gate>
                <Gate roles="admin|user"><a href="#fruits/create">Add fruit</a></Gate>
                <Gate roles="admin"><a href="#users">Users</a></Gate>
            </div>
            <div className="login">
                {
                    user && <span className="user">{user.user}</span>
                }
                {
                    user && <span> | </span>
                }
                {
                    user && <i onClick={logout}>Logout</i>
                }
                {
                    !user && <a href="#register">Register</a>
                }
                {
                    !user && <span> | </span>
                }
                {
                    !user && <a href="#login">Login</a>
                }
            </div>
        </nav>
    );
}