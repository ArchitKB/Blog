import React,{useState, useEffect} from "react";
import axios from 'axios';
import './Dashboard.css';

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

    const postsArray = posts.map((post, index) => (<Post key = {index} userName = {post.firstName + ' ' + post.lastName}  description = {post.description}/>));

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
    </li>);
}

function Body(){
    return(
        <div className="body">
            <Profile />
            <Feed />
        </div>
    );
}

export default Body;