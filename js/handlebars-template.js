
$('#all').click(function(e){
  $.ajax({
    method: "GET",
    url: "http://localhost:3000/products",
    dataType: "json"
  }).done(function(data){
    var productIndexTemplate = Handlebars.compile($('#product-index').html());
    var productHTML = productIndexTemplate({product:data});
    $('#populate-products').html('');
    $('#populate-products').append(productHTML);
  }).fail(function(data){
    console.error(data);
  });
});

$('#dorm').click(function(e){
  $.ajax({
    method: "GET",
    url: "http://localhost:3000/products/dorm",
    dataType: "json"
  }).done(function(data){
    var productIndexTemplate = Handlebars.compile($('#product-index').html());
    var productHTML = productIndexTemplate({product:data});
    $('#populate-products').html('');
    $('#populate-products').append(productHTML);
  }).fail(function(data){
    console.error(data);
  });
});

$('#school').click(function(e){
  $.ajax({
    method: "GET",
    url: "http://localhost:3000/products/school",
    dataType: "json"
  }).done(function(data){
    var productIndexTemplate = Handlebars.compile($('#product-index').html());
    var productHTML = productIndexTemplate({product:data});
    $('#populate-products').html('');
    $('#populate-products').append(productHTML);
  }).fail(function(data){
    console.error(data);
  });
});

$('#fun').click(function(e){
  $.ajax({
    method: "GET",
    url: "http://localhost:3000/products/fun",
    dataType: "json"
  }).done(function(data){
    var productIndexTemplate = Handlebars.compile($('#product-index').html());
    var productHTML = productIndexTemplate({product:data});
    $('#populate-products').html('');
    $('#populate-products').append(productHTML);
  }).fail(function(data){
    console.error(data);
  });
});

$('#food').click(function(e){
  $.ajax({
    method: "GET",
    url: "http://localhost:3000/products/food",
    dataType: "json"
  }).done(function(data){
    var productIndexTemplate = Handlebars.compile($('#product-index').html());
    var productHTML = productIndexTemplate({product:data});
    $('#populate-products').html('');
    $('#populate-products').append(productHTML);
  }).fail(function(data){
    console.error(data);
  });
});
