import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom"
import {Button, Menu, Typography, Avatar} from "antd";
import {MenuOutlined, FundOutlined, BulbOutlined, HomeOutlined, MoneyCollectOutlined} from "@ant-design/icons"
import logo3 from "../images/logo3.png"

const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(true)
    const [screenSize, setScreenSize] = useState(null)
    // Handles the Navbar component for small screens
    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth)
        window.addEventListener('resize', handleResize)
        handleResize()
        return window.removeEventListener('resize', handleResize)
    }, []);
    useEffect(() =>{
        if(screenSize < 768){
            setActiveMenu(false)
        }else{
            setActiveMenu(true)
        }
    },[screenSize])
    // Navbar Items with the specified icons
    const menuItems = [
        {
            key: 'home',
            icon: <HomeOutlined />,
            label: <Link to="/">Home</Link>
        },
        {
            key: 'cryptocurrency',
            icon: <FundOutlined />,
            label: <Link to="/cryptocurrency">Cryptocurrency</Link>
        },
        {
            key: 'exchanges',
            icon: <MoneyCollectOutlined />,
            label: <Link to="/exchanges">Exchanges</Link>
        },
        {
            key: 'news',
            icon: <BulbOutlined />,
            label: <Link to="/news">News</Link>
        }
    ];

    return (
        <div className="nav-container">
            <div className="logo-container">
                <Avatar src={logo3} size="large" />
                <Typography.Title level={2} className="logo">
                    <Link to="/">CoinDesk</Link>
                </Typography.Title>
                <button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)} aria-label="Toggle menu">
                    <MenuOutlined />
                </button>
            </div>
            {activeMenu && (
                <Menu theme="dark" items={menuItems} />
            )}
        </div>
    );
}

export default Navbar;