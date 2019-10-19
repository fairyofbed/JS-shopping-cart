$(".add-to-cart").click(function (event) {
    event.preventDefault();
    var name = $(this).attr("data-name");
    var price = Number($(this).attr("data-price"));

    additem(name, price, 1);
    displayCart();
});

//displayCart();
function displayCart() {
    console.log('displayCart()')
    var cartArray = listcart();
    var output = "";
    for (var i in cartArray) {
        output += "<li>" + cartArray[i].name + " " + cartArray[i].count + "</li>"
    }
    $("#show-cart").html(output);
    $("#total-cart").html( totalcart() );
}
//displayCart();
//******************************************************************8
//Shopping Cart function
var cart = [];
var Item = function (name, price, count) {
    this.name = name
    this.price = price
    this.count = count
};

function additem(name, price, count) {
    for (var i in cart) {
        if (cart[i].name == name) {
            cart[i].count += count;
            savecart();
            return;
        }
    }

    var item = new Item(name, price, count);
    cart.push(item);
    savecart();
}
additem('Apple',3.20,1);
additem('Banana',3.30,1);
additem('Shoe',30,1);
additem('Frisbee',35.90,1);

// console.log(cart);
//   console.log( cart[0] )
//  console.log( cart[0].name);

//addItemToCart(name, price, count)
function removeitemFromCart(name) { //remove one item from cart
    for (var i in cart) {
        if (cart[i].name == name) {
            cart[i].count--;
            if (cart[i].count == 0) {
                cart.splice(i, 1);
            }
            break;
        }
    }
    savecart();
}

function removeAllItemFromCart(name) { //remove all item from cart(name)
    for (var i in cart) {
        if (cart[i].name == name) {
            cart.splice(i, 1);
            break;
        }
    }
    savecart();
}

function clearitem() {
    cart = [];
    savecart();
}

function countcart() { //return total count
    var totalcount = 0;
    for (var i in cart) {
        totalcount += cart[i].count;
    }
    return totalcount;
}

//console.log(countcart());

function totalcart() { //return total cost 
    var totalCost = 0;
    for (var i in cart) {
        totalCost += cart[i].price * cart[i].count;
    }
    return totalCost;
}
//console.log(totalcart());

function listcart() {
    var cartCopy = [];
    for (var i in cart) {
        var item = cart[i];
        var itemCopy = {};
        for (var p in item) {
            itemCopy[p] = item[p];
        }
        cartCopy.push(itemCopy);
    }
    return cartCopy;
}

function savecart() {
    localStorage.setItem("ShoppingCart", JSON.stringify(cart));
}

function loadcart() {
    console.log('loadcart()');
    cart = JSON.parse(localStorage.getItem ("ShoppingCart") );
    if (cart === null) {  // * check the cart is not null
        cart = []; 
    }
}
loadcart();
displayCart();
