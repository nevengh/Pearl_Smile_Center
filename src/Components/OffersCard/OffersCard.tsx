import React, { useState } from 'react';
import './OffersCard.css';
interface OffersCardProps{
    defaultImage:string;
    hoverImage:string;
}
const OffersCard :React.FC<OffersCardProps>= ({ defaultImage, hoverImage }) => {
  const [currentImage, setCurrentImage] = useState(defaultImage);


  const handleMouseEnter = () => {
    setCurrentImage(hoverImage);
  };

  
  const handleMouseLeave = () => {
    setCurrentImage(defaultImage);
  };

  return (
    <div
      className="Our_Offers_Card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={currentImage} alt="Offer" />
    </div>
  );
};

export default OffersCard;
