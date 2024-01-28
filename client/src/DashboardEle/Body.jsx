import React,{useState, useEffect} from "react";
import axios from 'axios';
import './Dashboard.css';

function Profile(){
    return(
        <h1>Profile placeholder</h1>
    );
}

function Feed(){
    const [posts, setPosts] = useState([]);

    useEffect( () => {
        async function fetchPost(){
            try{
                const posts = await axios.get('http://localhost:3001/posts');
            } catch(error){
                console.log(error);
            }

            console.log(posts);
            // posts = posts.map((post) => (JSON.stringify(post)));
        }

        fetchPost();
    }, []);

    try{
        
    } catch(error){
        return<h1>OOPSie DASies</h1>
    }
    return(
        <h1>Try</h1>
    )
}

// async function Post(props){

//     const userName = props.userName;
//     const description = props.description;
//     return(<div>
//         <h1>{userName}</h1>
//         <p>{description}</p>
//     </div>);
// }

function Body(){
    return(
        <div className="body">
            <Profile />
            <Feed />
        </div>
    );
}

export default Body;