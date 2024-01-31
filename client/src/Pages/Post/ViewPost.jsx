import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ViewPost(){
    const {postId} = useParams();
    const [curPost, setCurPost] = useState(null);
    const [user, setUser] = useState(null);
    useEffect( () =>{

        async function getUser(){
            let post;
            let user;
            try{
                post = await axios.get(`http://localhost:3001/posts/${postId}`, {
                    headers: {
                        'Authorization': "Bearer " + localStorage.getItem('token').slice(1,-1),
                    },
                });
                user = await axios.get(`http://localhost:3001/posts/${post.userId}` , {
                    headers : {
                        'Authorization' : 'Bearer ' + localStorage.getItem('token').slice(1,-1),
                    },
                })

            }catch(error){
                console.log(error);
            }

            setCurPost(post);
            setUser(user);
        }

        getUser();
    },[]);

    // const username = user.firstName + ' ' + user.lastName;    
    
    console.log(user)
    console.log(curPost);
    return(
    <div>
        {/* <img
                style={{ objectFit: "cover", borderRadius: "50%" }}
                width={60}
                height={60}
                alt="user"
                src={`http://localhost:3001/assets/${user.picturePath}`}
            />

            <h1>{username}</h1> */}

            {/* <p>{user.description}</p> */}
        </div>
      );

}

export default ViewPost;