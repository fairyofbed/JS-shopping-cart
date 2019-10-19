var cart = [];
//var cart = [{name:'brush', price:1.99,count:1}];
// var cart = [{name:'brush', price:1.99,count:1},{name,price,count}];

//class? prototype?
var Item = function(nameParameter,priceParmeter,countParameter){
    this.name = nameParameter
    this.price = priceParmeter
    this.count = countParameter
};

//using class make an object
var brush = new Item('Brush',1.99,1);
// var k1 = new Item('kimchi',25,1);
cart.push(new Item( 'Apple',2.50,1) );
cart.push(brush);
