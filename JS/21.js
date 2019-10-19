// $('#show-cart','.add-to-cart').on('click', '.plus-item', function( event ){
$('.add-to-cart').click( function( event ){
    event.preventDefault();
    var name = $(this).attr('data-name');
    var price = Number( $(this).attr('data-price') );

    addItemToCart(name,price,1);
    displayCart();
});

//delete item completely if press the button
//#show-cart is parent tag of button class="delete-item"
$('#show-cart').on('click', '.delete-item', function(event){
    var name = $(this).attr('data-name');
    removeItemFromCartAll(name); // '(name)' this is not a parameter it is argument
    displayCart();
} );

//subtract the number of count of item if press the button
//#show-cart is parent tag of button class="subtract-item"
$('#show-cart').on('click', '.subtract-item', function(event){
    var name = $(this).attr('data-name');
    removeItemFromCart(name); // '(name)' this is not a parameter it is argument
    displayCart();
} );

// plus
$('#show-cart').on('click', '.plus-item', function( event ){
    var name = $(this).attr('data-name');
    // var price = Number( $(this).attr('data-price') );

    // addItemToCart(name,price,1);
    addItemToCart(name,0,1);
    displayCart();
} );

$('#choose-section').on('click', '#clear-cart', function( event ){
    var name = $(this).attr('data-name');
    clearCart();
    displayCart();
} );


function displayCart() {
    var cartArray = listCart();
    output = '';
    for (var i in cartArray) {
        output += '<li>'
        + cartArray[i].name+' '
        + cartArray[i].count + ' ' 
        + cartArray[i].totalCost.toFixed(2) 
        + " <button class= 'plus-item' data-name='"+cartArray[i].name+"'> + </button> "
        + " <button class= 'subtract-item' data-name='"+cartArray[i].name+"'> - </button> "
        + " <button class= 'delete-item' data-name='"+cartArray[i].name+"'> X </button> "
        + '<li>';
    }
    $('#show-cart').html(output);
    $('#total-cost-cart').html( totalCostCart() );
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
            saveCart();
            return;
        }
    }
    var item = new Item(nameParameter,priceParmeter,countParameter);
    cart.push(item);
    saveCart();
}
// addItemToCart('Pear',1.75,1);
// addItemToCart('Apple',1.22,3);
// addItemToCart('Banana',1.33,1);
// addItemToCart('WaterMelon',5.50,1);

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
        totalCost += cart[i].price * cart[i].count;
    }
    return totalCost.toFixed(2);
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
        itemCopy.totalCost = item.price * item.count;
        cartCopy.push(itemCopy);
    }
    return cartCopy;
    // return cart;
}

function saveCart(){
    localStorage.setItem( 'shoppingCart',JSON.stringify(cart) );
}

//localStorage.setItem('age',33);
function loadCart(){
    cart = JSON.parse( localStorage.getItem('shoppingCart') );
    //check the cart is not null
    if(cart === null) {
        cart = [];
    }
}

loadCart();
displayCart();

