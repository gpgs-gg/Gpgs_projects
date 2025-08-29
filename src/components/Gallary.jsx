import React from 'react';
import bed1 from "../images/bed1.png"
import bed2 from "../images/bed2.png"
import bed3 from "../images/bed3.png"
import bed4 from "../images/photo4.jpeg"
import bed5 from "../images/photo5.jpeg"
import bed6 from "../images/photo6.jpeg"
import bed7 from "../images/photo7.jpeg"
import bed8 from "../images/photo8.jpeg"
import bed9 from "../images/photo9.jpeg"
import bed10 from "../images/photo10.jpeg"
import bed11 from "../images/photo11.jpeg"
import bed12 from "../images/photo12.jpeg"
import bed13 from "../images/photo13.jpeg"
import bed14 from "../images/photo14.jpeg"
import bed15 from "../images/photo15.jpeg"
import bed16 from "../images/photo16.jpeg"
import bed17 from "../images/photo17.jpeg"
import bed18 from "../images/photo18.jpeg"
import bed19 from "../images/photo19.jpeg"
import bed20 from "../images/photo20.jpeg"
import bed21 from "../images/photo21.jpeg"
import bed22 from "../images/photo22.jpeg"
import bed23 from "../images/photo23.jpeg"
import bed24 from "../images/photo24.jpeg"
import bed25 from "../images/photo25.jpeg"
import bed26 from "../images/photo26.jpeg"
import bed27 from "../images/photo27.jpeg"
import bed28 from "../images/photo28.jpeg"
import bed29 from "../images/photo29.jpeg"
import bed30 from "../images/photo30.jpeg"

const girlsImages = [
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

const boysImages = [
  'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT8MdbuOVlViQHXODKBg7KOo4iYHPR-NcKpeBkH3j-88dgsZH2b8O61peW9CqnrCbTkoXEz30SNkhXSTYzfVN8fCPhM4ua7AKIJ_3IP1j8',
  'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT8MdbuOVlViQHXODKBg7KOo4iYHPR-NcKpeBkH3j-88dgsZH2b8O61peW9CqnrCbTkoXEz30SNkhXSTYzfVN8fCPhM4ua7AKIJ_3IP1j8',
  'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT8MdbuOVlViQHXODKBg7KOo4iYHPR-NcKpeBkH3j-88dgsZH2b8O61peW9CqnrCbTkoXEz30SNkhXSTYzfVN8fCPhM4ua7AKIJ_3IP1j8',
  'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT8MdbuOVlViQHXODKBg7KOo4iYHPR-NcKpeBkH3j-88dgsZH2b8O61peW9CqnrCbTkoXEz30SNkhXSTYzfVN8fCPhM4ua7AKIJ_3IP1j8',
  'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT8MdbuOVlViQHXODKBg7KOo4iYHPR-NcKpeBkH3j-88dgsZH2b8O61peW9CqnrCbTkoXEz30SNkhXSTYzfVN8fCPhM4ua7AKIJ_3IP1j8',
  'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT8MdbuOVlViQHXODKBg7KOo4iYHPR-NcKpeBkH3j-88dgsZH2b8O61peW9CqnrCbTkoXEz30SNkhXSTYzfVN8fCPhM4ua7AKIJ_3IP1j8',
  'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT8MdbuOVlViQHXODKBg7KOo4iYHPR-NcKpeBkH3j-88dgsZH2b8O61peW9CqnrCbTkoXEz30SNkhXSTYzfVN8fCPhM4ua7AKIJ_3IP1j8',

];

const Gallary = () => {
  return (
    <div className="p-6 space-y-12 ">
      {/* Girls PG Section */}
      <section className='mt-20'>
        <h2 className="text-2xl md:text-3xl font-bold text-pink-600 text-center mb-6">
          Male PG Photos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {girlsImages.map((src, index) => (
            <div
              key={index}
              className="w-full h-[400px] rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={src}
                alt={`Girls PG ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>


      {/* Boys PG Section */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-blue-700 text-center mb-6">
          Female PG Photos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {boysImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Boys PG ${index + 1}`}
              className="w-full h-auto rounded-lg shadow-md object-cover"
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Gallary;
