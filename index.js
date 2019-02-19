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
		this.setState({ display: true, visibleImg : false  });
	}

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
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
		this.setState({ display: false});

	}
//============================================================
//============================================================

//============================================================
//=============== FORCAST DATA FETCH AND DISPLAY =============
	fetchForcastData = () => {
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




//==================================
//=============== MAIN =============

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;

		// display all weather data
		return (
			<div class={ style.container }>
				<div class={ style.header }>
					<div class={ style.city }>{ this.state.locate} {this.state.country }</div>
					<span class={ tempStyles }> {this.state.visibleImg ? (<img src = {this.mainWeatherSymbol(this.state.code)} />) : null}  { this.state.temp }</span>
					<div class={ style.conditions }>{ this.state.cond }</div>
					{this.state.visibleImg ? (<div> <h1> TEST </h1> </div>) : null}
				</div>
				<div class={ style.details }></div>
				<div class= { style_iphone.container }>
					{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.fetchWeatherData } /> : null }
				</div>
			</div>
		);
	}

//==================================
//==================================



	parseResponse = (parsed_json) => {
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

	}
}
