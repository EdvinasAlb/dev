import { createContext} from 'react';
import useUsers from '../Hooks/useUsers';

export const Users = createContext();

export const UsersProvider = ({ children }) => {



    const { users, setUsers, createUser, setCreateUser, editUser, setEditUser, deleteUser, setDeleteUser } = useUsers();



    return (
        <Users.Provider value={{
            users, setUsers,
            createUser, setCreateUser,
            editUser, setEditUser,
            deleteUser, setDeleteUser

        }}>
            {children}
        </Users.Provider>
    );
}