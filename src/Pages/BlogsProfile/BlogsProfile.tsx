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
  // State to store the fetched blogs
  const [blogData, setBlogData] = useState<Blog | null>(null);
  // Extract the service id from the URL
  const { id } = useParams<{ id: string }>();

  // Fetch blog data by ID
  useEffect(() => {
    const fetchBlogById = async () => {
      try {
        const response = await axios.get<{ data: Blog }>(
          `http://127.0.0.1:8000/api/blogs/${id}`,
          {
            headers: {
              Accept: "application/json",
              "Accept-Language": language, // Pass the current language to the request header
            },
          }
        );
        setBlogData(response.data.data); // Set blog data in state
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    fetchBlogById();
  }, [id, language]); // Refetch when id or language changes
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
            <p>No image available</p> // Fallback if no image is available
          )}
        </div>
        <div className="doctor_info_sec">
          <h1 className="doctor_name">
            {blogData?.title || "No name available"}
          </h1>
          <p className="blogs_tags">{blogData?.tags}</p>
          {/* <p className="service_resume">
            {blogData?.description || "No resume available"}
          </p> */}
        </div>
        </div>
        <div className="blogs_description">
            {/* {blogData?.description} */}
            <ReactMarkdown>
             {blogData?.description|| "No description available"} 
            </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default BlogsProfile;
