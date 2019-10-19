function displayCart (){
    var cartArray = shoppingCart.listCart();
    output = '';
    for (var i in cartArray) {
        output += '<li>'
        + cartArray[i].name
        + "<input class = 'item-count' type ='number' data-name='"
        + cartArray[i].count
        + "'value='"+ cartArray[i].count+"'>"
        + " x " + cartArray[i].price
        + " = " + cartArray[i].totalCost.toFixed(2) 
        + " <button class= 'plus-item' data-name='"+cartArray[i].name+"'> + </button> "
        + " <button class= 'subtract-item' data-name='"+cartArray[i].name+"'> - </button> "
        + " <button class= 'delete-item' data-name='"+cartArray[i].name+"'> X </button> "
        + '<li>';
    }
    $('#show-cart').html(output);
    $('#count-cart').html( shoppingCart.countNumCart() );
    $('#total-cost-cart').html( shoppingCart.totalCostCart() );
}

// $('#show-cart','.add-to-cart').on('click', '.plus-item', function( event ){
$('.add-to-cart').click( function( event ){
    event.preventDefault();
    var name = $(this).attr('data-name');
    var price = Number( $(this).attr('data-price') );

    shoppingCart.addItemToCart(name,price,1);
    displayCart();
});

$('#show-cart').on('click', '.delete-item', function(event){
    var name = $(this).attr('data-name');
    shoppingCart.removeItemFromCartAll(name); // '(name)' this is not a parameter it is argument
    displayCart();
} );

$('#show-cart').on('click', '.subtract-item', function(event){
    var name = $(this).attr('data-name');
    shoppingCart.removeItemFromCart(name); // '(name)' this is not a parameter it is argument
    displayCart();
} );

$('#show-cart').on('click', '.plus-item', function( event ){
    var name = $(this).attr('data-name');
    // var price = Number( $(this).attr('data-price') );

    // addItemToCart(name,price,1);
    shoppingCart.addItemToCart(name,0,1);
    displayCart();
} );

$('#clear-cart').click( function(event) {
    shoppingCart.clearCart();
    displayCart();
});
$('#show-cart').on('change','.item-count', function(event){
    var name = $(this).attr('data-name');
    var count = $(this).val();
    shoppingCart.setCountForItem(name, count);
    
});

/************************* 논리 ************** */
var shoppingCart = {};
shoppingCart.cart = [];

shoppingCart.Item = function(nameParameter,priceParmeter,countParameter){
    this.name = nameParameter
    this.price = priceParmeter
    this.count = countParameter
};

shoppingCart.addItemToCart = function(nameParameter,priceParmeter,countParameter){
    for (var i in this.cart){
        if (this.cart[i].name === nameParameter) {
            this.cart[i].count += countParameter;
            this.saveCart();
            return;
        }
    }
    var item = new shoppingCart.Item(nameParameter,priceParmeter,countParameter);
    this.cart.push(item);
    this.saveCart();
};

shoppingCart.setCountForItem = function(nameParameter, countParameter){
    for(var i in this.cart){
        if(this.cart[i].name === nameParameter){
            this.cart[i].count = countParameter;
            break;
        }
    }
}

shoppingCart.removeItemFromCart = function(nameParameter){
    for (var i in this.cart){
        if (this.cart[i].name === nameParameter){
            this.cart[i].count -=1;
            if (this.cart[i].count === 0) {
                this.cart.splice(i,1);
            }
            break; 
        }
    }
    this.saveCart();
}

//Remove whole particular item
shoppingCart.removeItemFromCartAll = function(nameParameter){
    for (var i in this.cart){
        if(this.cart[i].name = nameParameter){
            this.cart.splice(i,1);
            break;
        }
    }
    this.saveCart();
}


shoppingCart.clearCart = function(){
    this.cart = [];
    this.saveCart();
}
//return total number of cart
shoppingCart.countNumCart = function(){
    var totalCount = 0;
    for (var i in this.cart){
        totalCount += this.cart[i].count;
    }
    return totalCount;
}

//return total cost of cart
shoppingCart.totalCostCart = function(){
    var totalCost = 0
    for (var i in this.cart){
        totalCost += this.cart[i].price * this.cart[i].count;
    }
    return totalCost.toFixed(2);
}

shoppingCart.listCart = function(){
    var cartCopy = [];
    for (var i in this.cart){
        var item = this.cart[i];
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

shoppingCart.saveCart = function(){
    localStorage.setItem( 'shoppingCart',JSON.stringify(this.cart) );
}

//localStorage.setItem('age',33);
shoppingCart.loadCart = function(){
    this.cart = JSON.parse( localStorage.getItem('shoppingCart') );
    //check the cart is not null
    if(this.cart === null) {
        this.cart = [];
    }
}

shoppingCart.loadCart();
displayCart();

