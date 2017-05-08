var sampleEvents = {
	"monthly": []
};
$(window).on('load', function() {
	$('#mycalendar').monthly({
    	mode: 'event',
		dataType: 'json',
		events: sampleEvents
     });
});
$('#searchquery').on('submit', function(){
	$('.overlay').show();
	$('.cover').show();
	$('.searchResult_overlay').show();
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
	$('.event_overlay').show()
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
		text = $('.eInfo').text()
		email = $('.profile_info').text()
		title = $('.eTitle').text()
		title2 = ""
		for(var i =0;i<title.length/2;i++){
			title2 = title2+title[i]
		}
		title = title2
		DATETIME = $('.eDateDetailed').text()
		$.post("/star_on", {eventData: text, user: email, timings : DATETIME, title:title})
		DATETIME = DATETIME.replace(/(\r\n|\r|\t)/gm,"");
		DATETIME = DATETIME.split('\n')
		DATE = DATETIME[0]
		TIME = DATETIME[1]
		TIME = TIME.replace("   ","")
		sampleEvents.monthly.push({
			"name": title,
			"startdate": "2017-5-03",
			"enddate": "2017-5-3",
			"starttime": "23:00",
			"color": "#99CCCC"	
		})
		console.log(sampleEvents)
		$('#mycalendar').html("");
		$('#mycalendar').monthly({events: sampleEvents});
	}
	else {
		$(this).attr({
			class: 'unfaved star',
			src: 'star_off.png'
		})
		text = $('.eInfo').text()
		email = $('.profile_info').text()
		title = $('.eTitle').text()
		title2 = ""
		for(var i =0;i<title.length/2;i++){
			title2 = title2+title[i]
		}
		title = title2
		DATETIME = $('.eDateDetailed').text()
		SampleEvents = {"monthly" : []};
		for (j = 0;j < sampleEvents.monthly.length;j++) {
			if(sampleEvents.monthly[j].name === title){
			}
			else {
				SampleEvents.monthly.push(sampleEvents.monthly[j])
			}
		}
		console.log(title)
		sampleEvents = SampleEvents;
		$('#mycalendar').html("");
		$('#mycalendar').monthly({events: SampleEvents});
		$.post("/star_off", {eventData: text, user: email, timings : DATETIME, title:title})
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