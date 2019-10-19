$('.add-to-cart').click( function( event ){
    event.preventDefault();
    var name = $(this).attr('data-name');
    var price = Number( $(this).attr('data-price') );

    addItemToCart(name,price,1);
    displayCart();
});

function displayCart() {
    console.log('*** Display Cart ***');
    var cartArray = listCart();
    console.log('*** Count Cart: '+cartArray.length);
    var output = '';
    for (var i in cartArray) {
        output += '<li>'+cartArray[i].name+' '+ cartArray[i].count + '<li>'
    }
    $('#show-cart').html(output);
}

/*************************************** */
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
    saveCart();
}
addItemToCart('Pear',1.75,1);
addItemToCart('Apple',1.50,3);
addItemToCart('Apple',1.50,1);
addItemToCart('Apple',1.50,1);
addItemToCart('Banana',2.50,1);
addItemToCart('WaterMelon',5.50,1);
//Removes part of item, ex) if there are 3 apples then remove only one apple
function removeItemFromCart(nameParameter){
    for (var i in cart){
        if (cart[i].name === nameParameter){
            cart[i].count -=1;
            if (cart[i].count === 0) {
                cart.splice(i,1);
            }
            break; 
        }
    }
    saveCart();
}

//Remove whole particular item
function removeItemFromCartAll(nameParameter){
    for (var i in cart){
        if(cart[i].name = nameParameter){
            cart.splice(i,1);
            break;
        }
    }
    saveCart();
}

//Don't remove the item from cart but just clear
function clearCart(){
    cart = [];
    saveCart();
}
//return total number of cart
function countNumCart(){
    var totalCount = 0;
    for (var i in cart){
        console.log(cart[i].count);
        totalCount += cart[i].count;
    }
    return totalCount;
}

//return total cost of cart
function totalCostCart(){
    var totalCost = 0
    for (var i in cart){
        totalCost += cart[i].price;
    }
    return totalCost;
}

//display array of Item into HTML
//make duplication of cart[] into cartCopy[]
function listCart(){
    var cartCopy = [];
    for (var i in cart){
        var item = cart[i];
        var itemCopy = {};
        for (var p in item){
            itemCopy[p] = item[p];
        }
        cartCopy.push(itemCopy);
    }
    return cartCopy;
    // return cart;
}

function saveCart(){
    localStorage.setItem( 'shoppingCart',JSON.stringify(cart) );
}

localStorage.setItem('age',33);
function loadCart(){
    cart = JSON.parse( localStorage.getItem('shoppingCart') );
}
loadCart();
displayCart();
var array = listCart();
console.log('-----------------');
console.log(array);