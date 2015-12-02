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

  getShopHistory: function(callback) {
    this.ajax({
      method: 'GET',
      url: this.api_url + '/orders',
      dataType: 'json'
    }, callback);
  }

}

$(document).ready(function(){





});
