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
		this.setState({display:true, toggle: true});
		this.fetchAPIs();
		this.celToFarConvert = this.celToFarConvert.bind(this);
		this.farToCelConvert = this.farToCelConvert.bind(this);
	}

	//=======================================
	//=============== API FETCH =============
	fetchAPIs (){
		this.fetchWeatherData.call();
		this.fetchForecastData.call();
		this.fetchTflData.call();
	}
	//=======================================
	//=======================================

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


//==================================
//=============== MAIN =============

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		const forecastStyles = this.state.temp ? `${style.forecasts} ${style.filled}` : style.forecasts;
		var time = this.getTime();
		let main = (<div class={ time >= 19 || time < 6 ? style.containerDark : style.containerLight }>
						<div class={ style.header }>
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
							<div class={ style.conditions }>
								{ this.state.cond }
							</div>
							<div class = {style.forecasts} >
								<table>
									<tr>
										{this.state.days.map((item, key) => {
											return <td key={key}>{item}</td>
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
										return <td style = "width: 80px;" key = {key}> {item} </td>
										})}
									</tr>
								</table>
							</div>
							<div style = "overflow: auto; height: 350px;">
								{this.state.tfl}
							</div>
						</div>
					</div>);
					let otherPage = (<div><p>{JSON.stringify(this.state.d)}</p></div>)
		return (
			<span>{true ? main : otherPage}</span>
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
			locate: location,
			country: countryName,
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
		var day1temp = Math.round(parsed_json['list'] ['0'] ['main'] ['temp']);
		var day1conditions = parsed_json['list'] ['0'] ['weather']['0']['description'];
		var day1condCode = parsed_json['list'] ['0'] ['weather']['0']['id'];
		var day1=(parsed_json['list']['5']['dt_txt'])
		var day1_n=new Date(day1)
		var b = day1.split("-")
	  var j = b[2].split(" ")
		var day1_t= this.getDayofWeek(day1_n.getDay())+ " " + j[0]


		var day2temp = Math.round(parsed_json['list'] ['8'] ['main'] ['temp']);
		var day2conditions = parsed_json['list'] ['8'] ['weather']['0']['description'];
		var day2condCode = parsed_json['list'] ['8'] ['weather']['0']['id'];
		var day2=(parsed_json['list']['13']['dt_txt'])
		var day2_n=new Date(day2)
		var b = day2.split("-")
	  var j = b[2].split(" ")
		var day2_t= this.getDayofWeek(day2_n.getDay())+ " " + j[0]


		var day3temp = Math.round(parsed_json['list'] ['16'] ['main'] ['temp']);
		var day3conditions = parsed_json['list'] ['16'] ['weather']['0']['description'];
		var day3condCode = parsed_json['list'] ['16'] ['weather']['0']['id'];
		var day3 = (parsed_json['list']['21']['dt_txt'])
		var day3_n=new Date(day3)
		var b = day3.split("-")
	  var j = b[2].split(" ")
		var day3_t= this.getDayofWeek(day3_n.getDay())+ " " + j[0]

		var day4temp = Math.round(parsed_json['list'] ['24'] ['main'] ['temp']);
		var day4conditions = parsed_json['list'] ['24'] ['weather']['0']['description'];
		var day4condCode = parsed_json['list'] ['24'] ['weather']['0']['id'];
		var day4=(parsed_json['list']['29']['dt_txt'])
		var day4_n=new Date(day4)
		var b = day4.split("-")
		var j = b[2].split(" ")
		var day4_t= this.getDayofWeek(day4_n.getDay())+ " " + j[0]

		var day5temp = Math.round(parsed_json['list'] ['32'] ['main'] ['temp']);
		var day5conditions = parsed_json['list'] ['32'] ['weather']['0']['description'];
		var day5condCode = parsed_json['list'] ['32'] ['weather']['0']['id'];
		var day5 = (parsed_json['list']['38']['dt_txt'])
		var day5_n=new Date(day5)
		var b = day5.split("-")
		var j = b[2].split(" ")
		var day5_t= this.getDayofWeek(day5_n.getDay())+ " " + j[0]

		////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////

		// ARRAY FOR DAYS AND DATES
		let day = [];
		day.push(day1_t);
		day.push(day2_t);
		day.push(day3_t);
		day.push(day4_t);
		day.push(day5_t);

		//ARRAY FOR DAILY CONDITION IMAGES
		let condCodes = [];
		condCodes.push(day1condCode);
		condCodes.push(day2condCode);
		condCodes.push(day3condCode);
		condCodes.push(day4condCode);
		condCodes.push(day5condCode);


		// ARRAY FOR FORECASTED TEMPS
		let dailyForecasts = [];
		dailyForecasts.push(day1temp);
		dailyForecasts.push(day2temp);
		dailyForecasts.push(day3temp);
		dailyForecasts.push(day4temp);
		dailyForecasts.push(day5temp);

		// ARRAY FOR DAILY conditions
		let dailyConditions = [];
		dailyConditions.push(day1conditions);
		dailyConditions.push(day2conditions);
		dailyConditions.push(day3conditions);
		dailyConditions.push(day4conditions);
		dailyConditions.push(day5conditions);


		this.setState({
			days: day,
			forecasts: dailyForecasts,
			conds: dailyConditions,
			condImages: condCodes
		});
	}


	parseTFLResponse = (parsed_json) =>
	{
		let tflList;

			let tflLines = parsed_json.map((x) => {
				let desc = x['lineStatuses'][0]['statusSeverityDescription'];
				let name = x['name'];
				let res = x['lineStatuses'] ['0'] ['reason'];
				return {name,desc, res}
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

			this.setState({
				tfl: tflList
			});
	}
}
