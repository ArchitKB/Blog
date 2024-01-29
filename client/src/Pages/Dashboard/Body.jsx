import React,{useState, useEffect} from "react";
import axios from 'axios';
import './Dashboard.css';
import UserWidget from "../widgets/Userwidget";

function Profile(){
    return(
        <h1>Profile placeholder</h1>
    );
}

function Feed(){
    let [posts, setPosts] = useState([]);

    useEffect( () => {
        async function fetchPost(){
            try{
                let postsObj = await axios.get('http://localhost:3001/posts', {
                    headers: {
                        'Authorization': "Bearer " + localStorage.getItem('token').slice(1,-1),
                    },
                });

                setPosts(postsObj.data);
            } catch(error){
                console.log(error);
            }

        }

        fetchPost();
    }, []);

    const userId = JSON.parse(localStorage.getItem('user'));

    
    const postsArray = posts.map((post, index) => (<Post key = {index} userName = {post.firstName + ' ' + post.lastName}  description = {post.description} likes={Object.keys(post.likes).length} is_liked={post.likes.userId} image ={post.picturePath} />));


    return(
        <ul>
            {postsArray}
        </ul>
    )
}

function Post(props){

    const userName = props.userName;
    const description = props.description;
    return(<li>
        <h1>{userName}</h1>
        <p>{description}</p>
        <p>Likes: {props.likes}</p>

        <img
        style={{ objectFit: "cover", borderRadius: "" }}
        width={400}
        height={600}
        alt="user"
        src={`http://localhost:3001/assets/${props.image}`}
      />
        <p>{props.is_liked === undefined? false:true}</p>
    </li>);
}

function Body(){
    const userId = JSON.parse(localStorage.getItem('user'));
    return(
        <div className="body">
            <UserWidget userId ={userId._id} picturePath={userId.picturePath} />
            <Feed />
        </div>
    );
}

export default Body;