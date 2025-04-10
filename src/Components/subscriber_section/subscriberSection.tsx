import './subscriberSection.css';
import { useLanguage } from "../../LanguageContext";
import en from "../../locales/en";
import ar from "../../locales/ar";
import { useState } from 'react';
import axios from 'axios';

const SubscriberSection = () => {
  const { language } = useLanguage();
  const translations = language === "ar" ? ar : en;
  const [email, setEmail] = useState(''); 
  const [message, setMessage] = useState('');

  
  const handleSubscribe = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault(); 

    
    if (!email) {
      setMessage('Please enter a valid email address');
      return;
    }

    try {
      const response = await axios.post('https://pearlsmilemedical.ae/dashboard/api/subscriber', {
        email: email,
      });

      if (response.status === 201) {
        setMessage(translations.SubscriptionSuccess);
        console.log("Subscription successful:", response.data);
        setEmail(''); 
        console.log("Email input cleared");
      } else {
        console.log("Unexpected response:", response);
      }
    } catch (error) {
      setMessage('Subscription failed. Please try again.');
      console.error('Error subscribing:', error);
    }
  };

  return (
    <div className='subscriber_page'>
      <div className="subscrip_input">
        <input 
          placeholder="email" 
          type="email" 
          className="input" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        
        <span onClick={handleSubscribe} className="subscribe_button" role="button">
          {translations.SubscribeNow}
        </span>
      </div>
        {message && <p className='message_success'>{message}</p>}
    </div>
  );
};

export default SubscriberSection;
