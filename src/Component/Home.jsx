import { useEffect } from "react";
import Slider from "./Slider/Slider";
import Card from "./CardComponent/Card";
import Title from "./Title/Title";



const Home = () => {
    useEffect(() =>{
        document.title = 'Home'
    })
    return (
        <div>


            <div className="mb-10">
                <Slider></Slider>
            </div>

            {/* title */}

          <div className="mt-5 mb-5 flex justify-center items-center">
              <Title></Title>
          </div>


            <div>
                <Card></Card>
            </div>

            



            
        </div>
    );
};

export default Home;