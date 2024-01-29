import React,{useState, useEffect} from "react";
import axios from 'axios';
import './Dashboard.css';
import UserWidget from "../widgets/Userwidget";
import LikedButton from '@mui/icons-material/Favorite';
import LikeButton from '@mui/icons-material/FavoriteBorder'
import CommentButton from '@mui/icons-material/Comment';
import CreatePost from "../CreatePost/CreatePost";
// import Userwidget from 

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

    const userId = JSON.parse(localStorage.getItem('user'))._id;

    const postsArray = posts.map((post) => {
        let likes = 0;
        let is_liked = false;

        Object.entries(post.likes).map( ([key, values]) => {
            if(key === userId && values === true){
                is_liked = true;
            }

            if(values === true){
                likes++;
            }
        });


        return <Post key = {post._id} id = {post._id} userName = {post.firstName + ' ' + post.lastName}  description = {post.description} likes={likes} is_liked={is_liked} image ={post.picturePath} />
    });


    return(
        <ul>
            {postsArray}
        </ul>
    )
}

function Post(props){

    const userName = props.userName;
    const description = props.description;
    
    const [isLiked , setIsLiked] = useState(props.is_liked);
    const [likes, setLikes] = useState(props.likes);
    async function handleLike (){
        if(isLiked){
            setIsLiked(false);
            setLikes(likes-1);
        }

        else{
            setIsLiked(true);
            setLikes(likes+1);
        }
        
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        try{
            await axios.patch( `http://localhost:3001/posts/${props.id}/like`,{ userId : userId}, {
                        headers: {
                            'Authorization' : "Bearer " + localStorage.getItem('token').slice(1,-1),
                            'Content-Type' : 'application/json',
                        },
                    });
        } catch(error){
            console.log(error);
        }
    }

    async function handleComment(){
        //comments here
    }

    return(<li>
        <h2>{userName}</h2>
        <p>{description}</p>
        <p>Likes: {likes}</p>
        <p>{isLiked? "true" : "false"}</p>
        <img
        style={{ objectFit: "cover", borderRadius: "" }}
        width={400}
        height={600}
        alt="user"
        src={`http://localhost:3001/assets/${props.image}`}
      />
        <p>{isLiked === true? <LikedButton onClick={handleLike} sx={{color:'red'}}/>:<LikeButton onClick={handleLike} sx={{color:'red'}}/>}</p>
        <p><CommentButton sx={{color:'greenyellow'}} onClick={handleComment}/></p>
    </li>);
}

function Body(){
    const userId = JSON.parse(localStorage.getItem('user'));
    return(
        <div className="body">
            <UserWidget userId ={userId._id} picturePath={userId.picturePath} />
            <Feed />
            <CreatePost/>
        </div>
    );
}

export default Body;