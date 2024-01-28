import React from 'react';
import axios from 'axios';
import logo from '../../Components/logo.png';
import './Dashboard.css';

function Header(){
    return (
        <div className='header'>
        <Icon />
        <h1>The Blogopedia</h1>
        <Notifications />
        </div>
    );
};

function Icon () {
    return( <img className="logo" src={logo} />);
}

function Notifications () {
    return(<img src='../../public/notifs.png' />);
}

export default Header;