const SimilarJobs = props => {
  const {product} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = product
  return (
    <li>
      <img src={companyLogoUrl} alt="similar job company logo" />
      <h1>{title}</h1>
      <p>{employmentType}</p>
      <p>{rating}</p>
      <h1>Description</h1>
      <p>{jobDescription}</p>
      <p>{location}</p>
    </li>
  )
}

export default SimilarJobs
