import { useEffect } from "react";
import Slider from "./Slider/Slider";



const Home = () => {
    useEffect(() =>{
        document.title = 'Home'
    })
    return (
        <div>


            <div className="mb-10">
                <Slider></Slider>
            </div>

            



            
        </div>
    );
};

export default Home;