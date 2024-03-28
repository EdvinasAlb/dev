import { useContext } from 'react';
import { Auth } from '../../Contexts/Auth';
import { Router } from '../../Contexts/Router';

export default function Gate({ children, roles }) {

    const { user } = useContext(Auth);
    const {show401Page} = useContext(Router);

    const hasRole = _ => {
        const rolesArray = roles.split('|');
        return user && rolesArray.includes(user.role);
    }

    return (
        <>
            {
                hasRole() ? children : show401Page()
            }
        </>
    );
}