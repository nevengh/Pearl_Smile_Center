
import "./PagesHero.css";

interface PageHeroProps{
  hero_img:string;
  Hero_name:string;

}


const PagesHero = ({ hero_img, Hero_name }:PageHeroProps) => {
  return (
    <div className="Pages_Hero">
      <img src={hero_img} alt="Hero" />
      <h1 className="Hero_Heading"> {Hero_name} </h1> 
    </div>
  );
};

export default PagesHero;
