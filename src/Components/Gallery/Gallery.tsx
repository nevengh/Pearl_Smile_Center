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
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fetch photo gallery data
  useEffect(() => {
    const fetchPhotoGallery = async () => {
      try {
        const response = await axios.get<{ data: PhotoGallery[] }>(
          // "http://127.0.0.1:8000/api/photo-gallery",
          "https://pearlsmilemedical.ae/dashboard/api/photo-gallery",
          {
            headers: {
              "Accept-Language": language,
              Accept: "application/json",
            },
          }
        );
        setPhotoGallery(response.data.data);
      } catch (error) {
        console.error("Error fetching photo gallery:", error);
      }
    };
    fetchPhotoGallery();
  }, [language]);


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
      } catch (error) {
        console.error("Error fetching video gallery:", error);
      }
    };
    fetchVideoGallery();
  }, [language]);

  // Array of items to display based on the gallery type
  const items = isPhotoGallery ? photoGallery : videoGallery;

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="Gallery_page">
      <div className="gallery_content">
        <h1 className="gallery_content_title">{translations.mediaGallery}</h1>
        <div className="gallery_btn">
          <button onClick={() => { setIsPhotoGallery(true); setCurrentSlide(0); }}>
            {translations.photos}
          </button>
          <button onClick={() => { setIsPhotoGallery(false); setCurrentSlide(0); }}>
            {translations.videos}
          </button>
        </div>
      </div>

      <div className="slider">
        <button onClick={prevSlide} className="slider-button left">{"<"}</button>
        <div className="slide-container">
          {isPhotoGallery ? (
            <img
              src={photoGallery[currentSlide]?.photo.path}
              alt={photoGallery[currentSlide]?.photo.alt || "Photo"}
              className="gallery-image"
            />
          ) : (
            <iframe
              src={videoGallery[currentSlide]?.video.path}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={videoGallery[currentSlide]?.video.description || "Video"}
              className="gallery-video"
            ></iframe>
          )}
        </div>
        <button onClick={nextSlide} className="slider-button right">{">"}</button>
      </div>
    </div>
  );
};

export default Gallery;
