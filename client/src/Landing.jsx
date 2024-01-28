import React ,{useState,useEffect} from "react";
import "./Landing.css"

const Landing = ()=> {
    // const[backgroundImage,setBackgroundImage] = useState(1);
    // useEffect(()=>{
    //     const interval = setInterval( () => {
    //       setBackgroundImage((prevImage) => (prevImage === 10 ? 1 : prevImage+1));
    //     },5000);

    //     return () => {
    //         clearInterval(interval); 
    //       };
    // },[]);
    return (
    <>
    <div className="background-Image"
     style ={{
        backgroundImage:`url(./images/image.jpg)`,
     }}>
     <div type="text" className="text1 text" > Blogopedia</div>
     <br/><br/>
     <div type="text" className="text1 text">Your one stop for</div>
     <div type="text" className="text1 text">Authentic News</div>
     <p className="text2 text para">Blogopedia is website which provides authentic news by constantly maintaining the source of each information and removing any unauthentic news</p>

     <br/><br/><br/>
     <button className="button">SIGN ME UP</button>
     </div>
    </>
    )
}

export default Landing;