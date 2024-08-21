// Write your code here

import './index.css'

const RepositoryItem = props => {
  const {eachLanguageItem} = props
  const {name, issuesCount, forksCount, starsCount, imageUrl} = eachLanguageItem

  return (
    <li className="data-item">
      <div className="all-container">
        <img src={imageUrl} className="data-image" alt={name} />
        <h1 className="name">{name}</h1>
        <div className="stars-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            className="stars"
            alt="stars"
          />
          <p className="starsCount">{starsCount} stars</p>
        </div>
        <div className="forks-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            className="forks"
            alt="forks"
          />
          <p className="forksCount">{forksCount} forks</p>
        </div>
        <div className="issues-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            className="issues"
            alt="open issues"
          />
          <p className="issuesCount">{issuesCount} open issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
