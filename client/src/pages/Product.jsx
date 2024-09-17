import { useParams } from 'react-router-dom'
 
import exampleData from '../assets/example-data.json'

function ProductPage() {
  // get product id from url
  const { productId } = useParams();
  // get product from json by id (get from db later)
  const [ product ] = exampleData.products.filter( p => p.id === productId )
  // destructure it
  const { id, category, description, image, quantity, price, name }  = product

  return (
    <>
    <h2>Product page</h2>

    <p>{id}</p>
    <p>{category}</p>
    <p>{description}</p>
    <p>{image.url}</p>
    <p>{quantity}</p>
    <p>{price}</p>
    <p>{name}</p>

    </>
  )
};

export default ProductPage;