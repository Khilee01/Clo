import './UserCart.css';
import { cartContext } from './App';
import products from './test/items.json';
import { useContext, useEffect, useState } from 'react';
import { ItemBox } from './Products';
import './ProductDetails.css';
import DummyCheckout from './DummyCheckout';
import { Link } from 'react-router-dom';
var total = 0

function RetrieveCart() {
  const [items, setItems] = useState([]); // Initialize items as an empty array
  const { cart, setCart } = useContext(cartContext); // Destructure cart from cartContext
  useEffect(() => {
    // Map over cart items and update items array
    const updatedItems = cart.map((e) => ({ id: e.id, quantity: e.quantity }));
    setItems(updatedItems);
  }, [cart]); // Re-run useEffect whenever cart changes

  return items;
}

function CheckoutButton(props) {
  return (
    <>      
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,200,0,0" />
    <Link to={`/checkout`}>
    <button className='addToCartButton' id='checkoutButton'>
      Checkout
      <span className="material-symbols-outlined">
      shopping_cart_checkout
      </span>
    </button>
    </Link>
    </>
  )
}
function RowDetails({ item }) {
  const { cart, setCart } = useContext(cartContext);

  function handleChange(event) {
    const newQuantity = parseInt(event.target.value);
    ChangeCartQuantity(newQuantity);
  }

  async function ChangeCartQuantity(newQuantity) {
    // Find the corresponding cart item and update its quantity
    if(newQuantity === '') {
      newQuantity = 0
    }
    const updatedCart = [...cart];
    const cartItemIndex = updatedCart.findIndex((cartItem) => cartItem.id === item.id);

    if (cartItemIndex !== -1) {
      updatedCart[cartItemIndex].quantity = newQuantity;
      setCart(updatedCart);
    }
  }

  return (
    <div id="rowDetails">
      <p>{item.name} <br />₹{item.price}&nbsp;x&nbsp;<input id={`quantityHandle_${item.id}`} type="number" value={item.quantity} onChange={handleChange} min={1} max={10} /></p>
    </div>
  );
}

function calculateTotalCost(allItems) {
  var total = 0;
  allItems.map((item) => {
    total = total + (item.quantity * item.price)
  })

  return total
}

export default function UserCart() {
  const items = RetrieveCart(); // Call RetrieveCart to get updated items
  const [itemDetails, setItemDetails] = useState([]); // Initialize itemDetails as an empty array

  useEffect(() => {
    const newMatchingProducts = []; // Create a temporary array to store matching products

    for (const item of items) {
      const matchingProduct = products.find((product) => product.id === item.id);
      if (matchingProduct) {
        newMatchingProducts.push({
          ...matchingProduct, // Copy all product properties
          quantity: item.quantity, // Add quantity from cart item
        });
      }
    }

    setItemDetails(newMatchingProducts); // Update matchingProducts with the new array
  }, [items]); // Re-run useEffect whenever items changes
  total = calculateTotalCost(itemDetails)

  return (
    items.length > 0 ? (
      <div className='userCartContainer'>
        <div id='productsAddedToCart'>
        {itemDetails.map((item) => <ItemBox key={item.id} item={item} />)}
        </div>
        <div id='checkoutFromCart'>
        <h1>Total Cost</h1>
           {itemDetails.map((item) => <RowDetails key={item.id} item={item} />)}  
           <h4>Total: ₹{total}</h4>
           <CheckoutButton finalPrice={total} />
        </div>
      </div>
    ) : (
      <div id='cartIsEmpty'>
        Oops, Seems like you haven't added anything to the cart yet!
      </div>
    )
  );
}

export var total