import './WhatsAppBtn.css'
import whatsApp from '../../assets/images/icons/whatsapp.svg'
const WhatsAppBtn = () => {
  return (
    <div className="whatsapp-btn">
      <a
        href="https://wa.me/971509600787" 
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={whatsApp}
          alt="WhatsApp"
          className="whatsapp-icon"
        />
      </a>
    </div>
  )
}

export default WhatsAppBtn