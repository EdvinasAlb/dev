import Gate from '../Auth/Gate';

export default function Fruit({fruit}) {
    return (
        <div className={`fruit ${fruit.form.toLowerCase()}`} style={{
            backgroundColor: fruit?.temp ? '#777777' : fruit.color
            }}>
            <div>{fruit.name}</div>
            {
                fruit.temp 
                ? 
                <span>
                <Gate roles="admin|user"><b>Edit</b></Gate>
                <Gate roles="admin|user"><b>Delete</b></Gate>
                </span> 
                : 
                <span>
                <Gate roles="admin|user"><b><a href={'#fruits/edit/' + fruit.id}>Edit</a></b></Gate>
                <Gate roles="admin"><b><a href={'#fruits/delete/' + fruit.id}>Delete</a></b></Gate>
                </span>
            }

        </div>
    );
}