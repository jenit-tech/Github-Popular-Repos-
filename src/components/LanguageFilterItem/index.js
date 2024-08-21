// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {isActive, eachLanguage, updateLanguageData} = props
  const {id, language} = eachLanguage

  const buttonClassName = isActive ? 'active-language' : 'item-language'

  const onClickLanguage = () => {
    updateLanguageData(id)
  }

  return (
    <li className="app-container-item">
      <button
        type="button"
        className={buttonClassName}
        onClick={onClickLanguage}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
