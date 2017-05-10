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
	console.log(msg)
	$(".search_feed").html('')
	if(msg.length === 0){
		msg = "No Results Found!"
		$(".search_feed").prepend("<div><b>"+msg+"</b></div>")
	}
	else{
		
		for(i = 0; i<msg.length;i++){
			//console.log(msg[i].image)
			newdiv = document.createElement('div'); 
			newdiv.className = "row searchResult"+(i+1);
			child1 = document.createElement('div'); 
			child1.className = "col-sm-2 eventpic_spg"
			img = document.createElement('img');
			img.src = "data/lums_pics.png"//"data/"+msg[i].image
			child1.append(img)
			newdiv.append(child1)
			child2 = document.createElement('div'); 
			child2.className = "col-md-8 eventInfo_spg"
			h4 = document.createElement('h4');
			h4.append(msg[i].Title) 
			child2.append(h4)
			p4 = document.createElement('p');
			p4.append(msg[i].Description)
			child2.append(p4)
			newdiv.append(child2)
			child3 = document.createElement('div');
			child3.className = "col-sm-2 eventTime_spg"
			child3Child = document.createElement('div')
			child3Child.className = "row"
			p = document.createElement('p');
			p.className = "eventTime_spg"
			b = document.createElement('br')
			b1 = document.createElement('br')
			p.append('Date: '+msg[i].DATETIME.split('T')[0])
			p.append(b)
			p.append('Time: '+msg[i].DATETIME.split('T')[1].split(':')[0] + ':' + msg[i].DATETIME.split('T')[1].split(':')[1])
			p.append(b1)
			p.append('Location: '+msg[i].LOCATION)
			child3Child.append(p)
			child3.append(child3Child)
			newdiv.append(child3)
			console.log(newdiv)
			$(".search_feed").append(newdiv)
		}
	}
	$('.overlay').show();
	$('.cover').show();
	$('.searchResult_overlay').show();
	console.log(msg)
})

socket.on('calendarData',(dat)=>{
	sampleEvents.monthly = dat;
	console.log('iwashereinthecalendar')
	console.log(sampleEvents.monthly)

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
	if (queryData === ' '){
		//alert('Please enter search query before submitting')
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
	var eventNum = $(this).closest('.eventpost').attr('class').split(' ')[1];
	$('.' + eventNum).show();
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
	divs = $(this).closest('.eventinfo').children();
	eventClass = $(this).closest('.eventpost').attr('class').split(' ')[1]
	TEXT = $('.'+eventClass).find('.eInfo').text().split('...read more')
	TEXT = TEXT[0] + ' '+ TEXT[1]
	TEXT = TEXT.replace(/(\r\n|\r|\t)/gm,"")
	console.log(TEXT)
	/*console.log(TEXT)
	console.log('blaaaaaaaa')
	DATETIME = $('.'+eventClass).find('.eDateDetailed').text()
	DATETIME = DATETIME.replace(/(\r\n|\r|\t)/gm,"")
	DATETIME = DATETIME.split('\n')
	console.log(DATETIME)
	console.log('=============================')
	console.log(divs[0].outerText)
	console.log(divs[3].outerText)
	console.log(divs[4].outerText)*/
	console.log('=============================')
	if ($(this).attr('class') === 'unfaved star') {
		$(this).attr({
			class: 'faved star',
			src: 'star_on.png'
		})
		text = TEXT
		email = $('.profile_info').text()
		title = $('.eTitle').text()
		title2 = ""
		for(var i =0;i<title.length/2;i++){
			title2 = title2+title[i]
		}
		title = divs[0].outerText
		DATETIME = $('.'+eventClass).find('.eDateDetailed').text()
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
		//console.log(sampleEvents)
		$('#mycalendar').html("");
		$('#mycalendar').monthly({
	    	mode: 'event',
			dataType: 'json',
			events: sampleEvents
	     });
	}
	else {
		divs = $(this).closest('.eventinfo').children();
		eventClass = $(this).closest('.eventpost').attr('class').split(' ')[1]
		$(this).attr({
			class: 'unfaved star',
			src: 'star_off.png'
		})
		TEXT = $('.'+eventClass).find('.eInfo').text().split('...read more')
		TEXT = TEXT[0] + ' '+ TEXT[1]
		TEXT = TEXT.replace(/(\r\n|\r|\t)/gm,"")
		text = TEXT
		email = $('.profile_info').text()
		title = $('.eTitle').text()
		title2 = ""
		for(var i =0;i<title.length/2;i++){
			title2 = title2+title[i]
		}
		title = divs[0].outerText
		DATETIME = $('.'+eventClass).find('.eDateDetailed').text()
		//DATETIME = DATETIME.replace(/(\r\n|\r|\t)/gm,"");
		//DATETIME = DATETIME.split('\n')
		//DATE = DATETIME[0]
		//TIME = DATETIME[1]
		//TIME = TIME.replace("   ","")
		SampleEvents = {"monthly" : []};
		for (j = 0;j < sampleEvents.monthly.length;j++) {
			if(sampleEvents.monthly[j].name === title){
			}
			else {
				SampleEvents.monthly.push(sampleEvents.monthly[j])
			}
		}
		//console.log(title)
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
});
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