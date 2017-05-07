$(window).load( function() {
	$('#mycalendar').monthly();
});
$('.usericondiv').on('click', function() {
	$('.profile_dropdown').toggle();
});
$('.notifications').on('click', function() {
	$('.notif_dropdown').toggle();
});
$('.filterbtn').on('click', function() {
	$('.filter_dropdown').toggle();
});
$('.emailexpand').on('click', function() {
	$(this).find(".emailhere").toggle();
});
$('.open_overlay').on('click', function() {
	$('.overlay').show();
	$('.cover').show();
	$('.event1_overlay').show()
});
$('.cover').on('click', function() {
	$('.overlay').hide();
	$('.cover').hide();
	$('.alloverlays').hide();
});
$('#addBook').on('click', function() {
	$('.overlay').show();
	$('.cover').show();
	$('.addBook_overlay').show()
});
$('#addCourse').on('click', function() {
	$('.overlay').show();
	$('.cover').show();
	$('.createCourse_overlay').show()
});
$('.addlnf').on('click', function() {
	$('.overlay').show();
	$('.cover').show();
	$('.addLnf_overlay').show()
});
$('#addEvent').on('click', function() {
	$('.overlay').show();
	$('.cover').show();
	$('.addEvent_overlay').show()
});
$('.star').on('click', function() {
	if ($(this).attr('class') === 'unfaved star') {
		$(this).attr({
			class: 'faved star',
			src: 'star_on.png'
		})
	}
	else {
		$(this).attr({
			class: 'unfaved star',
			src: 'star_off.png'
		})
	}
});
$('.event_editbtn').on('click', function() {
	$('.overlay').show();
	$('.cover').show();
	$('.addEvent_overlay').show();
})
$(window).on("load",function(){
	$(".eventfeed").mCustomScrollbar({
		theme: "minimal-dark"
	});
	$(".lnffeed").mCustomScrollbar({
		theme: "minimal-dark"
	});
	$(".csfeed").mCustomScrollbar({
		theme: "minimal-dark"
	});
	$(".search_feed").mCustomScrollbar({
		theme: "minimal-dark"
	});
});