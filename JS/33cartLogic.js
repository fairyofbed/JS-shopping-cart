var shoppingCart = (function () {
    //private methods and properties
    var cart = [];

    function Item(nameParameter, priceParmeter, countParameter) {
        this.name = nameParameter
        this.price = priceParmeter
        this.count = countParameter
    }

    function saveCart() {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
    function loadCart() {
        cart = JSON.parse(localStorage.getItem('shoppingCart'));
        //check the cart is not null
        if (cart === null) {
            cart = [];
        }
    }
    loadCart();
    //public methods and properties 
    var obj = {};

    obj.addItemToCart = function (nameParameter, priceParmeter, countParameter) {
        for (var i in cart) {
            if (cart[i].name === nameParameter) {
                cart[i].count += Number(countParameter);
                saveCart();
                return;
            }
        }
        var item = new Item(nameParameter, priceParmeter, countParameter);
        cart.push(item);
        saveCart();
    };

    obj.setCountForItem = function (nameParameter, countParameter) {
        for (var i in cart) {
            if (cart[i].name === nameParameter) {
                cart[i].count = Number(countParameter.toFixed(0));
                if (cart[i].count <= 0) {
                    cart.splice(i, 1);
                }
                break;
            }
        }
        saveCart();
    };

    obj.removeItemFromCart = function (nameParameter) {
        for (var i in cart) {
            if (cart[i].name === nameParameter) {
                cart[i].count -= 1;
                if (cart[i].count === 0) {
                    cart.splice(i, 1);
                }
                break;
            }
        }
        saveCart();
    }
    obj.removeItemFromCartAll = function (nameParameter) {
        for (var i in cart) {
            if (cart[i].name = nameParameter) {
                cart.splice(i, 1);
                break;
            }
        }
        saveCart();
    }
    obj.clearCart = function () {
        cart = [];
        saveCart();
    }
    obj.countNumCart = function () {
        var totalCount = 0;
        for (var i in cart) {
            totalCount += cart[i].count;
        }
        return totalCount;
    }
    obj.totalCostCart = function () {
        var totalCost = 0
        for (var i in cart) {
            totalCost += cart[i].price * cart[i].count;
        }
        return totalCost.toFixed(2);
    }

    obj.listCart = function () {
        var cartCopy = [];
        for (var i in cart) {
            var item = cart[i];
            var itemCopy = {};
            for (var p in item) {
                itemCopy[p] = item[p];
            }
            itemCopy.totalCost = item.price * item.count;
            cartCopy.push(itemCopy);
        }
        return cartCopy;
    };
    return obj;
})();
