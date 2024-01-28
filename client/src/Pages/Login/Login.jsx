import React , {useState} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';


function Login({user,setUser,token,setToken}){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");


    /*---------------function to handle password----------------*/
    const handlePasswordChange = (event) =>{
        event.preventDefault();
        const newPassword = event.target.value;
        setPassword(newPassword);
    }

    /*---------------function to handle email----------------*/
    const handleEmailChange = (event) => {
        event.preventDefault();
        const newEmail = event.target.value;
        setEmail(newEmail);
    }
    const submitFunction = async(event) => {
       event.preventDefault();
       try{
         const res = await axios.post("http://localhost:3001/auth/login",{
            email,
            password
        })
        console.log(res.data);
        setUser(res.data.requiredUser);
        // setToken(res.data.sessionToken);
        localStorage.clear();
        localStorage.setItem('user',JSON.stringify(res.data.requiredUser));
        localStorage.setItem('token',JSON.stringify(res.data.sessionToken));
        alert("Logged in successfully");
       }
       catch(err){
        if(err.response && err.response.status === 400 ){
            alert("Username doesn't exist!!!");
        }
        else{
            console.log(err);
        }
    }
    }
    return (
        <>
        <form onSubmit={submitFunction}>
            <div className='bigger container'>
              <div className='login'> 
                 Login
              </div>
              <div className='content'>
                
              <div className='email'>
                    <label htmlFor='email'>email</label>
                    <input 
                    className='input'
                    value = {email}
                    type = "email"
                    placeholder = "Enter the email"
                    onChange = {handleEmailChange}
                    required/>

                </div>
                <div className='password'>
                    <label htmlFor='fname'>password</label>
                    <input 
                    className='input'
                    value = {password}
                    type = "text"
                    placeholder = "Enter the Password"
                    onChange = {handlePasswordChange}
                    required/>

                </div>

                <button
                 className='button'
                 onClick={submitFunction}
                ><Link to = "/dashboard">Login</Link> </button>
                <div>Don't have an account?'</div>
                <div ><Link to="/Signup"> SignUp</Link></div>
             
             </div>
            </div>
        </form>
        
        
        
        
        </>
    )
}

export default Login;
