const SkillsData = props => {
  const {product} = props
  const {name, imageUrl} = product
  return (
    <li>
      <img src={imageUrl} alt={name} />
      <p>{name}</p>
    </li>
  )
}

export default SkillsData
