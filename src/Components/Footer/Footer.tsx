import './Footer.css'
import logo from '../../assets/images/Logo.svg'
import instagram from '../../assets/images/icons/instagram.svg'
import Facebook from '../../assets/images/icons/facebook.svg'
import Whatsapp from '../../assets/images/icons/whatsapp.svg'
import Tiktok from '../../assets/images/icons/tiktok.svg'
import phone from '../../assets/images/icons/phoneicon.svg'
import mail from '../../assets/images/icons/mailicon.svg'
import Address from '../../assets/images/icons/LocationIcon.svg'
import Ground_Phone from '../../assets/images/icons/groundTelephone.svg'
const Footer = () => {
  return (
    <div className='Footer'>
        <img src={logo} alt="Pearl Smile Logo" />
        <p className='footer_text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at augue nec erat vestibulum commodo condimentum vitae eros. Nunc ut dui gravida, aliquet nunc eget, tincidunt tortor. Integer dap</p>
        <div className="subscripe_con">
            <div className="social_footer">
                <h1>Stay Up to date</h1>
                <div className="social_icons">
                    <img src={instagram} alt="Instagram Icons" />
                    <img src={Facebook} alt="Facebook Icons" />
                    <img src={Whatsapp} alt="Whatsapp Icons" />
                    <img src={Tiktok} alt="Tiktok Icons" />
                </div>
            </div>
            <div className="subscrip_input">
                <input placeholder="email" type="text" className="input"/>
                <span>Subscribe Now</span>
            </div>
        </div>
        <div className="contact_info">
            <div className="contact_info_con">
                <img src={phone} alt="Phone Icon" />
                <div className="phone_info">
                    <p className='Tel'>Tel</p>
                    <p className='phone_number'>
                        050-960-0787 
                        065-350-887
                    </p>
                </div>
            </div>
            <div className="contact_info_con">
                <img src={mail} alt="Phone Icon" />
                <div className="phone_info">
                    <p className='Tel'>Mail</p>
                    <p className='phone_number'>
                        unreal@outlook.com
                    </p>
                </div>
            </div>
            <div className="contact_info_con">
                <img src={Address} alt="Phone Icon" />
                <div className="phone_info">
                    <p className='Tel'>Address</p>
                    <p className='phone_number'>
                        Entifadah Rd - Al Majaz 3 - Al Majaz - Sharjah - United Arab Emirates
                    </p>
                </div>
            </div>
            <div className="contact_info_con">
                <img src={Ground_Phone} alt="Phone Icon" />
                <div className="phone_info">
                    <p className='Tel'>Phone</p>
                    <p className='phone_number'>
                        +1-000-0000
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer