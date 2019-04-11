
 var api_key = 'cd0fcc9ee9e5b3710c59881c23299809';
 var api_key_weather = '1725f80349b6e441b93de80777b0c6dc';
 var loading = document.createElement('h1');
 loading.id = "loading";
 loading.textContent = "Loading Information...";
 document.body.appendChild(loading);
	
 fetch('http://api.ipstack.com/check?access_key=' + api_key)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
	let longitude = Number(myJson["longitude"]);
	let latitude = Number(myJson["latitude"]);
	fetch('http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude + '&appid='+api_key_weather + "&units=imperial")
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
	 var e = document.getElementById("loading");
	 e.parentNode.removeChild(e);
	  daily_append(myJson);
	
	
	fetch('http://api.openweathermap.org/data/2.5/forecast?lat='+latitude+'&lon='+longitude + '&appid='+api_key_weather + "&units=imperial")
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
	output = document.getElementById("response2");
	let count = Number(myJson["cnt"]);
	console.log(count);
	
	for ( i = 0; i < count; i++) {
		var div_5day = document.createElement('div');
		div_5day.id = "day";
		let current_day = convert(Number(myJson["list"][i]["dt"]));
		let condition = (JSON.stringify(myJson["list"][i]["weather"][0]["description"])).slice(1, -1);
		let temp = Number(myJson["list"][i]["main"]["temp"]);
		let humid = Number(myJson["list"][i]["main"]["humidity"]);
		let pressure = Number(myJson["list"][i]["main"]["pressure"]);
		var p = document.createElement('p');
		p.textContent = current_day;
		var p1 = document.createElement('p');
		p1.textContent = "Condition:  "+ condition;
		var p2 = document.createElement('p');
		p2.textContent = "Temperature:  " + temp + " *F";
		var p3 = document.createElement('p');
		p3.textContent = "Humidity:  " + humid + "%";
		var p4 = document.createElement('p');
		p4.textContent = "Pressure:  " + pressure + " hpa";
		var linebreak = document.createElement('br');
		div_5day.appendChild(p);
		div_5day.appendChild(p2);
		div_5day.appendChild(p1);
		div_5day.appendChild(p3);
		div_5day.appendChild(p4);
		//div_5day.appendChild(linebreak);
		response.appendChild(div_5day);
	}
	
	});
	});
  });
  
  
function convert(timestamp) {
var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var d = new Date(timestamp * 1000),
		yyyy = d.getFullYear(),
		mm = ('0' + (d.getMonth() + 1)).slice(-2),
		dd = ('0' + d.getDate()).slice(-2),
		hh = d.getHours(),
		h = hh,
		min = ('0' + d.getMinutes()).slice(-2),	
		ampm = 'AM',
		time;
			
	if (hh > 12) {
		h = hh - 12;
		ampm = 'PM';
	} else if (hh === 12) {
		h = 12;
		ampm = 'PM';
	} else if (hh == 0) {
		h = 12;
	}
	
	month = months[Number(mm)];
	time = month + " " + dd + " " + yyyy +' at ' + h + ':' + min + ' ' + ampm;
		
	return time;
}

function daily_append(myJson) {
 var daily_results = document.getElementById('response');
	//console.log(JSON.stringify(myJson));
	let current_temp = Number(myJson["main"]["temp"]);
	let current_condition = (JSON.stringify(myJson["weather"][0]["description"])).slice(1, -1);
	let current_humidity = Number(myJson["main"]["humidity"]);
	let current_pressure = Number(myJson["main"]["pressure"]);
	let current_date = Number(myJson["dt"]);
	let current_date_string= convert(current_date);
	var daily_div = document.createElement('div');
	daily_div.id = "daily";
	var linebreak = document.createElement('br');
	var heading = document.createElement('h2');
	heading.textContent = "Conditions on " + current_date_string;
	var para1 = document.createElement('p');
	para1.textContent = "Temperature:  " + current_temp + " *F ";
	para1.appendChild(linebreak);
	var para2 = document.createElement('p');
	para2.textContent = "Condition:  " + current_condition;
	para2.appendChild(linebreak);
	var para3 = document.createElement('p');
	para3.textContent = " Humidity:  " + current_humidity + "% ";
	para3.appendChild(linebreak);
	var para4 = document.createElement('p');
	para4.textContent = " Pressure:  " + current_pressure + " hpa";
	para4.appendChild(linebreak);
	daily_div.appendChild(heading);
	daily_div.appendChild(para1);
	daily_div.appendChild(para2);
	daily_div.appendChild(para3);
	daily_div.appendChild(para4);
	daily_results.appendChild(daily_div);
}