'use strict'

var authAPI = {

  api_url: 'https://localhost:3000',

  ajax: function(config, cb){
    $.ajax(config).done(function(data, textStatus, jqhxr){
      cb(null, data);
    }).fail(function(jqhxr, status, error){
      cb({jqhxr: jqhxr, statur: status, error: error});
      });
    },

};


