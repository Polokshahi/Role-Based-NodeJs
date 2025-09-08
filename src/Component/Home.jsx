import { useEffect } from "react";

import Card from "./CardComponent/Card";
import Title from "./Title/Title";
import Banner from "./Slider/Banner";




const Home = () => {
    useEffect(() =>{
        document.title = 'Home'
    })
    return (
        <div>


            <div className="mb-10">
                 <Banner></Banner>
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