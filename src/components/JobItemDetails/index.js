import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import SkillsData from '../SkillsData/index'
import SimilarJobs from '../SimilarJobs/index'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    eachJobList: [],
    apiStatus: apiStatusConstants.initial,
    skillsData: [],
    similarJobsData: [],
  }

  componentDidMount() {
    this.getJobsData()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    description: data.life_at_company.description,
    imageUrl: data.life_at_company.image_url,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
  })

  getJobsData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData.similar_jobs)
      const updatedData = this.getFormattedData(fetchedData.job_details)
      const updatedSkillsData = fetchedData.job_details.skills.map(
        eachSkill => ({
          name: eachSkill.name,
          imageUrl: eachSkill.image_url,
        }),
      )
      const updatedSimilarJobs = fetchedData.similar_jobs.map(
        eachSimilarJob => ({
          companyLogoUrl: eachSimilarJob.company_logo_url,
          employmentType: eachSimilarJob.employment_type,
          id: eachSimilarJob.id,
          jobDescription: eachSimilarJob.job_description,
          location: eachSimilarJob.location,
          rating: eachSimilarJob.rating,
          title: eachSimilarJob.title,
        }),
      )

      this.setState({
        eachJobList: updatedData,
        apiStatus: apiStatusConstants.success,
        skillsData: updatedSkillsData,
        similarJobsData: updatedSimilarJobs,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobsListView = () => {
    const {eachJobList, skillsData, similarJobsData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      description,
      imageUrl,
      location,
      packagePerAnnum,
      rating,
      title,
    } = eachJobList
    return (
      <div>
        <h1>{title}</h1>
        <img src={companyLogoUrl} alt="job details company logo" />
        <p>{rating}</p>
        <p>{employmentType}</p>
        <p>{packagePerAnnum}</p>
        <hr />
        <h1>Description</h1>
        <p>{jobDescription}</p>
        <p>{location}</p>
        <h1>Life at Company</h1>
        <a href={companyWebsiteUrl}>Visit</a>
        <h1>Skills</h1>

        <ul>
          {skillsData.map(product => (
            <SkillsData product={product} key={product.name} />
          ))}
        </ul>
        <ul>
          <h1>About Us</h1>
          <img src={imageUrl} alt="life at company" />
          <p>{description}</p>
        </ul>
        <h1>Similar Jobs</h1>
        <ul>
          {similarJobsData.map(product => (
            <SimilarJobs product={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <p>We cannot seem to find the page you are looking for</p>
      <button>Retry</button>
      {this.getJobsData()}
    </div>
  )

  renderEachJob = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderEachJob()}</div>
  }
}

export default JobItemDetails
