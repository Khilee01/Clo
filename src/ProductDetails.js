import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';
import { useCartContext } from './App';
import axios from 'axios';

function ProductDetails() {
  const { cart, setCart } = useCartContext();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  console.log(id)

  useEffect(() => {
    // Fetch product details from the back-end server
    axios.get(`http://localhost:3000/products?id=${id}`).then((response) => {
      const reply = response.data
      setProduct(reply[0]);
    });
  }, [id]);

  function addTheItemToCartContext(productId) {
    const updatedCart = [...cart];
    const existingProductIndex = updatedCart.findIndex(cartItem => cartItem.id === productId);

    if (existingProductIndex >= 0) {
      updatedCart[existingProductIndex].quantity += 1;
    } else {
      updatedCart.push({ id: productId, quantity: 1 });
    }

    setCart(updatedCart);
  }
  console.log(product)
  return (
    product ?
      <div className="ProductDetails">
        <div id="productImgContainer">
          <img src={product.img} alt={product.name} />
        </div>

        <div id="mainProductDetails">
          <div id="sellerDetails">
            <div>{product.seller}</div>
            <h1>{product.name}</h1>

            <div id="ratingContainer">
              <div>Rating: {parseFloat(product.rating).toFixed(2)} ★</div><br />
              <div id="totalRatingContainer">Total ratings: {product.ratingTotal}</div>
            </div>
          </div>

          <div id="productDetails">
            <div>
              MRP: <s>₹{product.mrp}</s> (Including all taxes.) Discount: {product.discount}%
            </div>
            <div>Price: ₹{product.price}</div>
          </div>

          <div>
            Pay on delivery is available
            <br />
            Easy 14 days returns and exchanges
            <br />
            Try & Buy might be available depending on the product
          </div>

          <button id="addToCartButton" onClick={() => addTheItemToCartContext(product.id)}>
            Add to Cart
          </button>
        </div>
      </div> :
      <div>Loading product details...</div>
  );
}

export default ProductDetails;
