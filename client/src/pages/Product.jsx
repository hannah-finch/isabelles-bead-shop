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
      return 'OUT OF STOCK'
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
          <InStock />
          <p>Price: <span className="price">${price}</span></p>

        </div>
      </section>



    <h2>{name}</h2>


    <p>{category}</p>
    <p>{description}</p>
    <p>{image.url}</p>

    <p>{price}</p>


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