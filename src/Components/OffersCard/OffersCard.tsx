import React, { useState } from 'react';
import './OffersCard.css';
interface OffersCardProps{
    defaultImage:string;
    hoverImage:string;
}
const OffersCard :React.FC<OffersCardProps>= ({ defaultImage, hoverImage }) => {
  const [currentImage, setCurrentImage] = useState(defaultImage);

  // Function to handle mouse enter (hover)
  const handleMouseEnter = () => {
    setCurrentImage(hoverImage); // Set hover image when mouse enters
  };

  // Function to handle mouse leave
  const handleMouseLeave = () => {
    setCurrentImage(defaultImage); // Revert to default image when mouse leaves
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
