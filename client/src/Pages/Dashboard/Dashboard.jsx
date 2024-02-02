import React, { useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Body from './Body'
import {useNavigate} from 'react-router-dom'
function Dashboard({user ,setUser}){
    return(
        <>
        <Header></Header>
        <Body user ={user} setUser ={setUser} />
        </>
    );
};

export default Dashboard;