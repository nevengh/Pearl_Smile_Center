import React from 'react';
import './ServiceSectionCard.css'
import ReactMarkdown from 'react-markdown';
interface ServiceSectionCardProps{
    title:string;
    description:string;
}
const ServiceSectionCard:React.FC<ServiceSectionCardProps> = ({title,description}) => {
  return (
    <div className='ServiceSectionCard'>
        <h1 className='ServiceSectionCard_title'>{title}</h1>
        <ReactMarkdown>{description}</ReactMarkdown>
        
    </div>
  )
}

export default ServiceSectionCard