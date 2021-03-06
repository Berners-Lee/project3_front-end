'use strict'

var histAPI = {

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

  showShopHistory: function(callback) {
    this.ajax({
      method: 'GET',
      url: this.api_url + '/orders',
      dataType: 'json'
    }, callback);
  }

}

$(document).ready(function(){

$('#cart-show').on('click', function(e) {
    var cb = function cb(error, data) {
      if (error) {
        callback(error);
        return;
      }
      callback(null, data);
    };
    histAPI.showShopHistory(cb);
    e.preventDefault();
  });



});
