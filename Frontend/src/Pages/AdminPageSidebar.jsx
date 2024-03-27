import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './CSS/AdminPageSidebar.css'

const AdminPageSidebar = ({ userId }) => {

    const navigate = useNavigate();

    return (
        <div className="sidebar">
            {/* Your sidebar content */}
            <h2>Admin Panel</h2>
            <Link to={`/adminloginpage/${userId}/admin`}><button>Home</button></Link>
            <Link to={`/adminloginpage/${userId}/adminuserorders`}><button>Manage User Orders</button></Link>
            <Link to={`/adminloginpage/${userId}/adminmanagebikes`}> <button>Manage Bikes</button></Link>
            <Link to={`/adminloginpage/${userId}/adminreports`}><button>View Reports</button></Link>
            {/* Add any other sidebar content here */}
        </div>
    )
}

export default AdminPageSidebar
