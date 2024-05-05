import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

import './index.css'

const activeConstantsView = {
  initialView: 'INITIAL',
  progressView: 'PROGRESS',
  successView: 'SUCCESS',
  failureView: 'FAILURE',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    activeLanguage: languageFiltersData[0].id,
    reposItems: [],
    activeView: activeConstantsView.initialView,
  }

  componentDidMount() {
    this.getReposItem()
  }

  getReposItem = async () => {
    const {activeLanguage} = this.state
    this.setState({
      activeView: activeConstantsView.progressView,
    })
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeLanguage}`,
    )
    const data = await response.json()

    console.log(data)

    if (response.ok) {
      const updatedData = data.popular_repos.map(eachData => ({
        avatarUrl: eachData.avatar_url,
        forksCount: eachData.forks_count,
        id: eachData.id,
        issuesCount: eachData.issues_count,
        name: eachData.name,
        starsCount: eachData.stars_count,
      }))

      this.setState({
        reposItems: updatedData,
        activeView: activeConstantsView.successView,
      })
    } else {
      this.setState({
        activeView: activeConstantsView.failureView,
      })
    }
  }

  onSetLanguageFilter = id => {
    this.setState(
      {
        activeLanguage: id,
      },

      this.getReposItem,
    )
  }

  renderSuccesView = () => {
    const {reposItems} = this.state
    return (
      <ul className="popular-repos-lists">
        {reposItems.map(eachRepos => (
          <RepositoryItem reposDetails={eachRepos} key={eachRepos.id} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
        alt="failure view"
        className="failure-view-img"
      />
      <h1 className="failure-view-text">Something Went Wrong</h1>
    </>
  )

  renderProgressView = () => (
    <>
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
      </div>
    </>
  )

  renderOutput = () => {
    const {activeView} = this.state

    switch (activeView) {
      case 'PROGRESS':
        return this.renderProgressView()
      case 'SUCCESS':
        return this.renderSuccesView()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return ''
    }
  }

  render() {
    const {activeLanguage} = this.state
    return (
      <div className="app-container">
        <div className="popular-repos-container">
          <h1 className="popular-heading">Popular</h1>
          <ul className="languageFiltersData-lists">
            {languageFiltersData.map(eachLanguage => (
              <LanguageFilterItem
                languageFilterDetails={eachLanguage}
                key={eachLanguage.id}
                onSetLanguageFilter={this.onSetLanguageFilter}
                isActive={eachLanguage.id === activeLanguage}
              />
            ))}
          </ul>
          {this.renderOutput()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
