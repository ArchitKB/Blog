import React from 'react';
import axios from 'axios';
import Header from './Header';
import Body from './Body'

function Dashboard({user ,setUser}){
    return(
        <>
        <Header></Header>
        <Body user ={user} setUser ={setUser} />
        </>
    );
};

export default Dashboard;