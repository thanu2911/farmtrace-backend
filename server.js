const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());


// Load products data
let products = require("./products.json");


// Home route
app.get("/", (req, res) => {
    res.send("FarmTrace Backend Running");
});


// Get all products
app.get("/products", (req, res) => {
    res.json(products);
});


// Get product by ID (QR scan uses this)
app.get("/products/:id", (req, res) => {

    const product = products.find(
        (item) => item.id === req.params.id
    );


    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }


    res.json(product);
});


// Add new product
app.post("/products", (req, res) => {

    const product = req.body;


    products.push(product);


    // Save permanently into products.json
    fs.writeFileSync(
        "./products.json",
        JSON.stringify(products, null, 2)
    );


    res.json({
        message: "Product Saved",
        product
    });

});


// Server start
app.listen(5000, () => {
    console.log("Server running on port 5000");
});