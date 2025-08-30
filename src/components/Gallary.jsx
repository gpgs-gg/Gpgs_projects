import React from 'react';
// for boys import 
import bed1 from "../imagesforboys/bed1.png"
import bed2 from "../imagesforboys/bed2.png"
import bed3 from "../imagesforboys/bed3.png"
import bed4 from "../imagesforboys/photo4.jpeg"
import bed5 from "../imagesforboys/photo5.jpeg"
import bed6 from "../imagesforboys/photo6.jpeg"
import bed7 from "../imagesforboys/photo7.jpeg"
import bed8 from "../imagesforboys/photo8.jpeg"
import bed9 from "../imagesforboys/photo9.jpeg"
import bed10 from "../imagesforboys/photo10.jpeg"
import bed11 from "../imagesforboys/photo11.jpeg"
import bed12 from "../imagesforboys/photo12.jpeg"
import bed13 from "../imagesforboys/photo13.jpeg"
import bed14 from "../imagesforboys/photo14.jpeg"
import bed15 from "../imagesforboys/photo15.jpeg"
import bed16 from "../imagesforboys/photo16.jpeg"
import bed17 from "../imagesforboys/photo17.jpeg"
import bed18 from "../imagesforboys/photo18.jpeg"
import bed19 from "../imagesforboys/photo19.jpeg"
import bed20 from "../imagesforboys/photo20.jpeg"
import bed21 from "../imagesforboys/photo21.jpeg"
import bed22 from "../imagesforboys/photo22.jpeg"
import bed23 from "../imagesforboys/photo23.jpeg"
import bed24 from "../imagesforboys/photo24.jpeg"
import bed25 from "../imagesforboys/photo25.jpeg"
import bed26 from "../imagesforboys/photo26.jpeg"
import bed27 from "../imagesforboys/photo27.jpeg"
import bed28 from "../imagesforboys/photo28.jpeg"
import bed29 from "../imagesforboys/photo29.jpeg"
import bed30 from "../imagesforboys/photo30.jpeg"

// for girls import 
import gbed1 from "../imagesforgirls/photo1.jpeg"
import gbed2 from "../imagesforgirls/photo2.jpeg"
import gbed3 from "../imagesforgirls/photo3.jpeg"
import gbed4 from "../imagesforgirls/photo4.jpeg"
import gbed5 from "../imagesforgirls/photo5.jpeg"
import gbed6 from "../imagesforgirls/photo6.jpeg"
import gbed7 from "../imagesforgirls/photo7.jpeg"
import gbed8 from "../imagesforgirls/photo8.jpeg"
import gbed9 from "../imagesforgirls/photo9.jpeg"
import gbed10 from "../imagesforgirls/photo10.jpeg"
import gbed11 from "../imagesforgirls/photo11.jpeg"
import gbed12 from "../imagesforgirls/photo12.jpeg"
import gbed13 from "../imagesforgirls/photo13.jpeg"

const girlsimagesforboys = [
  bed1,
  bed2,
  bed3,
  bed4,
  bed5,
  bed6,
  bed7,
  bed8,
  bed9,
  bed10,
  bed11,
  bed12,
  bed13,
  bed14,
  bed15,
  bed16,
  bed17,
  bed18,
  bed19,
  bed20,
  bed21,
  bed22,
  bed23,
  bed24,
  bed25,
  bed26,
  bed27,
  bed28,
  bed29,
  bed30,

];

const boysimagesforboys = [
gbed1,
gbed2,
gbed3,
gbed4,
gbed5,
gbed6,
gbed7,
gbed8,

gbed9,
gbed10,
gbed11,
gbed12,
gbed13,



];

const Gallary = () => {
  return (
    <div className="p-6 space-y-12 ">
      {/* Girls PG Section */}
      <section className='mt-20'>
        <h2 className="text-2xl md:text-3xl font-bold  text-blue-700 text-center mb-6">
          Male PG Photos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {girlsimagesforboys.map((src, index) => (
            <div
              key={index}
              className="w-full h-[400px] rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={src}
                alt={`male PG ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>


   
      <section className='mt-20'>
        <h2 className="text-2xl md:text-3xl font-bold  text-blue-700 text-center mb-6">
          Female PG Photos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {boysimagesforboys.map((src, index) => (
            <div
              key={index}
              className="w-full h-[400px] rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={src}
                alt={`female PG ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Gallary;
