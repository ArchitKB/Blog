import UserWidget from "../widgets/Userwidget";
import UserPosts from "../../Components/UserPosts";
import Header from "../Dashboard/Header";
import FriendList from "../../Components/FriendList";
function ProfilePage(){
    const userId = JSON.parse(localStorage.getItem('user'));
return (
    
<div>
    <Header></Header>
    <UserWidget userId={userId._id} picturePath={userId.picturePath}/>
    <UserPosts />
    <FriendList/>
</div>
)
}
export default ProfilePage;
