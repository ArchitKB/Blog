const UserWidget = ({userId, picturePath, token}) => {
    const [user,setUser] = useState(null);
    const navigate = useNavigate();
    const getUser = async () => {
        const response = await axios.get(`http://localhost:3001/users/${userId}`,{
            headers : {
                'Authorization': "Bearer " + localStorage.getItem('token').slice(1,-1),
            }
        })
        setUser(response.data);
    };
    useEffect(()=>{
        getUser();
    },[]);
    if(!user){
        return null;
    }
    const {
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        imprssions,
        friend,
    }= user;
    return (
        <div>
            <ul>
            <img
        style={{ objectFit: "cover", borderRadius: "" }}
        width={400}
        height={600}
        alt="user"
        src={`http://localhost:3001/assets/${picturePath}`}
      />
                <li>{firstName} {lastName}</li>
                <li>location : {location}</li>
                <li>occupation : {occupation}</li>
                <li>viewedProfile : {viewedProfile}</li>
                <li>impressions : {impressions}</li>

            </ul>
        </div>
    )
}