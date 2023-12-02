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
        <h3>{item.name}</h3>
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

  // const handleCategoryChange = (event) => {
  //   const selectedCategory = event.target.value;
  //   setSelectedCategory(selectedCategory);
  //   console.log(selectedCategory)
  //   // Filter products on category change
  //   const filteredProducts = selectedCategory === '' ? products : products.filter((item) => item.gender == selectedCategory);
  //   setProducts(filteredProducts);
  // };
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
      <div className="categorySelector">
        <form id="categoryAndSearchForm">
          <label>Category</label>
          <div className="categoryRadioButtons">
            <div className='labelRadioGroup'>
              <input
                type="radio"
                name="category"
                className='radioButtons'
                value="Men"
                checked={selectedCategory === 'Men'} // Check if the selected category is 'Men'
                onChange={handleCategoryChange}
              />
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
              <div className='labelRadioGroup'>
              <input
                type="radio"
                name="category"
                className='radioButtons'
                value="Boy"
                checked={selectedCategory === 'Boy'} // Check if the selected category is 'Unisex'
                onChange={handleCategoryChange}
              />
              <label htmlFor="Boy">Boy</label>
              </div>
              <div className='labelRadioGroup'>
              <input
                type="radio"
                name="category"
                className='radioButtons'
                value="Girl"
                checked={selectedCategory === 'Girl'} // Check if the selected category is 'Unisex'
                onChange={handleCategoryChange}
              />
              <label htmlFor="Girl">Girl</label>
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