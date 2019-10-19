function displayCart (){
    var cartArray = shoppingCart.listCart();
    output = '';
    for (var i in cartArray) {
        output += '<li>'
        + cartArray[i].name
        + "<input class ='item-count' type ='number' data-name='"
        + cartArray[i].name
        + "'value='"+ cartArray[i].count+"'>"
        + " x " + cartArray[i].price
        + " = " + cartArray[i].totalCost.toFixed(2) 
        + " <button class= 'plus-item' data-name='"+cartArray[i].name+"'> + </button> "
        + " <button class= 'subtract-item' data-name='"+cartArray[i].name+"'> - </button> "
        + " <button class= 'delete-item' data-name='"+cartArray[i].name+"'> X </button> "
        + '<li>'
    }
    $('#show-cart').html(output);
    $('#count-cart').html( shoppingCart.countNumCart() );
    $('#total-cost-cart').html( shoppingCart.totalCostCart() );
    // $('.item-count').html( shoppingCart.countNumCart() );
}

// $('#show-cart','.add-to-cart').on('click', '.plus-item', function( event ){

$('.add-to-cart').click( function( event ){
    
    event.preventDefault();
    var name = $(this).attr('data-name');
    var price = Number( $(this).attr('data-price') );

    shoppingCart.addItemToCart(name,price,1);
    console.log('click add to cart:'+name+''+price);
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
    var count = Number( $(this).val() );
    shoppingCart.setCountForItem(name, count);
    displayCart();
});

shoppingCart.loadCart();
displayCart();

