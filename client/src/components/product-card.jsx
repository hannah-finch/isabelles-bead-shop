import exampleData from '../assets/example-data.json'

function ProductCard() {
  const Card = (exampleData.products.map((product, index) => {
    return (
      <div key={index}>
        <p>{product.name}</p>
        <p>{product.category}</p>
        <p>{product.description}</p>
        <p>{product.quantity}</p>
        <p>{product.price}</p>
        <h1>thing</h1>
      </div>
    )
  }));
  return(Card)
  }


export default ProductCard;