'use strict'

var paymentAPI = {

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

  createOrder: function(callback) {
    this.ajax({
      method: 'POST',
      url: this.api_url + '/orders',
      dataType: 'json'
    }, callback);
  }

}

$(document).ready(function(){

$('#checkout-show').submit(function(e) {
    e.preventDefault();
    console.log("poop");
  //   var cb = function cb(error, data) {
  //     if (error) {
  //       callback(error);
  //       return;
  //     }
  //     callback(null, data);
  //   };
  //   paymentAPI.createOrder(cb);
  });
});
