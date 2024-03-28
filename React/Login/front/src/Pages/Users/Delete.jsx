import { Users } from '../../Contexts/Users';
import { Router } from '../../Contexts/Router';
import TopNav from '../TopNav';
import { useContext, useState, useEffect } from 'react';


export default function Delete() {


    const [user, setUser] = useState(null);
    const { users, setDeleteUser, setUsers } = useContext(Users);
    const { params } = useContext(Router);


    useEffect(_ => {
        if (null === users) {
            return;
        }
        const user = users.find(user => user.id === +params[1]);
        if (!user) {
            setUser(null);
        } else {
            setUser(user);
        }
    }, [users, params[1]]);

    const doDelete = _ => {
        const userId = user.id;
        setUsers(f => f.map(user => user.id === userId ? { ...user, temp: true } : user));
        setDeleteUser(userId);
        window.location.href = '#users';
    }

    if (!users)
        return (
            <div>
                <TopNav />
                <h1>Loading...</h1>
            </div>
        );

    if (!user)
        return (
            <div>
                <TopNav />
                <h1>User not found</h1>
            </div>
        );

    return (
        <div>
            <TopNav />
            <h1>Confirm delete user <span style={{ color: user.color }}>{user.name}</span></h1>
            <div className="users-center">
                <button className="red" onClick={doDelete}>Delete</button>
                <button className="green" onClick={_ => window.location.href = '#users'}>Cancel</button>
            </div>
        </div>
    );
}