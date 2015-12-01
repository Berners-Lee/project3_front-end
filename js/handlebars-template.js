$('#products-show').click(function(e){
  $.ajax({
    method: "GET",
    url: "http://localhost:3000/products",
    dataType: "json"
  }).done(function(data){
    console.log(JSON.stringify(data,null,4));
    var productIndexTemplate = Handlebars.compile($('#product-index').html());
    var productHTML = productIndexTemplate({product:data});
    $('#populate-products').html('');
    $('#populate-products').append(productHTML);
  }).fail(function(data){
    console.error(data);
  });

});
