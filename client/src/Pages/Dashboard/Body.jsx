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

    const userId = JSON.parse(localStorage.getItem('user'));

    
    const postsArray = posts.map((post, index) => (<Post key = {index} userName = {post.firstName + ' ' + post.lastName}  description = {post.description} likes={Object.keys(post.likes).length} is_liked={post.likes.userId} />));


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
        <p>{props.is_liked === undefined? false:true}</p>
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