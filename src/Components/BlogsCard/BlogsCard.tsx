import React from 'react';
import './BlogsCard.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useLanguage } from '../../LanguageContext';
import ar from '../../locales/ar';
import en from '../../locales/en';

interface BlogsCardProps {
  img_url: string;
  img_alt: string;
  title: string;
  tags: string;
  blogs_text: string;
  id: number; // Add ID as a prop
}

const BlogsCard: React.FC<BlogsCardProps> = ({ img_url, img_alt, title, tags, blogs_text, id }) => {
  const { language } = useLanguage();
  const translations = language === 'ar' ? ar : en;
  const navigate = useNavigate(); 


  const handleReadMore = () => {
    navigate(`/blogs/${id}`); 
  };

  return (
    <div className='BlogsCard'>
      <div className="blogs_img">
        <img src={img_url} alt={img_alt} />
      </div>
      <h1 className="blog_title">{title}</h1>
      <p className="blogs_tags">{tags}</p>
      <div className="div-btn">
        <p className="blogs_text">{blogs_text}</p>
        <button className="read_more_btn" onClick={handleReadMore}>
          {translations.readMore}
        </button>
      </div>
    </div>
  );
};

export default BlogsCard;
