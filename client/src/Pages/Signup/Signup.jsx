import React , {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom';
import axios from "axios";
function Signup(){
    //const navigate = useNavigate();

    const [firstName,setFirstName] = useState("");
    const [email,setEmail] = useState("");
    const [lastName,setLastName] = useState("");
    const [password,setPassword] = useState("");
    const [location,setLocation] = useState("");
    const [occupation,setOccupation] = useState("");
    

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
    /*---------------function to handle firstName----------------*/
    const handleFirstNameChange = (event) => {
        event.preventDefault();
        const newFirstName = event.target.value;
        setFirstName(newFirstName);
    }

    /*---------------function to handle firstName----------------*/
    const handleLastNameChange = (event) => {
        event.preventDefault();
        const newLastName = event.target.value;
        setLastName(newLastName);
    }
    /*---------------function to handle location----------------*/
    const handleLocationChange = (event) => {
        event.preventDefault();
        const newLocation = event.target.value;
        setLocation(newLocation);
    }
    /*---------------function to handle occupation----------------*/
    const handleOccupationChange = (event) => {
        event.preventDefault();
        const newOccupation = event.target.value;
        setOccupation(newOccupation);
    }

    /*-----------function to handle Submit--------------*/
    const submitFunction = async (event) => {
        event.preventDefault();
        const picturePath = "";
        const friends = [];
        try{
          const res = await axios.post("http://localhost:3001/auth/register",{
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
          });

          console.log(res.data);
          alert("Signed Up successfully");
          //navigate('/login');


          // Making things empty
          setEmail("");
          setPassword("");
          setFirstName("");
          setLastName("");
          setOccupation("");
          setLocation("");
          
        }
        catch(err){
            if(err.response && err.response.status === 400 ){
                alert("Username already exist!!!");
            }
            else{
                console.log(err);
            }
        }
    }






    return (
        <form action="" onSubmit={submitFunction}>
            <div className="outerDiv">
                <div>
                    SignUp
                </div>
                <div className='firstName'>
                    <label htmlFor='fname'>firstname</label>
                    <input 
                    className='input'
                    value = {firstName}
                    type = "text"
                    placeholder = "Enter the firstName"
                    onChange = {handleFirstNameChange}
                    required/>

                </div>

                <div className='lastName'>
                    <label htmlFor='lname'>lastname</label>
                    <input 
                    className='input'
                    value = {lastName}
                    type = "text"
                    placeholder = "Enter the firstName"
                    onChange = {handleLastNameChange}
                    required/>

                </div>
                <div className='email'>
                    <label htmlFor='email'>email</label>
                    <input 
                    className='input'
                    value = {email}
                    type = "text"
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
                <div className='occupation'>
                    <label htmlFor='occupation'>occupation</label>
                    <input 
                    className='input'
                    value = {occupation}
                    type = "text"
                    placeholder = "Enter your occupation"
                    onChange = {handleOccupationChange}
                    required/>

                </div>
                <div className='location'>
                    <label htmlFor='location'>location</label>
                    <input 
                    className='input'
                    value = {location}
                    type = "text"
                    placeholder = "Enter your location"
                    onChange = {handleLocationChange}
                    required/>

                </div>
                <button
                 className='buttonm'
                 onClick={submitFunction}
                >SignUp</button>
                <div>
                    Already signed up? 
                </div>
                <div>
                    <Link to = "/login">Login</Link>
                </div>
            </div>
        </form>
    )




}
export default Signup;