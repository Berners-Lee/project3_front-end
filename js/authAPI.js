'use strict'

var authAPI = {

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

  register: function(credentials, callback){
    this.ajax({
      method: 'POST',
      url: this.api_url +'/signup',
      contentType:'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  },

  login: function(credentials, callback){
    this.ajax({
      method: 'POST',
      url: this.api_url +'/login',
      contentType:'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  },

  getProfile: function(callback) {
    this.ajax({
      method: 'GET',
      url: this.api_url + '/profiles',
      dataType: 'json'
    }, callback);
  },

  createProfile: function(callback) {
    this.ajax({
      method: 'POST',
      url: this.api_url + '/profiles',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({}),
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
    console.log(JSON.stringify(error));
  }
  console.log(JSON.stringify(data));
};

$(document).ready(function(){

$('#register').on('submit', function(e) {
    var credentials = form2object(this);
    var cb = function cb(error, data) {
      if (error) {
        callback(error);
        return;
      }
    callback(null, data);
    console.log('Registered!');
    };
    authAPI.register(credentials, cb);
    e.preventDefault();
  });

  $('#loginform').on('submit', function(e) {
    e.preventDefault();
    var credentials = form2object(this);
    var loginCb = function (error, data) {
      if (error) {
        callback(error);
        //return;
      }
      authAPI.getProfile(function(err, data){
        if(err) console.error(error);
        if(data.length > 0)
          {console.log("has profile")}
        else {
          console.log("no profile");
          authAPI.createProfile(callback);
        };
      });
    };
    authAPI.login(credentials, loginCb);

    // authAPI.createProfile(function(err, data){
    //     if(err) console.error(err)
    //     console.log(data);
    // });
  });



});

