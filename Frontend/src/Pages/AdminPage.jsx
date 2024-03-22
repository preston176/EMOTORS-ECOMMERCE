
import { useState } from "react"

import './CSS/AdminPage.css'
import { Link, useParams } from "react-router-dom"

const AdminPage = () => {

    const { userId } = useParams();



    return (
        <div>
            <div className='profile-container'>
                <div className="sidebar">
                    {/* Your sidebar content */}
                    <h2>Admin Panel</h2>
                    <Link to={`/adminloginpage/${userId}/adminuserorders`}><button>Manage User Orders</button></Link>
                    <button>Manage Bikes</button>
                    <button>View Reports</button>
                    <button>Log Out</button>
                    {/* Add any other sidebar content here */}
                </div>
                <div className="main-content">
                    <div className="right-admin-section">
                        <h2>Summary</h2>
                        {/* display cards for summary */}
                        <div className="cards-section">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Total Orders</h5>
                                    <p className="card-text">10</p>
                                </div>

                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Total Users</h5>
                                    <p className="card-text">10</p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Pending Orders</h5>
                                    <p className="card-text">10</p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Completed Orders</h5>
                                    <p className="card-text">10</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPage
