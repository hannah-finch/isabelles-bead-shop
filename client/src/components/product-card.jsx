import { Link } from 'react-router-dom'

import '../assets/css/product-card.css'
import exampleData from '../assets/example-data.json'

function ProductCard() {
  const Card = (exampleData.products.map((product) => {
    return (
      <Link to={`/product/${product.id}`} key={product.id} data-category={product.category} data-stock={product.quantity}>
        <div className="product-card">
          <div className="product-image"></div>
          <p>{product.name}</p>
          <p>${product.price}</p>
        </div>
      </Link>
    )
  }));
  return(Card)
  }


export default ProductCard;