import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import './Products.css'

export function ItemBox({ item }) {
  return (
    <div className="ItemBox">
      <img src={item.img} alt="product" />
      <Link to={`/products/${item.id}`}>
        <h5>{item.name}</h5>
      </Link>
      <div className="itemBoxSubDiv">
        <span>₹{item.price}</span>
        <span>★{item.rating}</span>
      </div>
    </div>
  );
}

function Products(props) {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    // Fetch products from the back-end server
    try {
      axios.get('http://localhost:3000/products').then((response) => {
        setProducts(response.data);
      });
    } catch (error) {
      console.error(error); // Log the error for debugging
      // Handle the error appropriately, such as displaying an error message
    }
  }, []);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    // Filter products on search term change
    const filteredProducts = products.filter((item) => item.name.toLowerCase().includes(searchTerm));
    setProducts(filteredProducts);
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);

    // Filter products on category change
    const filteredProducts = selectedCategory === '' ? products : products.filter((item) => item.gender === selectedCategory);
    setProducts(filteredProducts);
  };

  console.log(products)

  return (
    <div className="products-page">
      <div className="categorySelector">
        <form id="categoryAndSearchForm">
          <input
            type="search"
            id="searchBox"
            placeholder="Search Products"
            onChange={handleSearchChange}
          />
          <label>Category:</label>
          <div className="categoryRadioButtons">
            <input
              type="radio"
              name="category"
              value=""
              checked={selectedCategory === ''}
              onChange={handleCategoryChange}
            />
            <label htmlFor="all">All</label>
            <br />
            <input
              type="radio"
              name="category"
              value="Men"
              checked={selectedCategory === 'Men'}
              onChange={handleCategoryChange}
            />
            <label htmlFor="Men">Men</label>
            <br />
            <input
              type="radio"
              name="category"
              value="Women"
              checked={selectedCategory === 'Women'}
              onChange={handleCategoryChange}
            />
            <label htmlFor="Women">Women</label>
            <br />
            <input
              type="radio"
              name="category"
              value="Unisex"
              checked={selectedCategory === 'Unisex'}
              onChange={handleCategoryChange}
            />
            <label htmlFor="Unisex">Unisex</label>
          </div>
        </form>
      </div>

      {products.length > 0 ? (
        <div className="products-container">
          {products.map((product) => 
          (
            <ItemBox key={product.id} item={product} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default Products;