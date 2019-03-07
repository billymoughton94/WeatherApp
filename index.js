// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		this.state.celColour = 'white';
		this.state.farColour = 'grey';
		this.state.forecasts = [];
		this.state.days = [];
		this.state.conds = [];
		this.state.condImages = [];
		// button display state
		this.fetchAPIs();
		this.setState({display:true, toggle: true, toggle_page:true});
		this.celToFarConvert = this.celToFarConvert.bind(this);
		this.farToCelConvert = this.farToCelConvert.bind(this);
		this.toggle_func = this.toggle_func.bind(this);
		this.fetchLocation  = this.fetchLocation.bind(this,'paramater');
	}

	//=======================================
	//=============== API FETCH =============
	fetchAPIs (){
		this.fetchWeatherData.call();
		this.fetchForecastData.call();
		this.fetchTflData.call();
		this.fetchLocation.call();
	}
//=======================================================
//=======================================================

fetchLocation= ()=>{
	let a = navigator.geolocation.getCurrentPosition((pos)=>
	{
		var crd=pos.coords;
		var lat= crd.latitude;
		var long = crd.longitude
		var url ="https://api.opencagedata.com/geocode/v1/json?q="+lat+"%2C"+long+"&key=8a1a6919cb5c4c778263f39ee5503d98&pretty=1"
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseLocationResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})

	})

}

//============================================================
//=============== WEATHER DATA FETCH AND DISPLAY =============

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=a22d157664c6fbc5a70d03449d24bab3";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseWeatherResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
	}
//============================================================
//============================================================

//============================================================
//=============== FORCAST DATA FETCH AND DISPLAY =============
	fetchForecastData = () => {
		var url = "http://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&APPID=a22d157664c6fbc5a70d03449d24bab3";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseForecastResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})

	}
//============================================================
//============================================================


//============================================================
//=============== TFL DATA FETCH AND DISPLAY =============
	fetchTflData = () => {
		var url = "https://api.tfl.gov.uk/Line/Mode/tube%2Cdlr%2Coverground/Status?detail=true&app_id=2cf7f9a8&app_key=%20%20%20%2001aef9b37ed476700c32051e34bc4b83";
		$.ajax({
			url: url,
			dataType: "json",
			success : this.parseTFLResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})

	}

//============================================================
//============================================================

//==================================================
//=============== WEATHER ICON FETCH =============

	mainWeatherSymbol(conditionsCode) {
		// "../../assets/icons/Large_sunny.png"

		switch (conditionsCode) {
			case 300: case 301: case 302: case 310: case 311:
			case 312: case 313: case 314: case 321: return '../../assets/icons/Large_rain.png';

			case 500: case 501: case 502: case 503:
			case 504: case 511: case 520: case 521:
			case 522: case 531: return '../../assets/icons/Large_rain.png';

			case 600: case 601: case 602: case 611:
			case 612: case 615: case 616: case 620:
			case 621: case 622: return '../../assets/icons/Large_snow.png';

			case 802: case 803:
			case 804: return '../../assets/icons/Large_cloudy.png';

			case 801: '../../assets/icons/Large_partly_sunny.png';

			case 800: return  '../../assets/icons/Large_sunny.png';

			default: return;
		}
	}
//==================================================
//==================================================

//==================================================
//=============== FORECASTS ICON FETCH =============

	forecastWeatherSymbol(conditionsCode) {
		// "../../assets/icons/Large_sunny.png"

		switch (conditionsCode) {
			case 300: case 301: case 302: case 310: case 311:
			case 312: case 313: case 314: case 321: return '../../assets/icons/Small_rain.png';

			case 500: case 501: case 502: case 503:
			case 504: case 511: case 520: case 521:
			case 522: case 531: return '../../assets/icons/Small_rain.png';

			case 600: case 601: case 602: case 611:
			case 612: case 615: case 616: case 620:
			case 621: case 622: return '../../assets/icons/Small_snow.png';

			case 802: case 803:
			case 804: return '../../assets/icons/Small_cloudy.png';

			case 801: return '../../assets/icons/Small_partly_sunny.png';

			case 800: return  '../../assets/icons/Small_sun_icon.png';

			default: return;
		}
	}
//==================================================
//==================================================

//==========================================
//=============== GET WEEKEDAY =============

getDayofWeek(day)
{
	switch(day)
		{
			case 0: return "Sun";
			case 1: return "Mon";
			case 2: return "Tue";
			case 3: return "Wed";
			case 4: return "Thu";
			case 5: return "Fri";
			case 6: return "Sat";
			default: return;
		}
}
//==========================================
//==========================================


//==============TEMPERATURE CONVERT========================
//=============================================
celToFarConvert() {
	var newMainTemp = (this.state.temp * (9/5)) + 32;
	newMainTemp = Math.round(newMainTemp);

	var newVals = this.state.forecasts.slice();
	 newVals = newVals.map((item) => {
		item = (item * (9/5)) + 32;
		item = Math.round(item);
		return item;
	})

	this.setState({
		temp: newMainTemp,
		forecasts: newVals,
		toggle: false,
		celColour: "grey",
		farColour: "white"
	});
}
//=============================================
//=============================================

farToCelConvert() {
	var newMainTemp = (this.state.temp - 32) * (5/9) ;
	newMainTemp = Math.round(newMainTemp);

	var newVals = this.state.forecasts.slice();
	 newVals = newVals.map((item) => {
		item = (item - 32) * (5/9);
		item = Math.round(item);
		return item;
	})

	this.setState({
		temp: newMainTemp,
		forecasts: newVals,
		toggle: true,
		farColour: "grey",
		celColour: "white"
	});
}




//=============GET TIME=================
//=======================================
getTime() { // EDIT THIS
	var date = new Date();
	return date.getHours();
}

//=======================================
//=======================================
toggle_func(){
	if (this.state.toggle_page==true)
	{
		this.setState({toggle_page:false})
	}
	else
	{
		this.setState({toggle_page:true})
	}
}


//==================================
//==================================
defaultLocation() {
	var location = prompt("Please enter your location");

}
//==================================
//==================================

filter_tfl_lines() {
	{/*var updatedTFL = this.state.tfl_checkList.map((x) => {
		if(x.checked) {
			return x;
		}
	}) */}


}


//==================================
//=============== MAIN =============

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		const forecastStyles = this.state.temp ? `${style.previewForecastsHigh} ${style.filled}` : style.forecasts;
		var time = this.getTime();
		let main = (<div class={ style.header }>
							<div class={ style.city }>
								{ this.state.locate}, {this.state.country }
							</div>
							<div style = "height: 90px;">
								<span class={ tempStyles }> <img src = {this.mainWeatherSymbol(this.state.code)} />  { this.state.temp } </span>
								<div class = {style.units}>
									<h1 style = {{color: this.state.celColour}}	onClick = {this.state.toggle == false ? this.farToCelConvert : null}> C </h1>
									<h1 style = {{color: this.state.farColour}} onClick = {this.state.toggle ? this.celToFarConvert : null}> F </h1>
								</div>
							</div>
							<div>
								<table align="center">
									<tr>
										<td class={ style.currentConditions }>{this.state.cond}</td>
									</tr>
									<tr>
										<td class={ style.lastUpdated }>Last updated {this.state.time}</td>
									</tr>

									<tr>
										<td class={ style.dailyLook }>Daily Look</td>
									</tr>
								</table>
							</div>
							<div class = {style.forecasts} >
								<table>
									<tr>
										{this.state.days.map((item, key) => {
											return <td class ={style.dates} key={key}>{item}</td>
										})}
									</tr>
									<tr>
										{this.state.condImages.map((item, key) => {
										return <td key={key}>{<img src = {this.forecastWeatherSymbol(item)}/>}</td>
										})}
									</tr>
									<tr>
										{this.state.forecasts.map((item, key) => {
											return <td class = {forecastStyles} key = {key}> {item} </td>
										})}
									</tr>

									<tr>
										{this.state.conds.map((item, key) => {
										return <td style = "width: 80px; class={ style.predictedConditions }" key = {key}> {item} </td>
										})}
									</tr>
								</table>
							</div>
							<div style = "overflow: auto; height: 300px;">
								{this.state.tfl}
							</div>
							<div class={style.footer}>
							<button onclick={this.toggle_func}>Settings</button>
							</div>
						</div>);

		let otherPage = (
						<div class={ style.header }>
							<div class={ style.city }>
								Settings
							</div>
							<h2> TFL Line Filter </h2>
							<h4> Select the lines interesting to you </h4>






							{this.state.tfl_checkList}

							<input type = "submit" value = "Confirm" onClick = {this.filter_tfl_lines()}> </input>







							<div class={style.footer}>
							<button onclick={this.toggle_func}>Back</button>
							<button onClick = {this.defaultLocation}> Set Location </button>
							</div>
						</div>);
		return (
			<div class={ time >= 19 || time < 6 ? style.containerDark : style.containerLight }>
			<span>{this.state.toggle_page==true ? main : otherPage}</span>
			</div>
		);
	}

//==================================
//==================================


	parseWeatherResponse = (parsed_json) => {
		var location = parsed_json['name'];
		var countryName = parsed_json['sys']['country'];
		var temp_c = parseInt(parsed_json['main']['temp']);
		var conditions = parsed_json['weather']['0']['description'];
		var condCode = parsed_json['weather']['0']['id'];
		// set states for fields so they could be rendered later on
		this.setState({

			temp: temp_c,
			cond : conditions,
			code : condCode,
		});
	}

	parseForecastResponse = (parsed_json) => {
		this.setState({
			forcasts: [],
			days: [],
			conds: [],
			condImages: []
		})
		var forecast = new Array(5);
		for(var i =0 ; i<5;i++)
		{
			forecast[i]= Math.round(parsed_json['list'] [i*8] ['main'] ['temp']);
		}
		var conditions = new Array(5);
		for(var i =0 ; i<5;i++)
		{
			conditions[i]= parsed_json['list'] [i*8] ['weather']['0']['description'];
		}

		var condcode = new Array(5)
		for(var i =0 ; i<5;i++)
		{
			condcode[i]= parsed_json['list'] [i*8] ['weather']['0']['id'];
		}

		var day = new Array(5)
		for(var i =0 ; i<5;i++)
		{
			let day1=(parsed_json['list'][(i*8)+5]['dt_txt'])
			let day1_n=new Date(day1)
			let b = day1.split("-")
			let j = b[2].split(" ")
			day[i]= this.getDayofWeek(day1_n.getDay())+ " " + j[0]
		}

		this.setState({
			days: day,
			forecasts: forecast,
			conds: conditions,
			condImages: condcode
		});
	}


	parseTFLResponse = (parsed_json) =>
	{
		this.setState({
			tfl_name:[]
		})
		let tflList;

			let tflLines = parsed_json.map((x) => {
				let desc = x['lineStatuses'][0]['statusSeverityDescription'];
				let res = x['lineStatuses'] ['0'] ['reason'];
				return {desc, res}
			})


			// Return certain lines based on their severity status
			let tflLinesAffected = tflLines.filter((x) => {
				return x.desc != "Good Service" //"Good Service"

			})

			if (tflLinesAffected.length == 0) {
				tflList =  <p style = "background-color: green; margin: 0;">All lines are in good service</p>;
			}
			else {
			 tflList = tflLinesAffected.map(item =>
				<div class = {style.tflContainer}>
					<img src = '../../assets/icons/Bubble1.png' />
						<div class = {style.TEXT}>{item.res}</div>
				</div>)
			}

			/////////////////////////////////////////////////////////////////

			let tflName=parsed_json.map((x)=>{
				let name =x['name']
				return {name}
			})

			tflName =tflName.map(item =>
			 	<div class = {style.tflContainer}>
					{item.name} <input type = "checkbox" value={item}> </input>
			 	</div>)

		 /////////////////////////////////////////////////////////////////

			this.setState({
				tfl: tflList,
				tfl_checkList: tflName
			});
	}

	parseLocationResponse = (parsed_json) =>{
		let location= parsed_json['results'][0]['components']['suburb']
		let city = parsed_json['results'][0]['components']['city']
		var time = parsed_json['timestamp']['created_http']
		var time_t= time.split(" ")
		time_t= time_t[4]
		time_t=time_t.split(":")
		time_t=time_t[0]+":"+time_t[1]

		this.setState({
			locate: location,
			country: city,
			time:time_t
		})
	}
}
