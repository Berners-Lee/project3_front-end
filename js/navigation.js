// NAV BAR 1
$('#main').click(function(){
	$('#login').hide();
	$('#home').show();
	$('#cart').hide();
	$('#products').hide();
});

// NAV BAR 2
$('#cart-show').click(function(){
	$('#login').hide();
	$('#home').hide();
	$('#cart').show();
	$('#products').hide();
});

$('#login-show').click(function(){
	$('#cart').hide();
	$('#home').hide();
	$('#login').show();
	$('#products').hide();
});


// NAV BAR 3
$('#products-show').click(function(){
	$('#cart').hide();
	$('#home').hide();
	$('#login').hide();
	$('#products').show();
});



