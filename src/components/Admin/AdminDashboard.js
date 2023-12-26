/* eslint-disable no-lone-blocks */
import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import { FaBars, FaChartBar, FaChevronDown, FaCog, FaHome, FaMoneyBillWave, FaSignOutAlt, FaShoppingCart, FaUserClock } from 'react-icons/fa'
import { Link, Navigate, Outlet } from 'react-router-dom'
import '../../ComponentsCss/AdminCss/AdminDashboard.css'

export default function AdminDashboard() {

    { window.scrollTo(0, 0) }

    function adminlogoutHandle() {
        localStorage.removeItem('adminId')
        localStorage.removeItem('adminToken')
        window.location.reload()
    }
    const admintoken = localStorage.getItem('adminToken')

    function handleDown() {
        const listItems = document.querySelectorAll(".adminsidebar-list li");
        listItems.forEach((item) => {
            item.addEventListener("click", () => {
                let isActive = item.classList.contains("active");
                listItems.forEach((el) => {
                    el.classList.remove("active");
                });
                if (isActive) item.classList.remove("active");
                else item.classList.add("active");
            });
        });
    }

    function handleClick() {
        const toggleSidebar = document.querySelector(".toggle-adminsidebar");
        const adminlogo = document.querySelector(".adminlogo-box");
        const adminsidebar = document.querySelector(".adminsidebar");
        toggleSidebar.addEventListener("click", () => {
            adminsidebar.classList.toggle("close");
        });
        adminlogo.addEventListener("click", () => {
            adminsidebar.classList.toggle("close");
        });
    }

    if (!admintoken) {
        return <Navigate to="/adminlogin" />
    }

    return (
        <>
            <div className="adminsidebar close" >
                <Link to="/" className="adminlogo-box">
                    {/* <i className='bx bxl-xing'><Image src={logo} style={{ height: '70%', width: '50%' }} /></i> */}
                    <div className="adminlogo-name">Bluster</div>
                </Link>
                <ul className="adminsidebar-list">
                    <li>
                        <div className="title">
                            <Link to="/" className="link">
                                <i className='bx bx-grid-alt'><FaHome /></i>
                                <span className="name">Home</span>
                            </Link>
                        </div>
                        <div className="submenu">
                            <Link to="/" className="link submenu-title">Home</Link>
                        </div>
                    </li>

                    {/* <li>
                        <div className="title">
                            <Link to="/admindashboard/adminchart" className="link">
                                <i className='bx bx-line-chart'><FaChartBar /></i>
                                <span className="name">Dashboard</span>
                            </Link>
                        </div>
                        <div className="submenu">
                            <Link to="/admindashboard/adminchart" className="link submenu-title">Dashboard</Link>
                        </div>
                    </li> */}

                    <li className="dropdown">
                        <div className="title">
                            <Link to="/admindashboard/allbuyorder" className="link">
                                <i className='bx bx-book-alt'><FaShoppingCart /></i>
                                <span className="name">Products</span>
                            </Link>
                            <i className='bx bxs-chevron-down' onClick={() => handleDown()}><FaChevronDown /></i>
                        </div>
                        <div className="submenu">

                            <Link to="/admindashboard/addproduct" className="link">Add Products</Link>
                            <Link to="/admindashboard/allbuyorder" className="link">All Products</Link>
                        </div>
                    </li>

                    <li className="dropdown">
                        <div className="title">
                            <Link to="/admindashboard/allorder" className="link">
                                <i className='bx bx-line-chart'><FaMoneyBillWave /></i>
                                <span className="name">All Orders</span>
                            </Link>
                            <i className='bx bxs-chevron-down' onClick={() => handleDown()}><FaChevronDown /></i>
                        </div>
                        <div className="submenu">
                            <Link to="/admindashboard/allorder" className="link">Orders</Link>
                            <Link to="/admindashboard/allcancelledorder" className="link">Cancelled Orders</Link>
                        </div>
                    </li>

                    {/* <li className="dropdown">
                        <div className="title">
                            <Link to="/admindashboard/allusers" className="link">
                                <i className='bx bx-line-chart'><FaUserClock /></i>
                                <span className="name">Users</span>
                            </Link>
                            <i className='bx bxs-chevron-down' onClick={() => handleDown()}><FaChevronDown /></i>
                        </div>
                        <div className="submenu">
                            <Link to="/admindashboard/allusers" className="link">All Users</Link>
                        </div>
                    </li> */}
                    <li>
                        <div className="title">
                            <Link to="/admindashboard/adminsettings" className="link" >
                                <i className='bx bx-cog'><FaSignOutAlt /></i>
                                <span className="name">Logout</span>
                            </Link>
                        </div>
                        <div className="submenu">
                            <Link onClick={() => adminlogoutHandle()} className="link submenu-title">Logout</Link>
                        </div>
                    </li>
                </ul>
            </div>

            <section className="adminhome">
                <div className="toggle-adminsidebar">
                    <div className='topdash'>
                        <FaBars className='bx bx-menu' onClick={() => handleClick()} style={{ width: 30, height: 30, marginLeft: 10 }} />
                        <div className='topdash2'>
                            <Link onClick={() => adminlogoutHandle()} style={{ color: '#000000', fontSize: 18, fontWeight: 600 }}>Logout</Link>
                        </div>
                    </div>
                </div>

                <Container style={{ padding: '15px' }}>
                    <Row>
                        <Col md={12}><Outlet /></Col>
                    </Row>
                </Container>
            </section>

        </>
    )
}