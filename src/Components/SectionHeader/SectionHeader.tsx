import './SectionHeader.css'
interface SectionHeaderProps{
    title:string
}
const SectionHeader:React.FC<SectionHeaderProps> = ({title}) => {
  return (
    <div className='SectionHeader'>
        <h1>{title}</h1>
    </div>
  )
}

export default SectionHeader