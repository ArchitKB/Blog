import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import LikedButton from '@mui/icons-material/Favorite';
import LikeButton from '@mui/icons-material/FavoriteBorder';
import CommentButton from '@mui/icons-material/Comment';

function Comment(props){
    return(
        <div>
            <img
                        style={{ objectFit: "cover", borderRadius: "50%" }}
                        width={60}
                        height={60}
                        alt="user"
                        src={`http://localhost:3001/assets/${props.user.picturePath}`}
                />
            <h4>{props.user.firstName + ' ' + props.user.lastName}</h4>
            <p>{props.description}</p>
        </div>
    )
}
function ViewPost(){
    const {postId} = useParams();
    const [curPost, setCurPost] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLiked , setIsLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    const [newComment,setComment] = useState("");
    const [postComments,setPostComments] = useState([]);
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    useEffect( () =>{

        async function getUser(){


            try{
                
                let post = await axios.get(`http://localhost:3001/posts/${postId}`, {
                    headers: {
                        'Authorization': "Bearer " + localStorage.getItem('token').slice(1,-1),
                    },
                });
                post = post.data;
                let user = await axios.get(`http://localhost:3001/users/${post.userId}` , {
                    headers : {
                        'Authorization' : 'Bearer ' + localStorage.getItem('token').slice(1,-1),
                    },
                });
                
                user = user.data;

                setCurPost(post);
                setUser(user);

                let likeCount = 0;
                Object.entries(post.likes).map( ([key, values]) => {
                    if(key === userId && values === true){
                        setIsLiked(true);
                    }
            
                    if(values === true){
                        likeCount++;
                    }
                });

                let comments = await axios.get(`http://localhost:3001/posts/${post._id}/getComments` , {
                    headers : {
                        'Authorization' : 'Bearer ' + localStorage.getItem('token').slice(1,-1),
                    },
                });
                comments = comments.data;
                setPostComments(comments);
                
                console.log(comments);
                setLikes(likeCount);
            }catch(error){
                console.log(error);
            }finally{
                setIsLoaded(true);
            }

        }

        getUser();
    },[]);
    
    async function handleLike (){
        if(isLiked){
            setIsLiked(false);
            setLikes(likes-1);
        }

        else{
            setIsLiked(true);
            setLikes(likes+1);
        }
        
        try{
            await axios.patch( `http://localhost:3001/posts/${curPost._id}/like`,{ userId : userId}, {
                        headers: {
                            'Authorization' : "Bearer " + localStorage.getItem('token').slice(1,-1),
                            'Content-Type' : 'application/json',
                        },
                    });
        } catch(error){
            console.log(error);
        }
    }

    function handleCommentChange(event){
        event.preventDefault();

        const curComment = event.target.value;
        setComment(curComment);
    }

    async function handleComment(){
        try{
                const obj = await axios.post( `http://localhost:3001/posts/${curPost._id}/comment`,{ userId : userId, description: newComment}, {
                    headers: {
                        'Authorization' : "Bearer " + localStorage.getItem('token').slice(1,-1),
                        'Content-Type' : 'application/json',
                    },
                });
                if(obj.status === 201){
                    setComment("");
                    alert("Comment added");
                }
        }catch(error){
            console.log(error);
        }
        

    }
    if(!isLoaded){
        return(<h1> Loading ... </h1>);
    }

    const commentArray = postComments.map( (comment) => <Comment user = {comment}/>);
    return(
        <div>
            <div>
                <img
                        style={{ objectFit: "cover", borderRadius: "50%" }}
                        width={60}
                        height={60}
                        alt="user"
                        src={`http://localhost:3001/assets/${user.picturePath}`}
                />

                <h1>{user.firstName + ' ' + user.lastName}</h1> 
                <h2>{user.occupation}</h2>
            </div>

            <div>
                <h3>{curPost.description}</h3>
                <p>{curPost.about}</p>
            </div>

            <div>
                <div>{isLiked === true ? <LikedButton sx={{ color: "red" }} onClick={handleLike}/>: <LikeButton sx={{ color: "red" }} onClick={handleLike}/>}</div>
                {likes}
                <div>
                    <input 
                        value = {newComment}
                        type = "newComment"
                        placeholder = "Enter your comment here"
                        onChange = {handleCommentChange}
                        required/>

                    <CommentButton sx={{
                        color: "grey",
                        '&:hover': {
                        cursor: "pointer",
                        },
                    }} onClick={handleComment} />
                </div>
            </div>
            <div>
                {commentArray}
            </div>
            </div>
        );

}

export default ViewPost;