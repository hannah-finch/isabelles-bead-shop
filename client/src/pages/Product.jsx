import { useParams } from 'react-router-dom'
 
import exampleData from '../assets/example-data.json'

function ProductPage() {
  // get product id from url
  const { productId } = useParams();
  // get product from json by id (get from db later)
  const [ product ] = exampleData.products.filter( p => p.id === productId )
  // destructure it
  const { id, category, description, image, quantity, price, name }  = product

  const InStock = (() => {
    if (quantity < 0) {
      return 'OUT OF STOCK'
    } else {
      return
    }
  })

  return (
    <>
      <section className="product-section">
        <figure className="product-img">
          <img src="/images/tempPictures/IMG_4268.jpg"></img>
        </figure>

        <div className="product-info">
          <h2>{name}</h2>
          <p>Price: <span className="price">${price}</span> <InStock /> </p>
          <p>{description}</p>
          {/* TODO: Make a dropdown or arrow selection thing to select quantity to add to cart */}
          <p>Quantity:</p>

          <div className="button-container">
            <button className="btn-1">Add to Cart</button>
            <button className="btn-2">Leave a Review</button>

          </div>

        </div>
      </section>

{/* I put some product info here just in case we want it to show if admin is logged in */}
    <div>
      Product info for Admin: <br></br>
      Number in stock: {quantity} <br></br>
      Product id: {id}
    </div>

    </>
  )
};

export default ProductPage;