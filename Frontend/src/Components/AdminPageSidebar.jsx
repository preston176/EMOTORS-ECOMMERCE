import React from 'react'
import { Link } from 'react-router-dom'

const AdminPageSidebar = ({ userId }) => {
    return (
        <div className="sidebar">
            {/* Your sidebar content */}
            <h2>Admin Panel</h2>
            <Link to={`/adminloginpage/${userId}/adminuserorders`}><button>Manage User Orders</button></Link>
            <Link to={`/adminloginpage/${userId}/adminmanagebikes`}> <button>Manage Bikes</button></Link>
            <button>View Reports</button>
            <button>Log Out</button>
            {/* Add any other sidebar content here */}
        </div>
    )
}

export default AdminPageSidebar
