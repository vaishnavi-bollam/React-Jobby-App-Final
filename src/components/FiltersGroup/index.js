import {BsSearch} from 'react-icons/bs'
import './index.css'

const FiltersGroup = props => {
  const renderEmploymentType = () => {
    const {employmentTypesList, changeEmployee} = props
    // console.log(employmentTypesList)

    return employmentTypesList.map(eachEmployeeType => {
      const onClickEmployItem = () =>
        changeEmployee(eachEmployeeType.employmentTypeId)

      return (
        <ul>
          <li
            key={eachEmployeeType.employmentTypeId}
            onClick={onClickEmployItem}
          >
            {/* <p>{eachEmployeeType.employmentTypeId}</p> */}
            <label htmlFor="check">
              <input type="checkbox" id="check" />
              {/* {eachEmployeeType.employmentTypeId} */}
              {eachEmployeeType.label}
            </label>
          </li>
        </ul>
      )
    })
  }

  const renderSalaryRange = () => {
    const {salaryRangesList, changeSalary} = props
    console.log(salaryRangesList)

    return salaryRangesList.map(eachSalaryType => {
      const onClickSalaryType = () => changeSalary(eachSalaryType.salaryRangeId)

      return (
        <ul>
          <li key={eachSalaryType.salaryRangeId} onClick={onClickSalaryType}>
            <label htmlFor="radio">
              <input type="radio" id="radio" />
              {eachSalaryType.label}
            </label>
          </li>
        </ul>
      )
    })
  }

  const onEnterSearchInput = event => {
    const {enterSearchInput} = props
    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }

  const onChangeSearchInput = event => {
    event.preventDefault()
    const {changeSearchInput} = props
    changeSearchInput(event.target.value)
  }

  const renderSearchInput = () => {
    const {searchInput} = props
    return (
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          placeholder="Search"
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <BsSearch className="search-icon" data-testid="searchButton" />
      </div>
    )
  }

  const renderUserInfo = () => {
    const {profileData} = props
    const {name, profileImageUrl, shortBio} = profileData
    return (
      <div className="profile-container">
        <h1>{name}</h1>
        <img src={profileImageUrl} alt="profile" />
        <p>{shortBio}</p>
      </div>
    )
  }

  return (
    <div>
      <ul>{renderSearchInput()}</ul>
      <div>{renderUserInfo()}</div>
      <h1>Type of Employment</h1>

      <ul>{renderEmploymentType()}</ul>
      <h1>Salary Range</h1>
      <ul>{renderSalaryRange()}</ul>
    </div>
  )
}

export default FiltersGroup
