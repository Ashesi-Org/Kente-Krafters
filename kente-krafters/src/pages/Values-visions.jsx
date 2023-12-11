import React from 'react';
import { PRODUCTS } from "../utils/data";

const ValuesAndVisions = () => {
 return (
   <div className="max-w-screen-md mx-auto p-8 bg-white rounded-md shadow-md">
     <h2 className="text-3xl font-semibold mb-4 text-center text-gray-800">Our Values and Visions</h2>
     <ul className="list-disc p-0">
       <li className="mb-8">
         <h3 className="text-xl font-semibold text-gray-800">Value 1</h3>
         <p className="text-gray-600">
           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
           eiusmod tempor incididunt ut labore et dolore magna aliqua.
         </p>
       </li>
       <li className="mb-8">
         <h3 className="text-xl font-semibold text-gray-800">Value 2</h3>
         <p className="text-gray-600">
           Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
           nisi ut aliquip ex ea commodo consequat.
         </p>
       </li>
       {/* Add more values as needed */}
     </ul>

     <h2 className="text-3xl font-semibold mb-4 mt-8 text-center text-gray-800">Impact</h2>
     <p className="text-gray-600">
       In our bid to grow as a social enterprise, Woven seeks to build the skills of its employees so that they are ever ready to serve you in this ever-changing world we live in. 
     </p>
     <p className="text-gray-600">
       With Ghana being the headquarters of the African Continental Free Trade Area (AfCTA), we seek to capitalise on this to help widen our scope and spread our fabric across the continent and beyond.
     </p>
   </div>
 );
};

export default ValuesAndVisions;
