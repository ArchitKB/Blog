import UserWidget from "../widgets/Userwidget";
import UserPosts from "../../Components/UserPosts";
import Header from "../Dashboard/Header";
function ProfilePage(){
    const userId = JSON.parse(localStorage.getItem('user'));
return (
    
<div>
    <Header></Header>
    <UserWidget userId={userId._id} picturePath={userId.picturePath}/>
    <UserPosts />
</div>
)
}
export default ProfilePage;
