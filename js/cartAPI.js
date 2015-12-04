'use strict'
var totalPrice = 0;
var orderHistoryTemplate = Handlebars.compile($('#order-history').html());

var cartAPI = {

  api_url: 'https://peaceful-plains-2243.herokuapp.com',

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
  },

  charge: function(data, callback){
    this.ajax({
      method: 'POST',
      url: this.api_url + '/charges',
      data: data,
      dataType: 'json'
    }, callback)
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
      url: "https://peaceful-plains-2243.herokuapp.com/products",
      dataType: "json"
    }).done(function(data){
      var cart = filterProductByCart(data);
      //cart = cart.filter(function(val) { return val !== null; });
      totalPrice = cart.reduce(function(sum, current){
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

var populateHistory = function(){
  histAPI.showShopHistory(function(err, orders){
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
      url: "https://peaceful-plains-2243.herokuapp.com/products",
      dataType: "json"
    }).done(function(data){
      var history = filterOrders(data);
      console.log(history);
      var orderHistoryHTML = orderHistoryTemplate({orders:history});
     $('#purchase-history').html('');
     $('#purchase-history').append(orderHistoryHTML);

    }).fail(function(data){
      console.error(data);

    }); // end of fail
  }); // end of showShopHistory
};

var handler = StripeCheckout.configure({
  key: 'pk_test_NWkoskZLdjXlYqbHY3jG1wkN',
  image: '/img/documentation/checkout/marketplace.png',
  locale: 'auto',
  token: function(token) {
    // Use the token to create the charge with a server-side script.
    // You can access the token ID with `token.id`
    var credentials = {
      stripeToken: token.id,
      amount: totalPrice*100
    };
    //console.log(credentials);
    cartAPI.charge(credentials,function(err, req){
      $('#cart-table').html('');
      $('#total-price').html('0.00');
      populateHistory();
    });
  },
});

// Close Checkout on page navigation
$(window).on('popstate', function() {
  handler.close();
});


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
    populateHistory();
  }); // end of click handler

  $('.update').click(function(e){
    e.preventDefault();
    authAPI.createOrder(function(err, data){
      if(err) console.error(err)
      console.log(data);
      populateCart();
      populateHistory();
    })
  });

  $('#customButton').on('click', function(e) {
    e.preventDefault();
    // Open Checkout with further options
    handler.open({
      name: 'Nozama',
      description: 'Reday to checkout?',
      amount: totalPrice*100
    });
  });

  $('#search-form').on('submit', function(e){
    e.preventDefault();
    var search = $('#search-input').val();
    $.ajax({
      method: "GET",
      url: "https://peaceful-plains-2243.herokuapp.com/products?name=" + search,
      dataType: "json"
    }).done(function(data){
      console.log(data);
    }).fail(function(data){
      console.error(data);
    });

    // {name: input}

  });
}); // end of document ready
