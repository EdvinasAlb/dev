import { Fruits } from '../../Contexts/Fruits';
import TopNav from '../TopNav';
import { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Create() {

    const [name, setName] = useState('');
    const [color, setColor] = useState('#BF8431');
    const [form, setForm] = useState('square');

    const { setCreateFruit, setFruits } = useContext(Fruits);

    const add = _ => {
        const fruit = {
            name,
            color,
            form,
            id: uuidv4(),
        };
        setFruits(f => [...f, {...fruit, temp: true}]);
        setCreateFruit(fruit);
        window.location.href = '#fruits';
    }

    return (
        <div>
            <TopNav />
            <h1>Add new fruit</h1>
            <div className="fruits-bin">
                <div className="form">
                    <div className="form-group">
                        <label>name</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>color</label>
                        <input type="color" value={color} onChange={e => setColor(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>form</label>
                        <div className="checkboxes">
                            <div>
                                <input id="s" type="checkbox" checked={'square' === form} onChange={_ => setForm('square')} />
                                <label htmlFor="s">Square</label>
                            </div>
                            <div>
                                <input id="c" type="checkbox" checked={'circle' === form} onChange={_ => setForm('circle')} />
                                <label htmlFor="c">Circle</label>
                            </div>
                            <div>
                                <input id="r" type="checkbox" checked={'rounded' === form} onChange={_ => setForm('rounded')} />
                                <label htmlFor="r">Rounded</label>
                            </div>
                        </div>
                    </div>
                    <button className="green" onClick={add}>Add</button>
                </div>
            </div>
        </div>
    );
}