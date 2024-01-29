import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


const UserWidget = ({userId, picturePath}) => {
    const [user,setUser] = useState(null);
    const navigate = useNavigate();
    const getUser = async () => {
        const response = await axios.get(`http://localhost:3001/users/${userId}`,{
            headers : {
                'Authorization': "Bearer " + localStorage.getItem('token').slice(1,-1),
            }
        })
        setUser(response.data);
    };
    useEffect(()=>{
        getUser();
    },[]);
    if(!user){
        return null;
    }
    const {
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions,
        friend,
    }= user;
    return (
        <div>
            <ul>
            <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={60}
        height={60}
        alt="user"
        src={`http://localhost:3001/assets/${picturePath}`}
      />
                <li>{firstName} {lastName}</li>
                <li>location : {location}</li>
                <li>occupation : {occupation}</li>
                <li>viewedProfile : {viewedProfile}</li>
                <li>impressions : {impressions}</li>

            </ul>
        </div>
    )
}
export default UserWidget;