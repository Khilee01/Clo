const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors')
// Load product data from JSON file
const data = JSON.parse(fs.readFileSync('../test/items.json'));
app.use(cors());

const headers = {
  "Content-Type": "application/json",
}
//app.use(cors)
// Define a route to fetch products
app.get('/products', (req, res) => {
  console.log(data)
  const searchTerm = req.query.searchTerm || '';
  const selectedCategory = req.query.selectedCategory || '';
  const productId = parseInt(req.query.id) || null;

  const filteredProducts = data.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(searchTerm);
    const categoryMatch = selectedCategory === '' || item.gender === selectedCategory;
    const idMatch = productId === null || item.id == productId;

    return nameMatch && categoryMatch && idMatch
  });

  res.json(filteredProducts);
});

app.get('/', () => {
  console.log(data)
})

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

