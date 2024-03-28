import Gate from '../Auth/Gate';

export default function User({ user }) {
    return (
        <div className="user" style={{
            backgroundColor: user?.temp ? '#777777' : null
        }}>
            <div className="about">
                <div className="name">{user.name}</div>
                <div className="role">{user.role}</div>
            </div>

            <div className="actions">
                <a href={'#users/edit/' + user.id} className="edit">Change Role</a>
                <a href={'#users/delete/' + user.id} className="delete">Delete</a>
            </div>
        </div>
    );
}