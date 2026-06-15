import { ButtonIcon, SlidersIcon, TableIcon } from './Icons.jsx'

const icons = {
  buttons: ButtonIcon,
  sliders: SlidersIcon,
  table: TableIcon,
}

const SectionCard = ({ children, className = '', icon, title }) => {
  
  const renderIcon = () => {
    if (!icon) return null;
    
    if (typeof icon === 'string' && icons[icon]) {
      const DictionaryIcon = icons[icon];
      return <DictionaryIcon />;
    }
    
    return icon;
  };

  return (
    <section className={`section-card ${className}`}>
      <div className="section-card__heading">
        <span className="section-card__line" />
        {renderIcon()}
        <h2>{title}</h2>
        <span className="section-card__line" />
      </div>
      {children}
    </section>
  )
}

export default SectionCard