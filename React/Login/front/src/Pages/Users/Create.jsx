import { Users } from '../../Contexts/Users';
import TopNav from '../TopNav';
import { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Create() {

    const [name, setName] = useState('');
    const [password, setPasword] = useState('');

    const { setCreateUser } = useContext(Users);

    const register = _ => {
        const user = {
            name,
            password,
            id: uuidv4(),
        };
        setCreateUser(user);
        window.location.href = '#login';
    }

    return (
        <div>
            <TopNav />
            <h1>Register</h1>
            <div className="fruits-bin">
                <form className="form">
                    <div className="form-group">
                        <label>name</label>
                        <input type="text" autoComplete="username" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>password</label>
                        <input type="password" autoComplete="current-password" value={password} onChange={e => setPasword(e.target.value)} />
                    </div>
                    <button type="button" className="green" onClick={register}>Register</button>
                </form>
            </div>
        </div>
    );
}