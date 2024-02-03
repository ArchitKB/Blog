import UserWidget from "../widgets/Userwidget";
import UserPosts from "../../Components/UserPosts";
import Header from "../Dashboard/Header";
import FriendList from "../../Components/FriendList";
function ProfilePage({userId}){
    // const userId = JSON.parse(localStorage.getItem('user'));
return (
    <div className="body" >
   <div>
       <Header userId={userId._id} picturePath={userId.picturePath}></Header>
   </div>
   <div className="widget" style={{marginTop:'60px'}}>
       <UserWidget userId={userId._id} picturePath={userId.picturePath}/>
   </div>
   <div className="posts" style={{marginTop:'45px'}}>
       <UserPosts />
   </div>
        <FriendList/>
   </div>
)
}
export default ProfilePage;
