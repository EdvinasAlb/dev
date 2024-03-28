import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../Constants/main';
import { Auth } from '../Contexts/Auth';
import { Router } from '../Contexts/Router';

export default function useUsers() {
    const [users, setUsers] = useState(null);
    const [createUser, setCreateUser] = useState(null);
    const [editUser, setEditUser] = useState(null);
    const [deleteUser, setDeleteUser] = useState(null);

    const { user, logout } = useContext(Auth);
    const { show401Page } = useContext(Router);

    useEffect(_ => {

        if (null === user) {
            return;
        }

        if ('admin' !== user.role) {
            setUsers([{name: user.user, id: +user.id, role: user.role}]);
            return;
        }

        const withTokenUrl = 
        user ? `${SERVER_URL}/users?token=${user.token}` : `${SERVER_URL}/users`;

        axios.get(withTokenUrl)
            .then(res => {
                setUsers(res.data);
                console.log(res.data);
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 401) {
                        if (err.response.data.status === 'login') {
                            logout();
                        }
                        show401Page();
                    }
                }
                setUsers({error: true})
            });
    }, []);
    
    
    useEffect(_ => {
        if (null !== createUser) {

            axios.post(`${SERVER_URL}/users`, createUser)
                .then(_ => {
                    setCreateUser(null);

                })
                .catch(_ => {
                    setCreateUser(null);


                });
        }
    }, [createUser]);


    useEffect(_ => {
        if (null !== editUser) {

            const withTokenUrl = 
            user ? `${SERVER_URL}/users/${editUser.id}?token=${user.token}` : `${SERVER_URL}/users/${editUser.id}`;
            
            axios.put(withTokenUrl, editUser)
                .then(res => {
                    setEditUser(null);
                    setUsers(f => f.map(user => user.id === res.data.id ? {...user, temp: false} : user));
                })
                .catch(err => {
                    setEditUser(null);
                    setUsers(f => f.map(user => user.id === editUser.id ? {...user.preEdit, temp: false} : user));
                    if (err.response) {
                        console.log(err.response);
                        if (err.response.status === 401) {
                            if (err.response.data.status === 'login') {
                                logout();
                            }
                            show401Page();
                        }
                    }
                });
        }
    }, [editUser]);

    useEffect(_ => {
        if (null !== deleteUser) {

            const withTokenUrl = 
            user ? `${SERVER_URL}/users/${deleteUser}?token=${user.token}` : `${SERVER_URL}/users/${deleteUser}`;

            axios.delete(withTokenUrl)
                .then(res => {
                    setDeleteUser(null);
                    setUsers(f => f.filter(user => user.id !== res.data.id));
                })
                .catch(err => {
                    setDeleteUser(null);
                    setUsers(f => f.map(user => user.id === deleteUser ? {...user, temp: false} : user));
                    if (err.response) {
                        if (err.response.status === 401) {
                            if (err.response.data.status === 'login') {
                                logout();
                            }
                            show401Page();
                        }
                    }
                });
        }
    }, [deleteUser]);




    return {
        users,
        setUsers,
        createUser,
        setCreateUser,
        editUser,
        setEditUser,
        deleteUser,
        setDeleteUser
    };
}