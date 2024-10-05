import React from 'react';
import './ServiceSectionCard.css'
interface ServiceSectionCardProps{
    title:string;
    description:string;
}
const ServiceSectionCard:React.FC<ServiceSectionCardProps> = ({title,description}) => {
  return (
    <div className='ServiceSectionCard'>
        <h1 className='ServiceSectionCard_title'>{title}</h1>
        <p className='ServiceSectionCard_text'>{description}</p>
    </div>
  )
}

export default ServiceSectionCard