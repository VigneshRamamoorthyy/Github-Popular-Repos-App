import './index.css'

const LanguageFilterItem = props => {
  const {languageFilterDetails, onSetLanguageFilter, isActive} = props
  const {id, language} = languageFilterDetails

  const className = isActive
    ? 'language-button active-language'
    : 'language-button'

  const onClickFilter = () => {
    onSetLanguageFilter(id)
  }
  return (
    <li>
      <button type="button" className={className} onClick={onClickFilter}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
