import { useNavigate } from 'react-router-dom';
import './ServicesCard.css'

interface ServicesCardProps{
    img_url:string;
    servie_name_card:string;
    img_alt:string;
    id: number; 
}
const ServicesCard:React.FC<ServicesCardProps> = ({servie_name_card,img_url,img_alt,id}) => {
  const navigate = useNavigate();


  const handleCardClick = () => {
    navigate(`/service/${id}`); 
  };
  return (
    <div className='ServicesCard' onClick={handleCardClick}>
        <img src={img_url} alt={img_alt} />
        <h1 className='servie_name_card'> {servie_name_card} </h1>
        <div className="overlay_card_service"></div>
    </div>
  )
}

export default ServicesCard