// FormContact.tsx
import './FormContact.css';
import SectionHeader from "../SectionHeader/SectionHeader";
import { useLanguage } from '../../LanguageContext';
import en from '../../locales/en';
import ar from '../../locales/ar';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Service {
  id: number;
  title: string;
}

interface FormContactProps {
  serviceId: string; // Receive the serviceId as a prop
}

const FormContact: React.FC<FormContactProps> = ({ serviceId }) => {
  const { language } = useLanguage();
  const translations = language === 'ar' ? ar : en;

  const [services, setServices] = useState<Service[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    service_id: serviceId || '' // Initialize with the passed serviceId
  });
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get<{ data: Service[] }>('http://127.0.0.1:8000/api/services-names', {
          headers: {
            'Accept-Language': language,
            'Accept': 'application/json',
          },
        });
        setServices(response.data.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, [language]);

  useEffect(() => {
    // Update the formData service_id whenever serviceId changes
    setFormData((prevData) => ({ ...prevData, service_id: serviceId }));
  }, [serviceId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/booking', {
        headers: {
          'Accept-Language': language,
          'Accept': 'application/json',
        },
        name: formData.name,
        email: formData.email,
        phone_number: formData.phone,
        message: formData.message,
        service_id: formData.service_id
      });

      console.log('API response:', response.data);

      if (response.status === 201) {
        setResponseMessage(translations.SubscriptionSuccess || 'Booking successful!');
        setFormData({ name: '', email: '', phone: '', message: '', service_id: serviceId });
      }
    } catch (error) {
      setResponseMessage(translations.SubscriptionError || 'Booking failed. Please try again.');
      console.error('Error booking:', error);
    }
  };

  return (
    <div className="FormContact">
      <form onSubmit={handleSubmit}>
        <SectionHeader title={translations.contact} />
        <div className="form_first_row">
          <div className="input_group">
            <label htmlFor="name">{translations.FormName}</label>
            <input 
              type="text" 
              placeholder={translations.FormName} 
              id="name" 
              value={formData.name}
              onChange={handleInputChange} 
              required
            />
          </div>
          <div className="input_group">
            <label htmlFor="phone">{translations.FormPhone}</label>
            <input 
              type="text" 
              placeholder={translations.FormPhone} 
              id="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required 
            />
          </div>
        </div>
        <div className="input_group">
          <label htmlFor="email">{translations.FormEmail}</label>
          <input 
            type="email" 
            placeholder={translations.FormEmail} 
            id="email" 
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input_group">
          <label htmlFor="message">{translations.FormMessage}</label>
          <textarea 
            id="message" 
            placeholder={translations.FormMessage} 
            value={formData.message}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form_last_row">
          <div className="input_group">
            <label htmlFor="service_id" className='service_id'>{translations.FormService}</label>
            <select 
              id="service_id" 
              value={formData.service_id}
              onChange={handleInputChange}
              required
            >
              <option value="">{translations.selectService}</option>
              {services.length > 0 ? (
                services.map((service) => (
                  <option key={service.id} value={String(service.id)}>
                    {service.title}
                  </option>
                ))
              ) : (
                <option value="">{translations.loading}</option>
              )}
            </select>
          </div>
          <div className="Submit_btn">
            <button type="submit">{translations.Submit}</button>
          </div>
        </div>
        {responseMessage && <p>{responseMessage}</p>}
      </form>
    </div>
  );
};

export default FormContact;
