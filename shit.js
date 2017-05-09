newdiv = document.createElement('div'); 
			newdiv.className = "row searchResult"+(i+1);
			child1 = document.createElement('div'); 
			child1.className = "col-sm-2 eventpic_spg"
			img = document.createElement('img');
			img.src = "data/lums_pics.png"
			child1.append(img)
			newdiv.append(child1)
			child2 = document.createElement('div'); 
			child2.className = "col-md-8 eventInfo_spg"
			h4 = document.createElement('h4');
			h4.append("CSO: Internship seminar") 
			child2.append(h4)
			p4 = document.createElement('p');
			p4.append("Seminar for all student related FAQs. Please be on time...read more")
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
			p.append('31 March - 2 June')
			p.append(b)
			p.append('3:30pm - 6:30pm')
			p.append(b1)
			p.append('Bedian road, Lahore')
			child3Child.append(p)
			child3.append(child3Child)
			newdiv.append(child3)
			console.log(newdiv)
			$(".search_feed").append(newdiv)