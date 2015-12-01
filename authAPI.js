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

  register: function(credentials, callback){
    this.ajax({
      method: 'POST',
      url: this.api_url +'/signup',
      contentType:'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  }

};

var form2object = function(form) {
  var data = {};
  $(form).find("input").each(function(index, element) {
    var type = $(this).attr('type');
    if ($(this).attr('name') && type !== 'submit' && type !== 'hidden') {
      data[$(this).attr('name')] = $(this).val();
    }
  });
  return data;
};

var callback = function(error, data) {
  if (error) {
    console.error(error);
    console.log('status: ' + error.status + ', error: ' +error.error);
    return;
  }
  console.log(JSON.stringify(data, null, 4));
};

