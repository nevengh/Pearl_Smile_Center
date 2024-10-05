import { useNavigate } from 'react-router-dom';
import './DoctorCard.css'
interface DoctorCardProps{
    img_url:string;
    Doctor_Name:string;
    Doctor_sevice:string;
    img_alt:string;
    id: number; // Add the doctor's ID prop
}
const DoctorCard:React.FC<DoctorCardProps> = ({img_url,Doctor_Name,Doctor_sevice,img_alt,id}) => {
    const navigate = useNavigate();

  // Handle card click to navigate to doctor's detail page
  const handleCardClick = () => {
    navigate(`/doctor/${id}`); // Redirect to the doctor's page using the ID
  };
  return (
    <div className='DoctorCard' onClick={handleCardClick}>
        <img src={img_url} alt={img_alt} />
        <h2>{Doctor_Name}</h2>
        <p>{Doctor_sevice} </p>
    </div>
  )
}

export default DoctorCard