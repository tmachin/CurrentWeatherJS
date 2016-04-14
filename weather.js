/*
    by Thomas Machin
    thomasmachin.com

    CurrentweatherJS
    https://github.com/tmachin/CurrentWeatherJS

    uses browser location to get the current weather and forecast from the OpenWeatherMap API
*/

jQuery.fn.extend({
        toggleText: function (a, b){
            var isClicked = false;
            var that = this;
            this.click(function (){
                if (isClicked) { that.text(a); isClicked = false; }
                else { that.text(b); isClicked = true; }
            });
            return this;
        }
    });



var x = document.getElementById("loc");
var apiKey = "f538e3730d9d92e2bd8909b2ca1cff5f";
var lat = 0,
		lon = 0,
		units = "metric";
var currentWeather;
var icon = "";

var isoCountries = {
    'AF' : 'Afghanistan',
    'AX' : 'Aland Islands',
    'AL' : 'Albania',
    'DZ' : 'Algeria',
    'AS' : 'American Samoa',
    'AD' : 'Andorra',
    'AO' : 'Angola',
    'AI' : 'Anguilla',
    'AQ' : 'Antarctica',
    'AG' : 'Antigua And Barbuda',
    'AR' : 'Argentina',
    'AM' : 'Armenia',
    'AW' : 'Aruba',
    'AU' : 'Australia',
    'AT' : 'Austria',
    'AZ' : 'Azerbaijan',
    'BS' : 'Bahamas',
    'BH' : 'Bahrain',
    'BD' : 'Bangladesh',
    'BB' : 'Barbados',
    'BY' : 'Belarus',
    'BE' : 'Belgium',
    'BZ' : 'Belize',
    'BJ' : 'Benin',
    'BM' : 'Bermuda',
    'BT' : 'Bhutan',
    'BO' : 'Bolivia',
    'BA' : 'Bosnia And Herzegovina',
    'BW' : 'Botswana',
    'BV' : 'Bouvet Island',
    'BR' : 'Brazil',
    'IO' : 'British Indian Ocean Territory',
    'BN' : 'Brunei Darussalam',
    'BG' : 'Bulgaria',
    'BF' : 'Burkina Faso',
    'BI' : 'Burundi',
    'KH' : 'Cambodia',
    'CM' : 'Cameroon',
    'CA' : 'Canada',
    'CV' : 'Cape Verde',
    'KY' : 'Cayman Islands',
    'CF' : 'Central African Republic',
    'TD' : 'Chad',
    'CL' : 'Chile',
    'CN' : 'China',
    'CX' : 'Christmas Island',
    'CC' : 'Cocos (Keeling) Islands',
    'CO' : 'Colombia',
    'KM' : 'Comoros',
    'CG' : 'Congo',
    'CD' : 'Congo, Democratic Republic',
    'CK' : 'Cook Islands',
    'CR' : 'Costa Rica',
    'CI' : 'Cote D\'Ivoire',
    'HR' : 'Croatia',
    'CU' : 'Cuba',
    'CY' : 'Cyprus',
    'CZ' : 'Czech Republic',
    'DK' : 'Denmark',
    'DJ' : 'Djibouti',
    'DM' : 'Dominica',
    'DO' : 'Dominican Republic',
    'EC' : 'Ecuador',
    'EG' : 'Egypt',
    'SV' : 'El Salvador',
    'GQ' : 'Equatorial Guinea',
    'ER' : 'Eritrea',
    'EE' : 'Estonia',
    'ET' : 'Ethiopia',
    'FK' : 'Falkland Islands (Malvinas)',
    'FO' : 'Faroe Islands',
    'FJ' : 'Fiji',
    'FI' : 'Finland',
    'FR' : 'France',
    'GF' : 'French Guiana',
    'PF' : 'French Polynesia',
    'TF' : 'French Southern Territories',
    'GA' : 'Gabon',
    'GM' : 'Gambia',
    'GE' : 'Georgia',
    'DE' : 'Germany',
    'GH' : 'Ghana',
    'GI' : 'Gibraltar',
    'GR' : 'Greece',
    'GL' : 'Greenland',
    'GD' : 'Grenada',
    'GP' : 'Guadeloupe',
    'GU' : 'Guam',
    'GT' : 'Guatemala',
    'GG' : 'Guernsey',
    'GN' : 'Guinea',
    'GW' : 'Guinea-Bissau',
    'GY' : 'Guyana',
    'HT' : 'Haiti',
    'HM' : 'Heard Island & Mcdonald Islands',
    'VA' : 'Holy See (Vatican City State)',
    'HN' : 'Honduras',
    'HK' : 'Hong Kong',
    'HU' : 'Hungary',
    'IS' : 'Iceland',
    'IN' : 'India',
    'ID' : 'Indonesia',
    'IR' : 'Iran, Islamic Republic Of',
    'IQ' : 'Iraq',
    'IE' : 'Ireland',
    'IM' : 'Isle Of Man',
    'IL' : 'Israel',
    'IT' : 'Italy',
    'JM' : 'Jamaica',
    'JP' : 'Japan',
    'JE' : 'Jersey',
    'JO' : 'Jordan',
    'KZ' : 'Kazakhstan',
    'KE' : 'Kenya',
    'KI' : 'Kiribati',
    'KR' : 'Korea',
    'KW' : 'Kuwait',
    'KG' : 'Kyrgyzstan',
    'LA' : 'Lao People\'s Democratic Republic',
    'LV' : 'Latvia',
    'LB' : 'Lebanon',
    'LS' : 'Lesotho',
    'LR' : 'Liberia',
    'LY' : 'Libyan Arab Jamahiriya',
    'LI' : 'Liechtenstein',
    'LT' : 'Lithuania',
    'LU' : 'Luxembourg',
    'MO' : 'Macao',
    'MK' : 'Macedonia',
    'MG' : 'Madagascar',
    'MW' : 'Malawi',
    'MY' : 'Malaysia',
    'MV' : 'Maldives',
    'ML' : 'Mali',
    'MT' : 'Malta',
    'MH' : 'Marshall Islands',
    'MQ' : 'Martinique',
    'MR' : 'Mauritania',
    'MU' : 'Mauritius',
    'YT' : 'Mayotte',
    'MX' : 'Mexico',
    'FM' : 'Micronesia, Federated States Of',
    'MD' : 'Moldova',
    'MC' : 'Monaco',
    'MN' : 'Mongolia',
    'ME' : 'Montenegro',
    'MS' : 'Montserrat',
    'MA' : 'Morocco',
    'MZ' : 'Mozambique',
    'MM' : 'Myanmar',
    'NA' : 'Namibia',
    'NR' : 'Nauru',
    'NP' : 'Nepal',
    'NL' : 'Netherlands',
    'AN' : 'Netherlands Antilles',
    'NC' : 'New Caledonia',
    'NZ' : 'New Zealand',
    'NI' : 'Nicaragua',
    'NE' : 'Niger',
    'NG' : 'Nigeria',
    'NU' : 'Niue',
    'NF' : 'Norfolk Island',
    'MP' : 'Northern Mariana Islands',
    'NO' : 'Norway',
    'OM' : 'Oman',
    'PK' : 'Pakistan',
    'PW' : 'Palau',
    'PS' : 'Palestinian Territory, Occupied',
    'PA' : 'Panama',
    'PG' : 'Papua New Guinea',
    'PY' : 'Paraguay',
    'PE' : 'Peru',
    'PH' : 'Philippines',
    'PN' : 'Pitcairn',
    'PL' : 'Poland',
    'PT' : 'Portugal',
    'PR' : 'Puerto Rico',
    'QA' : 'Qatar',
    'RE' : 'Reunion',
    'RO' : 'Romania',
    'RU' : 'Russian Federation',
    'RW' : 'Rwanda',
    'BL' : 'Saint Barthelemy',
    'SH' : 'Saint Helena',
    'KN' : 'Saint Kitts And Nevis',
    'LC' : 'Saint Lucia',
    'MF' : 'Saint Martin',
    'PM' : 'Saint Pierre And Miquelon',
    'VC' : 'Saint Vincent And Grenadines',
    'WS' : 'Samoa',
    'SM' : 'San Marino',
    'ST' : 'Sao Tome And Principe',
    'SA' : 'Saudi Arabia',
    'SN' : 'Senegal',
    'RS' : 'Serbia',
    'SC' : 'Seychelles',
    'SL' : 'Sierra Leone',
    'SG' : 'Singapore',
    'SK' : 'Slovakia',
    'SI' : 'Slovenia',
    'SB' : 'Solomon Islands',
    'SO' : 'Somalia',
    'ZA' : 'South Africa',
    'GS' : 'South Georgia And Sandwich Isl.',
    'ES' : 'Spain',
    'LK' : 'Sri Lanka',
    'SD' : 'Sudan',
    'SR' : 'Suriname',
    'SJ' : 'Svalbard And Jan Mayen',
    'SZ' : 'Swaziland',
    'SE' : 'Sweden',
    'CH' : 'Switzerland',
    'SY' : 'Syrian Arab Republic',
    'TW' : 'Taiwan',
    'TJ' : 'Tajikistan',
    'TZ' : 'Tanzania',
    'TH' : 'Thailand',
    'TL' : 'Timor-Leste',
    'TG' : 'Togo',
    'TK' : 'Tokelau',
    'TO' : 'Tonga',
    'TT' : 'Trinidad And Tobago',
    'TN' : 'Tunisia',
    'TR' : 'Turkey',
    'TM' : 'Turkmenistan',
    'TC' : 'Turks And Caicos Islands',
    'TV' : 'Tuvalu',
    'UG' : 'Uganda',
    'UA' : 'Ukraine',
    'AE' : 'United Arab Emirates',
    'GB' : 'United Kingdom',
    'US' : 'United States',
    'UM' : 'United States Outlying Islands',
    'UY' : 'Uruguay',
    'UZ' : 'Uzbekistan',
    'VU' : 'Vanuatu',
    'VE' : 'Venezuela',
    'VN' : 'Viet Nam',
    'VG' : 'Virgin Islands, British',
    'VI' : 'Virgin Islands, U.S.',
    'WF' : 'Wallis And Futuna',
    'EH' : 'Western Sahara',
    'YE' : 'Yemen',
    'ZM' : 'Zambia',
    'ZW' : 'Zimbabwe'
};

function getCountryName (countryCode) {
    if (isoCountries.hasOwnProperty(countryCode)) {
        return isoCountries[countryCode];
    } else {
        return countryCode;
    }
}

function celsiusToFarenheit(temp){
	return temp * 1.8 + 32;
}

function degreesToDirection(deg) {
	if (deg){
		var val = Math.floor((deg / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
	}
    return "" ;
}

function convertWindSpeed(speed) {
	if (units == "imperial"){
			return Math.round(speed) + "mp/h ";
	} else {
			return Math.round(speed * 3.6) + "km/h ";
	}
}

function dayName(num){
    var dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    return dayNames[num];
}

function setPosition(position) {
	lat = position.coords.latitude;
	lon = position.coords.longitude;

  $("#loc").html = "Latitude: " + lat +
    "<br>Longitude: " + lon;
	getWeatherJSON();
}

function posError(error){
    console.log("Geolocation Error");
    lat = 0;
	lon = 0;

  $("#loc").html = "Error Getting Location <br> Latitude: " + lat +
    "<br>Longitude: " + lon;
	getWeatherJSON();
}

function getWeatherJSON(){
	console.log("--Getting weather--");
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units="+units+"&appid="+ apiKey, function(json) {
        console.log("--Got Weather JSON--");
		currentWeather = json;
		showWeather(currentWeather, units);
		});
    $.getJSON("http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&units="+units+"&appid="+ apiKey, function(json) {
            console.log("--Got ForecastWeather JSON--");
    		forecastWeather = json;
    		showForecast(forecastWeather, units);
    });
}

function showWeather(weather, unit){

	var unitSymbol = "";
	if (unit == "imperial"){
		unitSymbol = "F";
	} else {
		unitSymbol = "C";
	}

	icon = weather.weather[0].main;
    icon = icon.toLowerCase()

	background = weather.weather[0].main;
	$('.location').text("" + weather.name + ", " + getCountryName(weather.sys.country));

	$('.temperature').html("<img src='icons/"+icon+".svg' alt='"+icon+"' class='icon'/>" + weather.main.temp + "&deg " + unitSymbol);

	$('.description').html("<h3>" + weather.weather[0].description + "</h3>");
	$('.wind').text("Wind: " + convertWindSpeed(weather.wind.speed) + " " + degreesToDirection(weather.wind.deg));
}
function showForecast(weather, unit){

	var unitSymbol = "";
	if (unit == "imperial"){
		unitSymbol = "F";
	} else {
		unitSymbol = "C";
	}

    $('.upcomingforecasts').html('');
    $('.furtherforecast').html('');

    for (i =0; i < 20; i++){
        icon = weather.list[i].weather[0].main;
        icon = icon.toLowerCase()

        var ntime = parseInt(weather.list[i].dt)*1000; //get time in seconds and turn in into time in milliseconds

        var ndate = new Date(ntime);


        var hours = ndate.getHours();
        var timeTXT = '';
        if (hours <= 12){
            timeTXT += hours + " AM";
        } else {
            hours = hours - 12;
            timeTXT += hours + " PM";
        }
        var dateTxt = "<h4>"+ timeTXT + ", " +dayName(ndate.getDay()) + "</h4>";
        var today = new Date().getDay();

        var divClass = "indvforecast";

        var contDivFinish = "";
        if(i < 3 ){
            divClass = "upcomingforecast";
        }
        var html = "<div class='"+divClass+"'>";
        var temp = Math.round(weather.list[i].main.temp);
        var desc = weather.list[i].weather[0].description;

    	var iconHtml = "<img src='icons/"+icon+".svg' alt='"+icon+"' class='icon'/><span class='temperature'>" + temp + "&deg " + unitSymbol + "</span>";
        var descriptionHtml = "<h3>" + desc + "</h3>";
        var endDiv = "</div>";

        html += dateTxt;
        html += iconHtml;
        html += descriptionHtml;
        html += "</div>";

        //puts the first three forecasts next to the current weather
        if(i < 3 ){
            $('.upcomingforecasts').append(html);
            $('.upcomingforecasts').show('linear');
        } else {
            $('.furtherforecast').append(html);
        }
    }
}
$(document).ready(function() {


$("#getWeather").on("click", function() {
    getWeatherJSON();
    });

$("#changeUnits").on("click", function() {
	if (units == "imperial"){
		units = "metric";
	} else {
		units = "imperial";
	}
	$("#changeUnits").text("Units: " + units);

    getWeatherJSON();
});
$("#btnShowForecast").on("click", function() {
	$('.furtherforecast').slideToggle();
});

$("#btnShowForecast").toggleText("Show Full Forecast","Hide Full Forecast");

navigator.geolocation.getCurrentPosition(setPosition, posError);

});
