import React from 'react';
import { NavLink } from "react-router-dom";
import carousel_img_1 from "../assets/nice.png";
import carousel_img_3 from "../assets/kent.png";
import carousel_img_2 from "../assets/carousel_img_2.jpg";


const LandingPage = () => {
  const handleButtonClick = () => {
    // Replace the following URL with the actual URL you want to navigate to
    window.location.href = 'https://6576593962d11507416a7e96--spiffy-phoenix-61e583.netlify.app/';
  };
  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <div className="relative p-8 rounded-md shadow-md flex items-center justify-between w-full">
        <div className="w-1/2">
          <img
            className="relative w-100 h-100 object-cover mb-4"
            src={carousel_img_1}
            alt="Landing Page Image"
          />
        </div>
        <div className="w-1/2 text-black text-center">
          <h1 className="text-6xl font-bold mb-4">Welcome to Woven</h1>
          
          <p className="mb-8">
          As a family enterprise that has been sustained three generations down, it has been an undulating journey. For just like the kente fabric in itself, with time comes growth and with this growth befalls struggle. In the recent past, this enterprise had been threatened by fires which sought to end the three generation-long business
          </p>
          <NavLink to="/HomePage" className="my-0.5 col-md-6">
            <button className="bg-black text-white px-4 py-2 rounded-md">
            Get started
          </button>
          </NavLink>
          
        </div>
      </div>
      <div className="relative p-8 rounded-md shadow-md flex items-center justify-between w-full">
        <div className="w-1/2 text-black text-left">
        <h2 className="text-5xl font-bold mb-4">Your stole, our priority</h2>
          <p className="mb-4">
          However, we at Woven present an answer to ensuring the sustenance that was started by our forefathers, by taking kente digital and providing a widened market for it; both in Ghana and across the continent. 
With you in mind, we extend an invitation to join our family and take this journey of growth and sustenance with us, by being our loyal customers.
          </p>
          
            <button className="bg-black text-white px-4 py-2 rounded-md"  onClick={handleButtonClick}>
            Stole Customization
          </button>
          
          {/* Add more content or styling as needed */}
        </div>
        <div className="w-1/2">
          <img
            className="relative w-57 h-57 object-cover mb-4"
            src={carousel_img_3}
            alt="Right Image"
          />
        </div>
      </div>
      <div className="relative p-8 rounded-md shadow-md text-left w-full">
        <img
          className="w-full h-96 object-cover mb-4"
          src={carousel_img_2}
          alt="Bottom Image 2"
        />
        <div className="text-black text-center">
        <h2 className="text-5xl font-bold mb-4">Unique way of celebration</h2>
          <p className="mb-4">
          In our bid to grow as a social enterprise, Woven seeks to build the skills of its employees so that they are ever ready to serve you in this ever-changing world we live in. 

With Ghana being the headquarters of the African Continental Free Trade Area (AfCTA), we seek to capitalise on this to help widen our scope spread our fabric across the continent and beyond.
          </p>
          <NavLink to="/kente" className="my-0.5 col-md-6">
            <button className="bg-black text-white px-4 py-2 rounded-md">
            Start shopping
          </button>
          </NavLink>
          {/* Add more content or styling as needed */}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;





