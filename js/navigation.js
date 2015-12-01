// NAV BAR 1

// NAV BAR 2
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


// NAV BAR 3
$('#products-show').click(function(){
	$('#cart').hide();
	$('#home').hide();
	$('#login').hide();
	$('#products').show();
});



