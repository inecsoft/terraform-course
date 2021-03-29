var faker = require('faker');

exports.handler = function(event, context){
  // return an array of 10 items in inventory
  // include product name, color, description
  // size, and price
  var inventory = [];
  for (var i = 0; i < 10; i++){
    var myShoe = getMyShoe();
    var item = {};
    item.name = getShoeName(myShoe);
    item.color = getShoeColor();
    item.description = getShoeDescription(myShoe);
    item.size = getShoeSize();
    item.price = getShoePrice();
    inventory.push(item);
  }
  context.succeed(inventory);
}

function getMyShoe() {
  var shoeType = [
    "running shoe",
    "cross-training shoe",
    "tennis shoe",
    "basketball shoe",
    "aerobic shoe",
    "spinning shoe"
  ]
  return shoeType[getNum(0, 5)];
}

function getShoeName(myShoe){
  return faker.company.catchPhraseNoun() + " " + faker.company.catchPhraseDescriptor() + " " + myShoe;
}

function getShoeColor() {
  return faker.commerce.color();
}

function getShoeDescription(myShoe) {
  return "A(n) " + faker.commerce.productAdjective() + ", " + faker.commerce.productAdjective() +
  " " + myShoe + " made from the finest " + faker.commerce.productMaterial() +
  " designed for the " + faker.company.bsBuzz() + " individual!"
}

function getShoeSize() {
  return getNum(1, 13);
}

function getShoePrice() {
  return faker.commerce.price();
}

function getNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
