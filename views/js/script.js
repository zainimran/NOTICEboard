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

socket.on('results',(msg)=>{
	$('.overlay').show();
	$('.cover').show();
	$('.searchResult_overlay').show();
	console.log(msg)
})	

socket.on('calendarData',(dat)=>{
	sampleEvents.monthly = dat;
	console.log('iwashereinthecalendar')
	console.log(sampleEvents)

	$('#mycalendar').html("");
	$('#mycalendar').monthly({
    	mode: 'event',
		dataType: 'json',
		events: sampleEvents
     });
})
		
$('#searchquery').on('submit', function(){
	mail = $('.profile_info').text()
	mail = mail.split('\n')
	mail = mail[1].replace(/(\r\n|\n|\r|\t| )/gm,"");
	var formData = $('#searchquery').serialize().split('&')
	queryData = formData[0].split('=')
	queryData = queryData[1]
	queryData = queryData.split('+')
	var bla = ""
	queryData.forEach(y=>{
		bla = bla+y+" "
	})
	queryData = bla
	searchfilterData = []
	for(i =1; i<formData.length;i++){
		searchfilterData.push(formData[i].split('=')[1])
	}
	if (queryData === ''){
		alert('Please enter search query before submitting')
	}
	else if(searchfilterData.length === 0){
		alert('Please select appropriate filters before search')
	}
	else{
		$.post('/search',{query : queryData, email:mail,searchfilter:searchfilterData})
		console.log(queryData)
		$("#resultQuery").text(queryData);
		 document.getElementById("searchquery").reset();
		 $('.filter_dropdown').toggle();
	}	
});

$('#searchquery1').on('submit', function(data){
	mail = $('.profile_info').text()
	mail = mail.split('\n')
	mail = mail[1].replace(/(\r\n|\n|\r|\t| )/gm,"");
	var formData = $('#searchquery1').serialize()
	var formData2 = $('#searchquery2').serialize().split('&')
	queryData = formData.split('=')
	queryData = queryData[1]
	queryData = queryData.split('+')
	var bla = ""
	queryData.forEach(y=>{
		bla = bla+y+" "
	})
	queryData = bla
	//console.log(formData2)
	searchfilterData = []
	for(i =0; i<formData2.length;i++){
		searchfilterData.push(formData2[i].split('=')[1])
	}
	if (queryData === ''){
		alert('Please enter search query before submitting')
	}
	else if(searchfilterData.length === 0){
		alert('Please select appropriate filters before search')
	}
	else{
		$.post('/search',{query : queryData, email:mail,searchfilter:searchfilterData})
		$("#resultQuery").text(queryData);	
		document.getElementById("searchquery1").reset();
		document.getElementById("searchquery2").reset();
	}	
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
		$('#mycalendar').monthly({
	    	mode: 'event',
			dataType: 'json',
			events: sampleEvents
	     });
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
		$('#mycalendar').monthly({
	    	mode: 'event',
			dataType: 'json',
			events: sampleEvents
	     });
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