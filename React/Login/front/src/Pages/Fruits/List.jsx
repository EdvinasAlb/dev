import TopNav from '../TopNav';
import { useContext } from 'react';
import { Fruits } from '../../Contexts/Fruits';
import Fruit from './Fruit';

export default function List() {

    const { fruits } = useContext(Fruits);

    if (!fruits)
        return (
            <div>
                <TopNav />
                <h1>Loading...</h1>
            </div>
        );

    return (
        <div>
            <TopNav />
            <h1>Fruits List</h1>
            <div className="fruits-box">
                {
                    fruits.map(fruit => <Fruit key={fruit.id} fruit={fruit} />)
                }
            </div>
        </div>
    );


}