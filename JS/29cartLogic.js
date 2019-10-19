/************************* 논리 ************** */
var shoppingCart = {};
shoppingCart.cart = [];

shoppingCart.Item = function (nameParameter, priceParmeter, countParameter) {
    this.name = nameParameter
    this.price = priceParmeter
    this.count = countParameter
};

shoppingCart.setCountForItem = function (nameParameter, countParameter) {
    for (var i in this.cart) {
        if (this.cart[i].name === nameParameter) {
            this.cart[i].count = Number( countParameter.toFixed(0) );
            if (this.cart[i].count <= 0){
                this.cart.splice(i, 1);
            }
            break;
        }
    }
    this.saveCart();
};

shoppingCart.addItemToCart = function (nameParameter, priceParmeter, countParameter) {
    for (var i in this.cart) {
        if (this.cart[i].name === nameParameter) {
            this.cart[i].count += Number(countParameter);
            this.saveCart();
            return;
        }
    }
    var item = new this.Item(nameParameter, priceParmeter, countParameter);
    this.cart.push(item);
    this.saveCart();
};

shoppingCart.removeItemFromCart = function (nameParameter) {
    for (var i in this.cart) {
        if (this.cart[i].name === nameParameter) {
            this.cart[i].count -= 1;
            if (this.cart[i].count === 0) {
                this.cart.splice(i, 1);
            }
            break;
        }
    }
    this.saveCart();
}

shoppingCart.removeItemFromCartAll = function (nameParameter) {
    for (var i in this.cart) {
        if (this.cart[i].name = nameParameter) {
            this.cart.splice(i, 1);
            break;
        }
    }
    this.saveCart();
}

shoppingCart.clearCart = function () {
    this.cart = [];
    this.saveCart();
}
shoppingCart.countNumCart = function () {
    var totalCount = 0;
    for (var i in this.cart) {
        totalCount += this.cart[i].count;
    }
    return totalCount;
}

shoppingCart.totalCostCart = function () {
    var totalCost = 0
    for (var i in this.cart) {
        totalCost += this.cart[i].price * this.cart[i].count;
    }
    return totalCost.toFixed(2);
}

shoppingCart.listCart = function () {
    var cartCopy = [];
    for (var i in this.cart) {
        var item = this.cart[i];
        var itemCopy = {};
        for (var p in item) {
            itemCopy[p] = item[p];
        }
        itemCopy.totalCost = item.price * item.count;
        cartCopy.push(itemCopy);
    }
    return cartCopy;
}
shoppingCart.saveCart = function () {
    localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
}
shoppingCart.loadCart = function () {
    this.cart = JSON.parse(localStorage.getItem('shoppingCart'));
    //check the cart is not null
    if (this.cart === null) {
        this.cart = [];
    }
}