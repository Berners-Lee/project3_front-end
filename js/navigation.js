$('#cart-show').click(function(){
	$('#login').hide();
	$('#home').hide();
	$('#cart').show();
});

$('#login-show').click(function(){
	$('#cart').hide();
	$('#home').hide();
	$('#login').show();
});