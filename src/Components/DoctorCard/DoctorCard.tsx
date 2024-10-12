import { useNavigate } from 'react-router-dom';
import './DoctorCard.css'
interface DoctorCardProps{
    img_url:string;
    Doctor_Name:string;
    Doctor_sevice:string;
    img_alt:string;
    id: number; 
}
const DoctorCard:React.FC<DoctorCardProps> = ({img_url,Doctor_Name,Doctor_sevice,img_alt,id}) => {
    const navigate = useNavigate();


  const handleCardClick = () => {
    navigate(`/doctor/${id}`); 
  };
  return (
    <div className='DoctorCard' onClick={handleCardClick}>
        <div className="DoctorCard_img">
          <img src={img_url} alt={img_alt} />
        </div>
        <h2>{Doctor_Name}</h2>
        <p>{Doctor_sevice} </p>
    </div>
  )
}

export default DoctorCard