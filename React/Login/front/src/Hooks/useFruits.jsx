import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../Constants/main';
import { Auth } from '../Contexts/Auth';
import { Router } from '../Contexts/Router';

export default function useFruits() {
    const [fruits, setFruits] = useState(null);
    const [createFruit, setCreateFruit] = useState(null);
    const [editFruit, setEditFruit] = useState(null);
    const [deleteFruit, setDeleteFruit] = useState(null);

    const { user, logout } = useContext(Auth);
    const { show401Page } = useContext(Router);

    useEffect(_ => {
        const withTokenUrl = 
        user ? `${SERVER_URL}/fruits?token=${user.token}` : `${SERVER_URL}/fruits`;

        axios.get(withTokenUrl)
            .then(res => {
                setFruits(res.data);
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
            });
    }, []);
    
    
    useEffect(_ => {
        if (null !== createFruit) {

            const withTokenUrl = 
            user ? `${SERVER_URL}/fruits?token=${user.token}` : `${SERVER_URL}/fruits`;

            axios.post(withTokenUrl, createFruit)
                .then(res => {
                    setCreateFruit(null);
                    setFruits(f => f.map(fruit => fruit.id === res.data.uuid ? {...fruit, id: res.data.id, temp: false} : fruit));
                })
                .catch(err => {
                    setCreateFruit(null);
                    setFruits(f => f.filter(fruit => fruit.id !== createFruit.id));
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
    }, [createFruit]);


    useEffect(_ => {
        if (null !== editFruit) {

            const withTokenUrl = 
            user ? `${SERVER_URL}/fruits/${editFruit.id}?token=${user.token}` : `${SERVER_URL}/fruits/${editFruit.id}`;
            
            axios.put(withTokenUrl, editFruit)
                .then(res => {
                    setEditFruit(null);
                    setFruits(f => f.map(fruit => fruit.id === res.data.id ? {...fruit, temp: false} : fruit));
                })
                .catch(err => {
                    setEditFruit(null);
                    setFruits(f => f.map(fruit => fruit.id === editFruit.id ? {...fruit.preEdit, temp: false} : fruit));
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
    }, [editFruit]);

    useEffect(_ => {
        if (null !== deleteFruit) {

            const withTokenUrl = 
            user ? `${SERVER_URL}/fruits/${deleteFruit}?token=${user.token}` : `${SERVER_URL}/fruits/${deleteFruit}`;

            axios.delete(withTokenUrl)
                .then(res => {
                    setDeleteFruit(null);
                    setFruits(f => f.filter(fruit => fruit.id !== res.data.id));
                })
                .catch(err => {
                    setDeleteFruit(null);
                    setFruits(f => f.map(fruit => fruit.id === deleteFruit ? {...fruit, temp: false} : fruit));
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
    }, [deleteFruit]);




    return {
        fruits,
        setFruits,
        createFruit,
        setCreateFruit,
        editFruit,
        setEditFruit,
        deleteFruit,
        setDeleteFruit
    };
}