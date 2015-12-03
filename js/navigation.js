// NAV BAR 1


// NAV BAR 2

$('#main').click(function(){
	$('#login').hide();
	$('#home').show();
	$('#cart').hide();
	$('#products').hide();
	$('#checkout').hide();
});

$('#cart-show').click(function(){
	$('#login').hide();
	$('#home').hide();
	$('#cart').show();
	$('#products').hide();
	$('#checkout').hide();
});

$('#login-show').click(function(){
	$('#cart').hide();
	$('#home').hide();
	$('#login').show();
	$('#products').hide();
	$('#checkout').hide();
});


// NAV BAR 3
$('#products-show').click(function(){
	$('#cart').hide();
	$('#home').hide();
	$('#login').hide();
	$('#products').show();
	$('#checkout').hide();
});




