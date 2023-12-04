import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import _ from 'lodash';
import './Products.css'

export function ItemBox({ item }) {
  return (
    <div className="ItemBox">
      <img src={item.img} alt="product" />
      <Link to={`/products/${item.id}`}>
        <span id='itemNameSpan'>{item.name}</span>
      </Link>
      <div className="itemBoxSubDiv">
        <div id='priceAndMrpDiv'>
        <span>₹{item.price}</span>
        <span id='mrpStrikeThroughSpan'>₹<s>{item.mrp}</s></span>
        </div>
        <span id='discountSpanProducts'>({item.discount}% off)</span>
      </div>
    </div>
  );
}

function Products(props) {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState();

  useEffect(() => {
    if (products.length === 0 || selectedCategory !== '') {
      // Fetch products from the back-end server
      try {
        axios.get('http://localhost:3000/products').then((response) => {
          setProducts(response.data);
        });
      } catch (error) {
        console.error(error); // Log the error for debugging
        // Handle the error appropriately, such as displaying an error message
      }
    }
    setSelectedCategory('')

  }, [products, selectedCategory]);  
  

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    // Filter products on search term change
    const filteredProducts = products.filter((item) => item.name.toLowerCase().includes(searchTerm));
    setProducts(filteredProducts);
  };

  const handleCategoryChange = (event) => {
    const newSelectedCategory = event.target.value;
    const selectedCategory = newSelectedCategory === 'all' ? '' : newSelectedCategory;
  
    if (selectedCategory !== newSelectedCategory) {
      setSelectedCategory(selectedCategory);
    }
  
    const filteredProducts = selectedCategory === ''
      ? products
      : products.filter((item) => item.gender === selectedCategory);
  
    if (!_.isEqual(products, filteredProducts)) {
      setProducts(filteredProducts);
    }
  };  

  console.log(products)

  return (
    <div className="products-page">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <div className="categorySelector">
        <form id="categoryAndSearchForm">
          <div class="search">
          <span class="material-symbols-outlined">
            search
          </span>
            <input onInput={handleSearchChange} type="text" class="searchTerm" placeholder="What are you looking for?"/>
          </div>
          <span id='plainCategoryText'>Category</span>
          <div className="categoryRadioButtons">
            <div className='labelRadioGroup'>
              <input
                type="radio"
                name="category"
                className='radioButtons'
                value="Men"
                checked={selectedCategory === 'Men'} // Check if the selected category is 'Men'
                onChange={handleCategoryChange}
              ></input>
              <label htmlFor="Men">Men</label>
              </div>
              <div className='labelRadioGroup'>
              <input
                type="radio"
                name="category"
                className='radioButtons'
                value="Women"
                checked={selectedCategory === 'Women'} // Check if the selected category is 'Women'
                onChange={handleCategoryChange}
              />
              <label htmlFor="Women">Women</label>
              </div>
              <div className='labelRadioGroup'>
              <input
                type="radio"
                name="category"
                className='radioButtons'
                value="Unisex"
                checked={selectedCategory === 'Unisex'} // Check if the selected category is 'Unisex'
                onChange={handleCategoryChange}
              />
              <label htmlFor="Unisex">Unisex</label>
              </div>
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