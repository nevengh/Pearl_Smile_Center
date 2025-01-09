import './WhatsAppBtn.css'
import whatsApp from '../../assets/images/icons/whatsapp.svg'
const WhatsAppBtn = () => {
  return (
    <div className="whatsapp-btn">
      <a
        href="https://wa.me/971509600787" // Replace with your WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={whatsApp} // Replace with the path to your WhatsApp icon
          alt="WhatsApp"
          className="whatsapp-icon"
        />
      </a>
    </div>
  )
}

export default WhatsAppBtn