var cart = [];

var Item = function(nameParameter,priceParmeter,countParameter){
    this.name = nameParameter
    this.price = priceParmeter
    this.count = countParameter
};
//nameParameter,priceParmeter,countParameter
function addItemToCart(nameParameter,priceParmeter,countParameter){
    for (var i in cart){
        if (cart[i].name === nameParameter) {
            cart[i].count += countParameter;
            return;
        }
    }
    var item = new Item(nameParameter,priceParmeter,countParameter);
    cart.push(item);
}
addItemToCart('Apple',1.50,1);
addItemToCart('Apple',1.50,1);
addItemToCart('Apple',1.50,3);
addItemToCart('Pear',1.75,1);

console.log(cart);
console.log(cart[0]);
console.log(cart[0].name);


//Removes part of item, ex) if there are 3 apples then remove only one apple
function removeItemFromCart(nameParameter,priceParmeter,countParameter){

}
//Remove whole particular item
function removeItemFromCartAll(nameParameter,priceParmeter,countParameter){

}
//Don't remove the item from cart but just clear
function clearCart(){

}
//return total number of cart
function countCart(){

}
//return total amount of cost of cart
function totalCart(){

}
//display array of Item into HTML
function listCart(){

}
//save the cart evenif they are not actually buying
function saveCart(){

}
//
function loadCart(){

}
