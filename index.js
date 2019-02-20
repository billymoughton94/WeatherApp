// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';

export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true});
	}

	//=======================================
	//=============== API FETCH =============
	fetchAPIs = () => {
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
		this.setState({visibleImg : true});
		var url = "http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=dc5c2808dc2c8fd769f66c7deaae5130";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseWeatherResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
		this.setState({ display: false});

	}
//============================================================
//============================================================

//============================================================
//=============== FORCAST DATA FETCH AND DISPLAY =============
	fetchForecastData = () => {
		var url = "http://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&APPID=dc5c2808dc2c8fd769f66c7deaae5130";
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
		var url = "https://api.tfl.gov.uk/Line/Mode/tube/Status?detail=true&app_id=2cf7f9a8&app_key=%20%20%20%2001aef9b37ed476700c32051e34bc4b83";
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

			case 801: case 802: case 803:
			case 804: return '../../assets/icons/Large_cloudy.png';

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

			case 801: case 802: case 803:
			case 804: return '../../assets/icons/Small_cloudy.png';

			case 800: return  '../../assets/icons/Small_sun_icon.png';

			default: return;
		}
	}
//==================================================
//==================================================

//==========================================
//=============== GET WEEKEDAY =============

getDayofWeek(day) {
	switch(day) {
		case 0: return "Sunday";
		case 1: return "Monday";
		case 2: return "Tuesday";
		case 3: return "Wednesday";
		case 4: return "Thursday";
		case 5: return "Friday";
		case 6 : return "Saturday";
	}
}
//==========================================
//==========================================


//==================================
//=============== MAIN =============

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		const forecastStyles = this.state.temp ? `${style.forecasts} ${style.filled}` : style.forecasts;

		// display all weather data
		return (
			<div class={ style.container }>
				<div class={ style.header }>
					<div class={ style.city }>{ this.state.locate} {this.state.country }</div>
					<span class={ tempStyles }> <img src = {this.mainWeatherSymbol(this.state.code)} />  { this.state.temp }</span>
					<div class={ style.conditions }>{ this.state.cond }</div>
					<div class = {style.forecasts} >
						<div>
							<img src = {this.forecastWeatherSymbol(this.state.d1code)} /> <br/>
							<span class = {forecastStyles}> {this.state.d1temp}	</span> <br/>
							<span class = { style.conditions }> {this.state.d1cond}	</span>
							<span> {this.state.d1day}	</span>
						</div>
						<div>
							<img src = {this.forecastWeatherSymbol(this.state.d2code)} /> <br/>
							<span class = {forecastStyles}> {this.state.d2temp}	</span> <br/>
							<span class = { style.conditions }> {this.state.d2cond}	</span>
						</div>
						<div>
							<img src = {this.forecastWeatherSymbol(this.state.d3code)} /> <br/>
							<span class = {forecastStyles}> {this.state.d3temp}	</span> <br/>
							<span class = { style.conditions }> {this.state.d3cond}	</span>
						</div>
						<div>
							<img src = {this.forecastWeatherSymbol(this.state.d4code)} /> <br/>
							<span class = {forecastStyles}> {this.state.d4temp}	</span> <br/>
							<span class = { style.conditions }> {this.state.d4cond}	</span>
						</div>
						<div>
							<img src = {this.forecastWeatherSymbol(this.state.d5code)} /> <br/>
							<span class = {forecastStyles}> {this.state.d5temp}	</span> <br/>
							<span class = { style.conditions }> {this.state.d5cond}	</span>

						</div>
					</div>
				</div>
				<div class={ style.details }> </div>
				<div class= { style_iphone.container }>
					{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.fetchAPIs } /> : null }
				</div>
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
			locate: location,
			country: countryName,
			temp: temp_c,
			cond : conditions,
			code : condCode,
		});
	}





	parseForecastResponse = (parsed_json) => {
		var day1temp = parsed_json['list'] ['0'] ['main'] ['temp'];
		var day1conditions = parsed_json['list'] ['0'] ['weather']['0']['description'];
		var day1condCode = parsed_json['list'] ['0'] ['weather']['0']['id'];

		var day1 = (parsed_json['list']['0']['dt_txt']); // ?????


		var day2temp = parsed_json['list'] ['8'] ['main'] ['temp'];
		var day2conditions = parsed_json['list'] ['8'] ['weather']['0']['description'];
		var day2condCode = parsed_json['list'] ['8'] ['weather']['0']['id'];

		var day3temp = parsed_json['list'] ['16'] ['main'] ['temp'];
		var day3conditions = parsed_json['list'] ['16'] ['weather']['0']['description'];
		var day3condCode = parsed_json['list'] ['16'] ['weather']['0']['id'];

		var day4temp = parsed_json['list'] ['24'] ['main'] ['temp'];
		var day4conditions = parsed_json['list'] ['24'] ['weather']['0']['description'];
		var day4condCode = parsed_json['list'] ['24'] ['weather']['0']['id'];

		var day5temp = parsed_json['list'] ['32'] ['main'] ['temp'];
		var day5conditions = parsed_json['list'] ['32'] ['weather']['0']['description'];
		var day5condCode = parsed_json['list'] ['32'] ['weather']['0']['id'];


		this.setState({
			d1temp : day1temp,
			d1cond : day1conditions,
			d1code : day1condCode,
			d1day : day1,

			d2temp : day2temp,
			d2cond : day2conditions,
			d2code : day2condCode,

			d3temp : day3temp,
			d3cond : day3conditions,
			d3code : day3condCode,

			d4temp : day4temp,
			d4cond : day4conditions,
			d4code : day4condCode,

			d5temp : day5temp,
			d5cond : day5conditions,
			d5code : day5condCode,
		});
	}







	parseTFLResponse = (parsed_json) => {
		var tflstatus = parsed_json['0']['name'];
		var tfltest = "HELLO WORLD";

		this.setState({
			tfl: tflstatus,
			tfltest: tfltest
		});
	}
}
