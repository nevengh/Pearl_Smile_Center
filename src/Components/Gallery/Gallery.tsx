import { useEffect, useState } from "react";
import axios from "axios";
import "./Gallery.css";
import { useLanguage } from "../../LanguageContext";
import ar from "../../locales/ar";
import en from "../../locales/en";

interface PhotoGallery {
  id: number;
  photo: {
    id: number;
    path: string;
    alt: string;
  };
}

interface VideoGallery {
  id: number;
  video: {
    id: number;
    path: string;
    description: string;
  };
}

const Gallery = () => {
  const { language } = useLanguage();
  const translations = language === "ar" ? ar : en;
  const [photoGallery, setPhotoGallery] = useState<PhotoGallery[]>([]);
  const [videoGallery, setVideoGallery] = useState<VideoGallery[]>([]);
  const [isPhotoGallery, setIsPhotoGallery] = useState(true);

  // Fetch photo gallery data
  useEffect(() => {
    const fetchPhotoGallery = async () => {
      try {
        const response = await axios.get<{ data: PhotoGallery[] }>(
          "https://pearlsmilemedical.ae/dashboard/api/photo-gallery",
          {
            headers: {
              "Accept-Language": language,
              Accept: "application/json",
            },
          }
        );
        setPhotoGallery(response.data.data);
        console.log("photo-gallery", response.data.data);
      } catch (error) {
        console.error("Error fetching photo gallery:", error);
      }
    };

    fetchPhotoGallery();
  }, [language]);

  // Fetch video gallery data
  useEffect(() => {
    const fetchVideoGallery = async () => {
      try {
        const response = await axios.get<{ data: VideoGallery[] }>(
          "https://pearlsmilemedical.ae/dashboard/api/video-gallery",
          {
            headers: {
              "Accept-Language": language,
              Accept: "application/json",
            },
          }
        );
        setVideoGallery(response.data.data);
        console.log("video-gallery", response.data.data);
      } catch (error) {
        console.error("Error fetching video gallery:", error);
      }
    };

    fetchVideoGallery();
  }, [language]);

  return (
    <div className="Gallery_page">
      <div className="gallery_content">
        <h1 className="gallery_content_title">{translations.mediaGallery}</h1>
        <div className="gallery_btn">
          <button onClick={() => setIsPhotoGallery(true)}>
            {translations.photos}
          </button>
          <button onClick={() => setIsPhotoGallery(false)}>
            {translations.videos}
          </button>
        </div>
      </div>
      <div className="gallery_page_con">
        {isPhotoGallery
          ? photoGallery.slice(0,6).map((item) => (
              <div key={item.id} className="gallery-item">
                <img
                  src={item.photo.path}
                  alt={item.photo.alt}
                  className="gallery-image"
                />
              </div>
            ))
          : videoGallery.slice(0,6).map((item) => (
              <div key={item.id} className="gallery-item">
                <iframe
                  src={item.video.path}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={item.video.description}
                  className="gallery-video"
                ></iframe>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Gallery;
