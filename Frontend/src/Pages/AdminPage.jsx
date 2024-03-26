
import { useContext, useEffect, useState } from "react"

import './CSS/AdminPage.css'
import { useParams } from "react-router-dom"
import AdminPageSidebar from "./AdminPageSidebar";
import { UserAuthContext } from "../Context/UserAuthContext";

const AdminPage = () => {

    const { userId } = useParams();
    const { setUserId } = useContext(UserAuthContext);
    useEffect(() => {
        setUserId(userId);
    }, []);


    return (
        <div>
            <div className='profile-container'>
                <AdminPageSidebar userId={userId} />
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
