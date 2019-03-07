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

		// setting the states for various items in the Iphone Component
		this.state.temp = "";
		this.state.celColour = 'white';
		this.state.farColour = 'grey';
		this.state.forecasts = [];
		this.state.days = [];
		this.state.conds = [];
		this.state.condImages = [];

		// calling the apis
		this.fetchAPIs();

		this.setState({display:true, toggle: true, toggle_page:true});


		// binding functions to the component instance
		this.celToFarConvert = this.celToFarConvert.bind(this);
		this.farToCelConvert = this.farToCelConvert.bind(this);
		this.toggle_func = this.toggle_func.bind(this);
		this.gettflLogo = this.gettflLogo.bind(this);
	}



	//=======================================
	//=======================================
	//=======================================
	//=============== API FETCH =============		DESCRIPTION: FUNCTION WILL MAKE A CALL TO THE API'S USED
	fetchAPIs (){
		//these api call calls up
		this.fetchLocation.call();
		this.fetchWeatherData.call();
		this.fetchForecastData.call();
		this.fetchTflData.call();
		// this.fetchBus.call();
	}
	//=======================================
	//=======================================
	//=======================================
	//=======================================



//=======================================================
//=======================================================
//=======================================================
//================LOCATION API=========================== 		DESCRIPTION: LOCATION API WILL RETURN COORDINATES AND DETAILS OF USER'S LOCATION

fetchLocation= ()=>{
	let a =navigator.geolocation.getCurrentPosition((pos)=>
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

//=======================================================
//=======================================================
//=======================================================
//=======================================================



//============================================================
//============================================================
//============================================================
//=============== WEATHER DATA FETCH AND DISPLAY ============= 		DESCRIPTION: API WILL FETCH DETAILS ABOUT TODAY'S WEATHER

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		let a =navigator.geolocation.getCurrentPosition((pos)=>
		{
			var crd=pos.coords;
			var lat= crd.latitude;
			var long = crd.longitude
			var url = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&units=metric&APPID=a22d157664c6fbc5a70d03449d24bab3";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseWeatherResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
			})
		})
	}
//============================================================
//============================================================
//============================================================
//============================================================



//============================================================
//============================================================
//============================================================
//=============== FORCAST DATA FETCH AND DISPLAY ============= 		DESCRIPTION: API WILL FETCH DETAILS ABOUT WHEATHER IN THE NEXT 5 DAYS

	fetchForecastData = () => {
		let a =navigator.geolocation.getCurrentPosition((pos)=>
		{
			var crd=pos.coords;
			var lat= crd.latitude;
			var long = crd.longitude
		var url = "http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+long+"&units=metric&APPID=a22d157664c6fbc5a70d03449d24bab3";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseForecastResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
	})

	}
//============================================================
//============================================================
//============================================================
//============================================================



//============================================================
//============================================================
//============================================================
//=============== TFL DATA FETCH AND DISPLAY ============= 		DESCRIPTION: API WILL FETCH TFL TRAIN LINE DETAILS AND THEIR CONDITIONS

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
//============================================================
//============================================================



//================================================
//================================================
//================================================
//=============== WEATHER ICON FETCH ============= 		DESCRIPTION: MAIN WEATHER ICON WILL BE SET ACCORDING TO THE WEATHER CONDITIONS

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
//================================================
//================================================
//================================================
//================================================



//==================================================
//==================================================
//==================================================
//=============== FORECASTS ICON FETCH ============= 		DESCRIPTION: FORECASTED WEATHER ICONS WILL BE SET ACCORDING TO FORECASTED CONDITIONS

	forecastWeatherSymbol(conditionsCode) {

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
//==================================================
//==================================================


//==========================================
//==========================================
//==========================================
//=============== GET WEEKEDAY ============= 		DESCRIPTION: DAY OF THE WEEK WILL BE RETURNED FOR EACH FORECASTED DAY LISTED

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
//==========================================
//==========================================



//=============================================
//=============================================
//=============================================
//=======CELCIUS TO FARENHEIT CONVERT========== 		DESCRIPTION: UNIT OF MEASUREMENT FOR WEATHER IS CHANGED FROM CELCIUS TO FARENHEIT

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
//=============================================
//=============================================



//=============================================
//=============================================
//=============================================
//=======FARENHEIT TO CELCIUS CONVERT==========  		DESCRIPTION: UNIT OF MEASUREMENT FOR WEATHER IS CHANGED FROM FARENHEIT TO CELCIUS


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
//=============================================
//=============================================
//=============================================
//=============================================



//=======================================
//=======================================
//=======================================
//=============GET TIME==================   		DESCRIPTION: CURRENT TIME IS RETRIEVED FROM A DATE OBJECT (TO BE USED TO DETERMINE DAY/NIGHT MODE)

getTime() { // EDIT THIS
	var date = new Date();
	return date.getHours();
}
//=======================================
//=======================================
//=======================================
//=======================================



//=======================================
//=======================================
//=======================================
//=============SWITCH PAGE===============   		DESCRIPTION: TOGGLE THAT WILL SWITCH PAGES ON CLICK OF A BUTTON

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
//=======================================
//=======================================
//=======================================
//=======================================



//=============================================================================
//=============================================================================
//=============================================================================
//==============================MAIN PAGE =====================================   		DESCRIPTION: ALL ELEMENTS OF THE MAIN PAGE, INCLUDING WEATHER AND TRANSPORT INFO

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		const forecastStyles = this.state.temp ? `${style.previewForecastsHigh} ${style.filled}` : style.previewForecastsHigh;
		var time = this.getTime();
		let main = (<div class={ style.header }>
							<div class={ style.city }>
								{ this.state.locate}, {this.state.country }
							</div>
							<div style = "height: 85px;">
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
							<div>
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
										return <td style = "width: 80px;" class={ style.predictedConditions } key = {key}> {item} </td>
										})}
									</tr>
								</table>
							</div>
							<div style = "overflow: auto; height: 300px;">
								{this.state.tfl}
							</div>
							<div class={style.footer}>
							<button onclick={this.toggle_func}><span>Settings</span></button>
							</div>
						</div>);

//=============================================================================
//=============================================================================
//=============================================================================
//=============================================================================



//=============================================================================
//=============================================================================
//=============================================================================
//==============================SETTINGS PAGE =================================   		DESCRIPTION: SETTINGS PAGE THAT WILL LET USER FILTER TRANSPORT OPTIONS TO SUIT THEM

		let otherPage = (
						<div class={ style.header }>
							<div class={ style.title }>
								Settings
							</div>
								<table>
									{/*<tr>
										<td class={ style.tflline }>TFL Line Filter</td>
									</tr> */}
									<tr>
										<td class={ style.interestingline }>Select the lines interesting to you</td>
									</tr>
								</table>
							<form style = "margin: 5px;">
							{this.state.tfl_Options}
							</form>
							<div class={style.footer}>
							<button onclick={this.toggle_func}><span>Back</span></button>
							</div>
						</div>);




//=============================================================================
//=============================================================================
//=============================================================================
//=============================================================================


//==================================
//==================================

// RETURN APPROPRIATE PAGE / TOGGLE DAY-NIGHT MODE

						return (
							<div>
							{this.state.toggle_page ?
								(<div class={ time >= 19 || time < 6 ? style.containerDark : style.containerLight }>
								<span> {main} </span>
								</div>)
								:
								(<div class= {style.settings}>
								<span> {otherPage} </span>
								</div>)
							};
							</div>
					)
	}
//==================================
//==================================


//=======================================
//=======================================
//=======================================
//=======MAIN WEATHER API RESPONSE=======   		DESCRIPTION: VARIABLES RETRIEVED FROM MAIN WEATHER API WILL STORE VARIABLES IN COMPONENT STATES

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
//=======================================
//=======================================
//=======================================
//=======================================



//=======================================
//=======================================
//=======================================
//==5-DAY FORECAST WEATHER API RESPONSE==    		DESCRIPTION: VARIABLES RETRIEVED FROM FORECASTED WEATHER API WILL STORE VARIABLES IN COMPONENT STATES

	parseForecastResponse = (parsed_json) => {
		this.setState({
			forcasts: [],
			days: [],
			conds: [],
			condImages: []
		})
		var forecast = new Array(5);
		for(var i =0 ; i<5;i++){
			forecast[i]= Math.round(parsed_json['list'] [i*8] ['main'] ['temp']);
		}
		var conditions = new Array(5);
		for(var i =0 ; i<5;i++){
			conditions[i]= parsed_json['list'] [i*8] ['weather']['0']['description'];
		}

		var condcode = new Array(5)
		for(var i =0 ; i<5;i++){
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
//=======================================
//=======================================
//=======================================
//=======================================

gettflLogo(id) {
	switch(id) {
		case 0: return "../../assets/misc/Train_icons/tfl_0.png";
		case 1: return "../../assets/misc/Train_icons/tfl_1.png";
		case 2: return "../../assets/misc/Train_icons/tfl_2.png";
		case 3: return "../../assets/misc/Train_icons/tfl_3.png";
		case 4: return "../../assets/misc/Train_icons/tfl_4.png";
		case 5: return "../../assets/misc/Train_icons/tfl_5.png";
		case 6: return "../../assets/misc/Train_icons/tfl_6.png";
		case 7: return "../../assets/misc/Train_icons/tfl_7.png";
		case 8: return "../../assets/misc/Train_icons/tfl_8.png";
		case 9: return "../../assets/misc/Train_icons/tfl_9.png";
		case 10: return "../../assets/misc/Train_icons/tfl_10.png";
		case 11: return "../../assets/misc/Train_icons/tfl_11.png";
		case 12: return "../../assets/misc/Train_icons/tfl_12.png";
		default: return null;
	}
}

//=======================================
//=======================================
//=======================================
//=======TFL API RESPONSE================     		DESCRIPTION: REPSONSE FROM TFL API THAT WILL BE USED TO CREATE SETTING CHECKBOX AMONG OTHER RELATED VARIABLES

parseTFLResponse = (parsed_json) =>
{
	let tflList_of_effected;


	let id =0
		let tflLines = parsed_json.map((x) => {
			let desc = x['lineStatuses'][0]['statusSeverityDescription'];
			let res = x['lineStatuses']['0']['reason'];
			let name =x['name']
			let checked=false
			let tfl_id = id
			let logo = "tfl_" + id + ".png"
			id=id+1
			return {name,checked,tfl_id,desc,res}
		})
		// Return certain lines based on their severity status
		this.setState({
			tfl_lines:tflLines
		});
		this.check_options()

		let tfl_f =tflLines.map(item =>

			<div class = {style.checkBoxContainer} >
				{item.name}<input type = "checkbox" onChange = {this.onToggle.bind(this,item) } ></input>
				<img src = {this.gettflLogo(item.tfl_id)} style = "width: 30px; height: 20px;" />

			</div>)


		this.setState({
			tfl_Options:tfl_f
		})
}
//=======================================
//=======================================
//=======================================
//=======================================



	//=================================================
	//=========TOGGLE TFL CHECKLIST STATUS=============     		DESCRIPTION: A TOGGLE FOR DETERMINING IF USER HAS FILTER A TFL OPTION OR NOT

		onToggle(item){
		 var index = item['tfl_id']
		 this.setState(state =>{
			 const tflname = state.tfl_lines.map((item)=>{
				 if (item['tfl_id'] == index)
				 	{
					 if (item['checked']==true)
					 {
					 	item['checked']=false
					 }

					 else
					 {
							 item['checked']=true
					 }
			 		}
			 })
		 })
	this.check_options()
	console.log(this.state.tfl_lines)
	}

	//=================================================
	//=================================================



	//=======================================
	//=======================================
	//=======================================
	//=======DISPLAY & FILTER TFL LINES======     		DESCRIPTION: FUNCTION THAT WILL DISPLAY THE OUTPUT OF AFFECTED TFL LINES & THOSE FILTER BY USER

	check_options(){
		let tflList_of_effected;
		let tflChoice = this.state.tfl_lines.filter((x) => {
			return x.checked == true //
		})
		let tflChoiceEffected = tflChoice.filter((x)=>{
			return x.desc!="Good Service"
		})

		let tflLinesAffected = this.state.tfl_lines.filter((x) => {
			return x.desc != "Good Service" //"Good Service"
		})
		if (tflChoice.length ==0){
			if (tflLinesAffected.length == 0 ) {//when all lines are good service
				tflList_of_effected =  <p style = "background-color: green; margin: 0;">All lines are in good service</p>;
			}
			else{
			tflList_of_effected = tflLinesAffected.map(item =>
				<div class = {style.tflContainer}>
				<img src = '../../assets/icons/Bubble1.png' />
				<div class = {style.TEXT}>{item.res}</div>
				</div>)
			}
		}
		else {
			if (tflChoiceEffected.length==0){
				tflList_of_effected =  <p style = "background-color: green; margin: 0;">All chosen lines are in good service</p>;
			}
			else{
				tflList_of_effected = tflChoiceEffected.map(item =>
					<div class = {style.tflContainer}>
					<img src = '../../assets/icons/Bubble1.png' />
					<div class = {style.TEXT}>{item.res}</div>
					</div>)
		}
	}
		this.setState({
			tfl:tflList_of_effected
		})


		}

	//=======================================
	//=======================================
	//=======================================
	//=======================================






	//=======================================
	//=======================================
	//=======================================
	//=======LOCATION API RESPONSE===========     		DESCRIPTION: RESULTS OF LOCATION API TO BE USED TO DISPLAY USER'S LOCATION ON SCREEN AND FETCH WEATHER DATA ABOUT THEIR AREA

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

	//=======================================
	//=======================================
	//=======================================
	//=======================================


} //////////////// END OF IPHONE COMPONENT ////////////////




// parseBusRepsonse=(parsed_json)=>
// {
	// 	this.setState({
		// 		bus_stop_names:[]
		// 	})
		// 	var bus_stop = new Array (5);
		// 	for (var i =0 ; i<5 ; i++)
		// 	{
			// 		bus_stop[i]= parsed_json['member'][i]['name']
			// 	}
			// 	console.log(bus_stop)
			// 	this.setState({
				// 		bus_stop_names:bus_stop
				// 	})
				// }
				// //===========================================================
				// //===========================================================
				// 	fetchBus = () =>
				// 	{
					// 		let a =navigator.geolocation.getCurrentPosition((pos)=>
					// 		{
						// 			var crd=pos.coords;
						// 			var lat= crd.latitude;
						// 			var long = crd.longitude
						// 		var url = "http://transportapi.com/v3/uk/places.json?lat="+lat+"&lon="+long+"&type=bus_stop&app_id=781764bb&app_key=40a177294f041ee56d9ba84ef1b5849a";
						// 		$.ajax({
							// 			url: url,
							// 			dataType: "jsonp",
							// 			success : this.parseBusRepsonse,
							// 			error : function(req, err){ console.log('API call failed Bus ' + err); }
							// 			})
							// 		})
							// 	}
