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
    <div>
      <img src={companyLogoUrl} />
      <h1>{title}</h1>
      <p>{employmentType}</p>
      <p>{rating}</p>
      <h1>Description</h1>
      <p>{jobDescription}</p>
      <p>{location}</p>
    </div>
  )
}

export default SimilarJobs
