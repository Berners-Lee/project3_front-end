var productIndexTemplate = Handlebars.compile($('#product-index').html());
$('#all').click(function(e){
  $.ajax({
    method: "GET",
    url: "https://peaceful-plains-2243.herokuapp.com/products",
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
    url: "https://peaceful-plains-2243.herokuapp.com/products/dorm",
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
    url: "https://peaceful-plains-2243.herokuapp.com/products/school",
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
    url: "https://peaceful-plains-2243.herokuapp.com/products/fun",
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
    url: "https://peaceful-plains-2243.herokuapp.com/products/food",
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

$('#search-form').on('submit', function(e){
    e.preventDefault();
    var search = $('#search-input').val();
    $.ajax({
      method: "GET",
      url: "https://peaceful-plains-2243.herokuapp.com/products?name=" + search,
      dataType: "json"
    }).done(function(data){
      data = data.reduce(function(a, b) {
        return a.concat(b);
      }, []);
      console.log(data);
      productHTML = productIndexTemplate({product: data});
      $('#populate-products').html('');
      $('#populate-products').append(productHTML);
    }).fail(function(data){
      console.error(data);
    });
});
