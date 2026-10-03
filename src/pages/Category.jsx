import { useParams } from 'react-router-dom'
import Shop from './Shop'

function CategoryListing() {
  const { slug } = useParams()
  return <Shop category={slug.replaceAll('-', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())} />
}

export default CategoryListing
