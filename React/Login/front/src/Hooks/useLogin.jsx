import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { SERVER_URL, AFTER_LOGIN_URL, SITE_URL } from '../Constants/main';
import { Auth } from '../Contexts/Auth';

export default function useLogin() {

    const [inputs, setInputs] = useState(null);
    const [response, setResponse] = useState(null);

    const { login } = useContext(Auth);

    useEffect(() => {
        if (null !== inputs) {
            axios.post(`${SERVER_URL}/login`, inputs)
                .then(res => {
                    login(res.data.token, res.data.name, res.data.role, res.data.id);
                    window.location.href = `${SITE_URL}/${AFTER_LOGIN_URL}`;
                })
                .catch(error => {
                    if (!error.response) {
                        setResponse({
                            ok: false,
                            status: 500,
                            message: 'Server Error'
                        });
                    } else {
                        setResponse({
                            ok: false,
                            status: error.response.status,
                            message: error.response.data?.message || error.message
                        });
                    }
                });
        }
    }, [inputs]);



    return [setInputs, response];
}