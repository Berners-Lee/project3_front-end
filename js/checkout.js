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

$('#submit-payment').on('click', function(e) {
    var cb = function cb(error, data) {
      if (error) {
        callback(error);
        return;
      }
      callback(null, data);
    };
    paymentAPI.createOrder(cb);
    e.preventDefault();
  });



});
