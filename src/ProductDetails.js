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
            <h2>{product.name} <br /></h2><span id='sellerSpan'> by ({product.seller})</span>

            <div id="ratingContainer">
            <div id="totalRatingContainer"><span id='innerRating'>Rating: {parseFloat(product.rating).toFixed(2)}★&nbsp;</span><br />
            &nbsp;Total ratings: {product.ratingTotal}</div>
            </div>
          </div>

          <div id="productDetails">
            <div>
            <span id='productPriceSpan'>₹{product.price}&nbsp;&nbsp;&nbsp;</span><span id='mrpSpan'>MRP <s>₹{product.mrp}</s></span><br /><span id='discountSpan'>{product.discount}% OFF!</span>
            <br />
            <span id='inclusiveTaxesSpan'>Inclusive of all taxes</span>
            </div>
          </div>

          <div id='randomDetails'>
            Pay on delivery is available
            <br />
            Easy 14 days returns and exchanges
            <br />
            Try & Buy might be available depending on the product
          </div>

          <button className="addToCartButton" onClick={() => addTheItemToCartContext(product.id)}>
            Add to Cart
          </button>
        </div>
      </div> :
      <div>Loading product details...</div>
  );
}

export default ProductDetails;
