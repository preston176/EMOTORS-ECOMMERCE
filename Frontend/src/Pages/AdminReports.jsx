import { useContext, useEffect, useState } from "react";
import './CSS/AdminPage.css';
import { useParams } from "react-router-dom";
import AdminPageSidebar from "../Components/AdminPageSidebar";
import { UserAuthContext } from "../Context/UserAuthContext";
import './CSS/AdminReports.css';

const AdminReports = () => {
    const { userId } = useParams();
    const { setUserId } = useContext(UserAuthContext);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [userFilter, setUserFilter] = useState('all');
    const [activeButton, setActiveButton] = useState('users');

    useEffect(() => {
        setUserId(userId);
    }, [userId, setUserId]);

    useEffect(() => {
        fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(data => {
                setUsers(data);
                filterUsers(userFilter, data);
            })
            .catch(error => console.error('Error fetching users:', error));
    }, [userFilter]);

    const filterUsers = (criteria, usersData) => {
        if (criteria === 'all') {
            const activeUsers = usersData.filter(user => user.role === "user");
            setFilteredUsers(activeUsers);
        } else if (criteria === 'active') {
            const activeUsers = usersData.filter(user => user.status === "active" && user.role === "user");
            setFilteredUsers(activeUsers);
        } else if (criteria === 'deleted') {
            const deletedUsers = usersData.filter(user => user.status === "deleted");
            setFilteredUsers(deletedUsers);
        }
    };

    return (
        <div>
            <div className='profile-container'>
                <AdminPageSidebar userId={userId} />
                <div className="main-content">
                    <div className="right-admin-reports-section">
                        <h2>Reports</h2>
                        <div className="report-sidebar">
                            <div className="report-buttons">
                                <button onClick={() => setActiveButton('users')}>Users</button>
                                <button>Orders</button>
                                <button>Bikes</button>
                            </div>

                            <div className="table-btns">
                                <div className="user-btns">
                                    <button onClick={() => setUserFilter('all')}>All Users</button>
                                    <button onClick={() => setUserFilter('active')}>Active Users</button>
                                    <button onClick={() => setUserFilter('deleted')}>Deleted Users</button>
                                </div>
                                <button>Print Report</button>
                            </div>

                            <table id="table">
                                <thead>
                                    <tr>
                                        <th>User Id</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Registration Date</th>
                                        <th>Phone Number</th>
                                        <th>Account Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map(user => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>{new Date(user.registration_date).toLocaleString()}</td>
                                            <td>{user.phone === 0 ? "Not Included" : `0${user.phone}`}</td>
                                            <td>{user.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            Total number of Users: {filteredUsers.length}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminReports;
