import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    activeLanguageId: languageFiltersData[0].id,
    languageList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getLanguageDetails()
  }

  getLanguageDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {activeLanguageId} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`

    const response = await fetch(apiUrl)

    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.popular_repos.map(repo => ({
        id: repo.id,
        name: repo.name,
        issuesCount: repo.issues_count,
        forksCount: repo.forks_count,
        starsCount: repo.stars_count,
        imageUrl: repo.avatar_url,
      }))

      this.setState({
        languageList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  updateLanguageData = activeLanguageId => {
    this.setState({activeLanguageId}, this.getLanguageDetails)
  }

  renderLoader = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="failure-image"
        alt="failure view"
      />
      <h1 className="failure-heading">Something Went Wrong</h1>
    </div>
  )

  renderLanguageData = () => {
    const {languageList} = this.state
    return (
      <div className="data-container">
        <ul className="data-items">
          {languageList.map(eachLanguageItem => (
            <RepositoryItem
              key={eachLanguageItem.id}
              eachLanguageItem={eachLanguageItem}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderLanguageContainerDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.success:
        return this.renderLanguageData()
      default:
        return null
    }
  }

  render() {
    const {activeLanguageId} = this.state
    return (
      <div className="app-container">
        <h1 className="container-heading">Popular</h1>
        <ul className="app-list-container">
          {languageFiltersData.map(eachLanguage => (
            <LanguageFilterItem
              key={eachLanguage.id}
              eachLanguage={eachLanguage}
              updateLanguageData={this.updateLanguageData}
              isActive={eachLanguage.id === activeLanguageId}
            />
          ))}
        </ul>
        {this.renderLanguageContainerDetails()}
      </div>
    )
  }
}

export default GithubPopularRepos
