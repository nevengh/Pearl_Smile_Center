import { Link } from 'react-router-dom'
import './PageLinkBtn.css'

interface PageLinkBtnProps{
    Page_Url:string,
    Link_Name:string
}
const PageLinkBtn:React.FC<PageLinkBtnProps> = ({Page_Url ,Link_Name }) => {
  return (
    <div className='PageLinkBtn'>
        <Link to={Page_Url} >{Link_Name} <span>&gt;</span></Link>
    </div>
  )
}

export default PageLinkBtn