const express = require("express");
const validator = require("validator");
const app = express();

const collectibles = [
  { name: "shiny ball", price: 5.95 },
  { name: "autographed picture of a dog", price: 10 },
  { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
];

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" },
];

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

app.get("/greetings/:userName", (req, res) => {
  res.send(`Hello there, ${req.params.userName}`);
});

app.get("/roll/:number", (req, res) => {
  const userNum = req.params.number;
  if (validator.isNumeric(userNum) === false) {
    res.send("You must specify a number");
  } else {
    res.send(`${Math.floor(Math.random() * userNum)}`);
  }
});

app.get("/collectibles/:index", (req, res) => {
  const userIdx = req.params.index;
  const validParams = ["0", "1", "2"];
  if (!validParams.includes(userIdx)) {
    res.send("This item is not yet in stock. Check back soon!");
  } else {
    res.send(
      `So you want the ${collectibles[userIdx].name}? For just ${collectibles[userIdx].price}, it can be yours!`
    );
  }
});

app.get("/shoes", (req, res) => {
  const minPrice = req.query["min-price"];
  const maxPrice = req.query["max-price"];
  const type = req.query.type;
  const filteredShoes = shoes.filter((shoe) => {
    return (
      (shoe.price > minPrice || !minPrice) &&
      (shoe.price < maxPrice || !maxPrice) &&
      (shoe.type === type || !type)
    );
  });
  res.send(filteredShoes);
});
