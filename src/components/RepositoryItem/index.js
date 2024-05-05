import './index.css'

const RepositoryItem = props => {
  const {reposDetails} = props
  const {avatarUrl, forksCount, issuesCount, name, starsCount} = reposDetails
  return (
    <li className="popular-repos-list">
      <img src={avatarUrl} className="avatar-url" alt={name} />
      <h1 className="repos-name">{name}</h1>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          className="star-img"
          alt="stars"
        />
        <p className="counts-value">{starsCount} stars</p>
      </div>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          className="star-img"
          alt="forks"
        />
        <p className="counts-value">{forksCount} forks</p>
      </div>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          className="star-img"
          alt="open issues"
        />
        <p className="counts-value">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
