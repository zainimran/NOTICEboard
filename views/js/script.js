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

$('.eventpost').each(function(i, obj) {
	var x = "event"+(i+1)
	obj.classList.add(x)    
});

$('.event_overlay').each(function(i, obj) {
	var x = "event"+(i+1)
	obj.classList.add('alloverlays')
	obj.classList.add(x)    
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
			if (msg[i].Title !== undefined){
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
			else if(msg[i].BookOffered !== undefined){
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
				h4.append('Have :'+msg[i].BookOffered + ' Want :'+msg[i].BookRequired) 
				child2.append(h4)
				p4 = document.createElement('p');
				p4.append('Have :'+msg[i].BookOffered + 'by author '+ msg[i].BookOffAuthor+ '. Want :'+msg[i].BookRequired + ' by author '+ msg[i].BookReqAuthor+'. Please contact at '+ msg[i].ContactNumber+'.')
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
				p.append(' ')
				p.append(b)
				p.append(' ')
				p.append(b1)
				p.append(' ')
				child3Child.append(p)
				child3.append(child3Child)
				newdiv.append(child3)
				console.log(newdiv)
				$(".search_feed").append(newdiv)
			}
			else if(msg[i].CourseOffered !== undefined){
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
				h4.append('Have :'+" "+msg[i].CourseOffered +" "+" "+" "+'| Want :'+" "+msg[i].CourseRequired) 
				child2.append(h4)
				p4 = document.createElement('p');
				p4.append('Have : '+" "+msg[i].CourseOffered + ' by instructor '+ msg[i].InstructorOffered+ ' at time '+ msg[i].TimingsOffered + '. Want :'+msg[i].CourseRequired + ' by instructor '+ msg[i].InstructorRequired+' at time '+msg[i].TimingsRequired+'. Please contact at '+ msg[i].email+'.')
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
				p.append(' ')
				p.append(b)
				p.append(' ')
				p.append(b1)
				p.append(' ')
				child3Child.append(p)
				child3.append(child3Child)
				newdiv.append(child3)
				console.log(newdiv)
				$(".search_feed").append(newdiv)
			}
			else if(msg[i].LostItem !== undefined){
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
				h4.append('LOST : '+msg[i].LostItem) 
				child2.append(h4)
				p4 = document.createElement('p');
				console.log(msg[i].Description)
				console.log(msg[i].LostORFound)
				console.log(msg[i])
				if(msg[i].LostORFound === 'Lost'){
					p4.append('Lost : '+" "+msg[i].LostItem + '. '+ msg[i].Description+ '. Please contact at '+ msg[i].email+' if found.')	
				}
				else if(msg[i].LostORFound === 'Found'){
					p4.append('Found : '+" "+msg[i].LostItem + '. '+ msg[i].Description +'. Please contact at '+ msg[i].email+' if yours.')					
				}
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
				p.append(' ')
				p.append(b)
				p.append(' ')
				p.append(b1)
				p.append(' ')
				child3Child.append(p)
				child3.append(child3Child)
				newdiv.append(child3)
				console.log(newdiv)
				$(".search_feed").append(newdiv)
			}
			console.log('results')
			console.log(msg)
		}
	}
	$('.overlay').show();
	$('.cover').show();
	$('.searchResult_overlay').show();
	console.log(msg)
})

socket.on('calendarData',(dat)=>{
	sampleEvents.monthly = dat;
	console.log('iwashereinthecalendar',dat)
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
	TEXT = TEXT[1]
	//console.log(TEXT)
	TEXT = TEXT.replace(/(\r\n|\r|\t)/gm,"")
	//console.log(TEXT)
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
		DATETIME = divs[4].outerText.split('\n')
		
		//DATETIME = $('.'+eventClass).find('.eDateDetailed').text()
		$.post("/star_on", {eventData: text, user: email, timings : DATETIME, title:title})
		//DATETIME = DATETIME.replace(/(\r\n|\r|\t)/gm,"");
		//DATETIME = DATETIME.split('\n')
		//console.log(DATETIME)
		//console.log('blablabl')
		DATE = DATETIME[0].split(':')[1]
		DATE = DATE.replace(' ','')
		//console.log(DATETIME[1].includes('AM'))
		//console.log(DATETIME[1].includes('PM'))
		FIRST = DATETIME[1].split(':')[1]
		if (DATETIME[1].includes('PM')){
			FIRST = parseInt(FIRST) + 12
		}
		TIME = FIRST.toString() + ':'+DATETIME[1].split(':')[2].replace('M',"").replace('A','').replace('P','')
		TIME = TIME.replace(" ","")
		//console.log(TIME)
		sampleEvents.monthly.push({
			"name": title,
			"startdate": DATE,
			"enddate": DATE,
			"starttime":TIME,
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
		/*TEXT = $('.'+eventClass).find('.eInfo').text().split('...read more')
		TEXT = TEXT[0] + ' '+ TEXT[1]
		TEXT = TEXT.replace(/(\r\n|\r|\t)/gm,"")*/
		text = TEXT
		email = $('.profile_info').text()
		title = $('.eTitle').text()
		title2 = ""
		for(var i =0;i<title.length/2;i++){
			title2 = title2+title[i]
		}
		title = divs[0].outerText
		DATETIME = divs[4].outerText.split('\n')
		DATE = DATETIME[0].split(':')[0]
		DATE = DATE.replace(' ','')
		TIME = DATETIME[1].split(':')[1]
		TIME = TIME.replace(" ","")
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
owner = ""
event_id = ""

$('.event_editbtn').on('click', function() {
	divs = $(this).closest('.eventinfo').children();
	//console.log(divs)
	owner = divs[5].defaultValue
	mail = $('.profile_info').text()
	mail = mail.split('\n')
	mail = mail[1].replace(/(\r\n|\n|\r|\t| )/gm,"");
	if(mail === owner){
		$('.overlay').show();
		$('.cover').show();
		$('.editEvent_overlay').show();
		event_id = divs[6].defaultValue
		owner = ""
	}
	else{
		alert('You are not the owner of this post')
	}
	
})

$('.deleteEvent').on('click', function() {
	divs = $(this).closest('.eventinfo').children();
	//console.log(divs)
	owner = divs[5].defaultValue
	console.log(owner)
	mail = $('.profile_info').text()
	mail = mail.split('\n')
	mail = mail[1].replace(/(\r\n|\n|\r|\t| )/gm,"");
	if(mail === owner){
		console.log('Person can delete')
		event_id = divs[6].defaultValue
		$.post("/deleteEvent",{id : event_id})
	/*	$('.overlay').show();
		$('.cover').show();
		$('.editEvent_overlay').show();
		event_id = divs[6].defaultValue
		owner = ""*/
	}
	else{
		alert('You are not the owner of this post')
	}
	
})

var form3 = document.getElementById('eventform_edit');
form3.onsubmit = function(ev) {
	ev.preventDefault();
	// Send File Element to upload
	var formData = $('#eventform_edit').serializeArray()
	//console.log('iwashere')
	//console.log($('#eventform_edit').closest('.eventinfo').children());
	y = {}
	DATETIME = ""
	for (i = 0; i<formData.length;i++){
		key = formData[i].name
		if(formData[i].value!==''){
			if(key === "eventname"){
				y['local.Title'] = formData[i].value	
			}
			else if(key === "description"){
				y['local.Description'] = formData[i].value
			}
			else if(key === "venue"){
				y['local.LOCATION'] = formData[i].value
			}
			else if(key === "date"){
				DATETIME = formData[i].value
			}
			else if(key === "time"){
				DATETIME = DATETIME +'T'+formData[i].value
			}
		}
	}
	y['local.DATETIME'] = DATETIME
	y['id'] = event_id
	event_id = ""
	socket.emit('updateEvent',y)
	//console.log(formData)
	return true
};

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
