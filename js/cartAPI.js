'use strict'

var cartAPI = {

  api_url: 'http://localhost:3000',

  ajax: function(config, cb){
    $.ajaxSetup({
      xhrFields: {
        withCredentials: true
      }
    });
    $.ajax(config).done(function(data, textStatus, jqhxr){
      cb(null, data);
    }).fail(function(jqhxr, status, error){
      cb({jqhxr: jqhxr, statur: status, error: error});
    });
  },

  addCart: function(productInfo, callback){
    this.ajax({
      method: 'PATCH',
      url: this.api_url +'/profiles/add',
      contentType:'application/json; charset=utf-8',
      data: JSON.stringify(productInfo),
      dataType: 'json'
    }, callback);
  },

  deleteCart: function(productInfo, callback){
    this.ajax({
      method: 'PATCH',
      url: this.api_url +'/profiles/delete',
      contentType:'application/json; charset=utf-8',
      data: JSON.stringify(productInfo),
      dataType: 'json'
    }, callback);
  }
};

var callback = function(error, data) {
  if (error) {
    console.log(JSON.stringify(error));
  }
  console.log(JSON.stringify(data));
};

var populateCart = function(){
  authAPI.getProfile(function(err, profile){
    console.log(profile[0].cart);
    function filterProductByCart(obj){
      var array = [];
      for (var i = 0; i < profile[0].cart.length; i++){
        for (var j = 0; j < obj.length; j++){
          if(profile[0].cart[i] === obj[j]._id) array.push(obj[j]);
        }
      };
      return array;
    };
    $.ajax({
      method: "GET",
      url: "http://localhost:3000/products",
      dataType: "json"
    }).done(function(data){
      var cart = filterProductByCart(data);
      //cart = cart.filter(function(val) { return val !== null; });
      var totalPrice = cart.reduce(function(sum, current){
        return sum + parseFloat(current.price);
      }, 0).toFixed(2);
      var cartIndexTemplate = Handlebars.compile($('#cart-index').html());
      var cartHTML = cartIndexTemplate({cart:cart});
      $('#cart-table').html('');
      $('#cart-table').append(cartHTML);
      $('#total-price').html(totalPrice);
    }).fail(function(data){
      console.error(data);
    });
  });
};

$(document).ready(function(){
  $('#populate-products').click(function(event){
    var productInfo = {
      temp: event.target.id
    };
    console.log(productInfo);
    cartAPI.addCart(productInfo, callback);
  });

  $('#cart-table').click(function(event){
    var deleteInfo = {
      temp: event.target.id
    };
    console.log(deleteInfo);
    cartAPI.deleteCart(deleteInfo, function(err){
      if(err) console.error(err)
      populateCart();
    });
  });

  $('#cart-show').click(function(){
    populateCart();

     histAPI.showShopHistory(function(err, orders){
      console.log(orders[0].product_ObjectId)
      console.log(orders);
      function filterOrders(products){
        var array = products;
        for(var i = 0; i<array.length; i++) {
          for(var j = 0; j<orders.length; j++){
            var prod = orders[j].product_ObjectId;
            for(var k = 0; k<prod.length; k++){
             if(prod[k] === array[i]._id) {
                prod[k] = array[i];}
            };
          };

        };
        return orders;
      };
      $.ajax({
        method: "GET",
        url: "http://localhost:3000/products",
        dataType: "json"
      }).done(function(data){
        var history = filterOrders(data);
        console.log(history);
        var orderHistoryTemplate = Handlebars.compile($('#order-history').html());
        var orderHistoryHTML = orderHistoryTemplate({orders:history});
       $('#purchase-history').html('');
       $('#purchase-history').append(orderHistoryHTML);

      }).fail(function(data){
        console.error(data);

      }); // end of fail
    }); // end of showShopHistory
  }); // end of click handler

  $('.update').click(function(e){
    e.preventDefault();
    authAPI.createOrder(function(err, data){
      if(err) console.error(err)
      console.log(data);
      populateCart();
    })

  });
}); // end of document ready
