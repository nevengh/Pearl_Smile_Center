import PagesHero from "../../Components/PagesHero/PagesHero";
import { useLanguage } from "../../LanguageContext";
import en from "../../locales/en";
import ar from "../../locales/ar";
import "./BlogsProfile.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import SeoComponnent from "../../Components/SeoComponnent/SeoComponnent";
interface Blog {
  id: number;
  title: string;
  description: string;
  tags: string;
  image: {
    id: number;
    path: string;
    alt: string;
  };
}
const BlogsProfile = () => {
  const { language } = useLanguage();
  const translations = language === "ar" ? ar : en;

  const [blogData, setBlogData] = useState<Blog | null>(null);

  const { id } = useParams<{ id: string }>();

 
  useEffect(() => {
    const fetchBlogById = async () => {
      try {
        const response = await axios.get<{ data: Blog }>(
          `https://pearlsmilemedical.ae/dashboard/api/blogs/${id}`,
          {
            headers: {
              Accept: "application/json",
              "Accept-Language": language, 
            },
          }
        );
        setBlogData(response.data.data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    fetchBlogById();
  }, [id, language]);
  return (
    <div className="BlogsProfile">
      <SeoComponnent
        title={translations.blogTitleSeo}
        keyword={translations.blogKeySeo}
        description={translations.blogDesSeo}
        type="website"
      />
      <PagesHero
        Hero_name={blogData?.title || ""}
        hero_img={blogData?.image?.path || "/path/to/placeholder.jpg"}
      />
      
      <div className="service_Profile blog_Profile">
        <div className="service_content_container">
        <div className="img_doctor">
          {blogData?.image ? (
            <img
              src={blogData.image.path}
              alt={blogData.image.alt || "Doctor image"}
            />
          ) : (
            <p>{translations.Noimageavailable}</p>
          )}
        </div>
        <div className="doctor_info_sec">
          <h1 className="doctor_name">
            {blogData?.title || "No name available"}
          </h1>
          <p className="blogs_tags">{blogData?.tags}</p>

        </div>
        </div>
        <div className="blogs_description">
            <ReactMarkdown>
             {blogData?.description|| "No description available"} 
            </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default BlogsProfile;
