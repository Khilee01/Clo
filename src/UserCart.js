import './UserCart.css';
import { cartContext } from './App';
import products from './test/items.json';
import { useContext, useEffect, useState } from 'react';
import { ItemBox } from './Products';

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

function RowDetails({item}) {
  return (
    <div id='rowDetails'>
      <p>{item.name} <br />₹{item.price} x {item.quantity}</p>
    </div>
  )
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
  console.log(itemDetails)

  

  return (
    <div className="userCartContainer">
      <div id="productsAddedToCart">
        {items.length > 0 ? (
          // Check if items is not empty before mapping
          itemDetails.map((item) => <ItemBox key={item.id} item={item} />)
        ) : (
          <h1 id='addSomeItemsMessage'>No items in cart</h1>
        )}
      </div>
      <div id="checkOutFromCart">
        {items.length > 0 ? (
          <div id='subDivCheckoutFromCart'>
          <h1>Total Cost</h1>
          {itemDetails.map((item) => <RowDetails key={item.id} item={item} />)}  
          <h4>Total: ₹{calculateTotalCost(itemDetails)}</h4>
          </div>
        )
        : (<h3 id='addSomeItemsMessage'>Add some items to your cart</h3>)}
      </div>
    </div>
  );
}