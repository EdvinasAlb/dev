import { Fruits } from '../../Contexts/Fruits';
import { Router } from '../../Contexts/Router';
import TopNav from '../TopNav';
import { useContext, useState, useEffect } from 'react';


export default function Delete() {


    const [fruit, setFruit] = useState(null);
    const { fruits, setDeleteFruit, setFruits } = useContext(Fruits);
    const { params } = useContext(Router);


    useEffect(_ => {
        if (null === fruits) {
            return;
        }
        const fruit = fruits.find(fruit => fruit.id === +params[1]);
        if (!fruit) {
            setFruit(null);
        } else {
            setFruit(fruit);
        }
    }, [fruits, params[1]]);







    const doDelete = _ => {
        const fruitId = fruit.id;
        setFruits(f => f.map(fruit => fruit.id === fruitId ? { ...fruit, temp: true } : fruit));
        setDeleteFruit(fruitId);
        window.location.href = '#fruits';
    }

    if (!fruits)
        return (
            <div>
                <TopNav />
                <h1>Loading...</h1>
            </div>
        );

    if (!fruit)
        return (
            <div>
                <TopNav />
                <h1>Fruit not found</h1>
            </div>
        );

    return (
        <div>
            <TopNav />
            <h1>Confirm delete fruit <span style={{ color: fruit.color }}>{fruit.name}</span></h1>
            <div className="fruits-center">
                <button className="red" onClick={doDelete}>Delete</button>
                <button className="green" onClick={_ => window.location.href = '#fruits'}>Cancel</button>
            </div>
        </div>
    );
}