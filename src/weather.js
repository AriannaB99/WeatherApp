var app = new Vue({
  el: '#app',
  data: {
	  forecast_list: null,
	  daily_list: null,
	  curr_date: null,
	  count: 0,
	  dates: [],
  },
  methods: {
    cycle: function () {
      console.log("clicked");
    }
  }
	,
  created(){
	 var api_key = 'cd0fcc9ee9e5b3710c59881c23299809';
	 var api_key_weather = '1725f80349b6e441b93de80777b0c6dc';
		
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
		  app.daily_list = myJson;
		  app.curr_date = convert(Number(app.daily_list.dt));
//console.log(app.daily_list);
		
		
		fetch('http://api.openweathermap.org/data/2.5/forecast?lat='+latitude+'&lon='+longitude + '&appid='+api_key_weather + "&units=imperial")
	  .then(function(response) {
		return response.json();
	  })
	  .then(function(myJson) {
		app.forecast_list = myJson;
		console.log(app.forecast_list);
		app.count = Number(app.forecast_list.list.length);
		for (i = 0; i < app.count; i++) {
			app.dates.push(convert(Number(app.forecast_list.list[i].dt)));
		}
	
		});
		});
	  });
	
}
})


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

  

