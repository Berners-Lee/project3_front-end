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
  }
};

var callback = function(error, data) {
  if (error) {
    console.log(JSON.stringify(error));
  }
  console.log(JSON.stringify(data));
};

$(document).ready(function(){
  $('#populate-products').click(function(event){
    var productInfo = {
      temp: event.target.id
    };
    console.log(productInfo);
    cartAPI.addCart(productInfo, callback);
  });

  $('#cart-show').click(function(){
    authAPI.getProfile(function(err, profile){
      console.log(profile[0].cart);
      function filterProductByCart(obj){
        var array = obj;
        for (var i = 0; i<array.length; i++) {
          if(profile[0].cart.indexOf(array[i]._id) === -1) {
            delete array[i];}
        }
        return array;
      };
      $.ajax({
        method: "GET",
        url: "http://localhost:3000/products",
        dataType: "json"
      }).done(function(data){
        var cart = filterProductByCart(data,profile[0].cart)
        cart = cart.filter(function(val) { return val !== null; });
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
  });

  $('#checkout').click(function(){
    authAPI.createOrder(function(err, data){
      if(err) console.error(err)
      console.log(data);
    })
  });
});
