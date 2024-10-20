import PagesHero from "../../Components/PagesHero/PagesHero";
import "./Blogs.css";
import { useLanguage } from "../../LanguageContext";
import ar from "../../locales/ar";
import en from "../../locales/en";
import blogs from "../../assets/images/blog.jpg";
import BlogsCard from "../../Components/BlogsCard/BlogsCard";
import { useEffect, useState } from "react";
import axios from "axios";
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

const Blogs = () => {
  const { language } = useLanguage();
  const translations = language === "ar" ? ar : en;

  // State to store the fetched blogs
  const [blogsData, setBlogsData] = useState<Blog[]>([]);

  // Fetch blogs from the API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get<{ data: Blog[] }>("https://ahmedballeh.com/dashboard/api/blogs", {
          headers: {
            "Accept": "application/json",
            "Accept-Language": language, // Pass language to fetch the correct blog translations
          },
        });
        setBlogsData(response.data.data); // Set the fetched blogs
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [language]);

  // Function to truncate description to the first 20 words
  const truncateDescription = (description: string) => {
    const words = description.split(" ");
    if (words.length > 20) {
      return words.slice(0, 20).join(" ") + " ...";
    }
    return description;
  };

  return (
    <div className="Blogs">
      <SeoComponnent
        title={translations.blogTitleSeo}
        keyword={translations.blogKeySeo}
        description={translations.blogDesSeo}
        type="website"
      />
      <PagesHero Hero_name={translations.blogs} hero_img={blogs} />
      <div className="Blog_card_container">
        {blogsData.length > 0 ? (
          blogsData.map((blog) => (
            <BlogsCard
              key={blog.id}
              id={blog.id} // Pass the blog's ID to the BlogsCard component
              img_url={blog.image.path} 
              img_alt={blog.image.alt}
              title={blog.title}
              tags={blog.tags}
              blogs_text={truncateDescription(blog.description)} // Truncate the description
            />
          ))
        ) : (
          <p>{translations.loadingBlog}</p>
        )}
      </div>
    </div>
  );
};

export default Blogs;
