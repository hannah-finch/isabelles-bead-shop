import { Link } from 'react-router-dom'

import exampleData from '../assets/example-data.json'

function ProductCard() {
  const Card = (exampleData.products.map((product) => {
    return (
      <Link to={`/product/${product.id}`} key={product.id} data-category={product.category} data-stock={product.quantity}>
        <div>
        <p>{product.name}</p>
        <p>{product.price}</p>
        <h1>thing</h1>
        </div>
      </Link>
    )
  }));
  return(Card)
  }


export default ProductCard;