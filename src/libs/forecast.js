import { locales } from './locales';

let language;

function getWeatherUnits(data) {
	return {
		temp: data['hourly_units']['temperature_2m'],
		probability: data['hourly_units']['precipitation_probability'],
		precipitation: data['hourly_units']['precipitation'],
		snowfall: data['hourly_units']['snowfall'],
		visibility: data['hourly_units']['visibility'] === 'm' ? 'km' : 'mi',
		windSpeed: data['hourly_units']['windspeed_10m'],
		windDirection: data['hourly_units']['winddirection_10m']
	};
}

function getWeatherIconString(code, day) {
	let weatherString;
	let weatherIcon;

	language = JSON.parse(localStorage.getItem('settings')).language;

	switch (code) {
		case 0:
			weatherString = locales[language].weatherStrings.clearSky;
			weatherIcon = `material-symbols:${day ? 'sunny-rounded' : 'bedtime'}`;
			break;

		case 1:
			weatherString = locales[language].weatherStrings.mainlyClear;
			weatherIcon = `material-symbols:${day ? 'partly-cloudy-day-rounded' : 'nights-stay'}`;
			break;

		case 2:
			weatherString = locales[language].weatherStrings.partlyCloudy;
			weatherIcon = `material-symbols:${day ? 'partly-cloudy-day-rounded' : 'nights-stay'}`;
			break;

		case 3:
			weatherString = locales[language].weatherStrings.cloudy;
			weatherIcon = `material-symbols:cloud`;
			break;

		case 45:
			weatherString = locales[language].weatherStrings.foggy;
			weatherIcon = `material-symbols:foggy`;
			break;

		case 48:
			weatherString = locales[language].weatherStrings.veryFoggy;
			weatherIcon = `material-symbols:foggy`;
			break;

		case 51:
			weatherString = locales[language].weatherStrings.lightDrizzle;
			weatherIcon = `material-symbols:grain`;
			break;

		case 53:
			weatherString = locales[language].weatherStrings.moderateDrizzle;
			weatherIcon = `material-symbols:grain`;
			break;

		case 55:
			weatherString = locales[language].weatherStrings.denseDrizzle;
			weatherIcon = `material-symbols:grain`;
			break;

		case 56:
			weatherString = locales[language].weatherStrings.lightFreezingDrizzle;
			weatherIcon = `material-symbols:grain`;
			break;

		case 57:
			weatherString = locales[language].weatherStrings.denseFreezingDrizzle;
			weatherIcon = `material-symbols:grain`;
			break;

		case 61:
			weatherString = locales[language].weatherStrings.slightRain;
			weatherIcon = `material-symbols:rainy`;
			break;

		case 63:
			weatherString = locales[language].weatherStrings.moderateRain;
			weatherIcon = `material-symbols:rainy`;
			break;

		case 65:
			weatherString = locales[language].weatherStrings.heavyRain;
			weatherIcon = `material-symbols:rainy-heavy`;
			break;

		case 66:
			weatherString = locales[language].weatherStrings.slightFreezingRain;
			weatherIcon = `material-symbols:rainy-snow`;
			break;

		case 67:
			weatherString = locales[language].weatherStrings.heavyFreezingRain;
			weatherIcon = `material-symbols:rainy-heavy`;
			break;

		case 71:
			weatherString = locales[language].weatherStrings.snowingLightly;
			weatherIcon = `material-symbols:cloudy-snowing`;
			break;

		case 73:
			weatherString = locales[language].weatherStrings.snowingModerately;
			weatherIcon = `material-symbols:cloudy-snowing`;
			break;

		case 75:
			weatherString = locales[language].weatherStrings.snowingHeavily;
			weatherIcon = `material-symbols:cloudy-snowing`;
			break;

		case 77:
			weatherString = locales[language].weatherStrings.snowGrains;
			weatherIcon = `material-symbols:grain`;
			break;

		case 80:
			weatherString = locales[language].weatherStrings.lightShowers;
			weatherIcon = `material-symbols:rainy`;
			break;

		case 81:
			weatherString = locales[language].weatherStrings.moderateShowers;
			weatherIcon = `material-symbols:rainy`;
			break;

		case 82:
			weatherString = locales[language].weatherStrings.heavyShowers;
			weatherIcon = `material-symbols:rainy-heavy`;
			break;

		case 85:
			weatherString = locales[language].weatherStrings.lightShowers;
			weatherIcon = `material-symbols:rainy-snow`;
			break;

		case 86:
			weatherString = locales[language].weatherStrings.heavyShowers;
			weatherIcon = `material-symbols:rainy-snow`;
			break;

		case 95:
			weatherString = locales[language].weatherStrings.thunderStorm;
			weatherIcon = `material-symbols:thunderstorm-rounded`;
			break;

		case 96:
			weatherString = locales[language].weatherStrings.thunderStormSlightHail;
			weatherIcon = `material-symbols:thunderstorm-rounded`;
			break;

		case 99:
			weatherString = locales[language].weatherStrings.thunderStormHeavyHail;
			weatherIcon = `material-symbols:thunderstorm-rounded`;
			break;

		default:
			weatherString = locales[language].weatherStrings.tornado;
			weatherIcon = `material-symbols:tornado-rounded`;
			break;
	}

	return {
		code: code,
		string: weatherString,
		icon: weatherIcon
	};
}

function getCurrentWeather(data) {
	try {
		let day = data['current_weather']['is_day'] === 1 ? true : false;

		let info = {
			time: data['current_weather']['time'],
			temp: Math.round(data['current_weather']['temperature']) + getWeatherUnits(data).temp,
			weather: getWeatherIconString(data['current_weather']['weathercode'], day)
		};

		return info;
	} catch (error) {
		console.log(`Couldn't fetch current data: ${error}`);
		return null;
	}
}

function getHourlyWeather(data) {
	try {
		let currentHourISO = `${new Date().getFullYear()}-${('0' + (new Date().getMonth() + 1)).slice(
			-2
		)}-${('0' + new Date().getDate()).slice(-2)}T${('0' + new Date().getHours()).slice(-2)}:00`;

		let currentHourIndex = data['hourly']['time'].findIndex((time) => time === currentHourISO) + 1;

		let info = [];

		for (let i = currentHourIndex; i <= currentHourIndex + 24; i++) {
			let item = {
				time: data['hourly']['time'][i],
				temp: Math.round(data['hourly']['temperature_2m'][i]) + getWeatherUnits(data).temp,
				apparentTemp:
					Math.round(data['hourly']['apparent_temperature'][i]) + getWeatherUnits(data).temp,
				precipitation: data['hourly']['precipitation'][i] + getWeatherUnits(data).precipitation,
				precipitationProb:
					data['hourly']['precipitation_probability'][i] + getWeatherUnits(data).probability,
				weather: getWeatherIconString(data['hourly']['weathercode'][i], data['hourly']['is_day'][i])
			};

			info.push(item);
		}

		return info;
	} catch (error) {
		console.log(`Couldn't fetch hourly data: ${error}`);
		return null;
	}
}

function date(i, data) {
	language = JSON.parse(localStorage.getItem('settings')).language;

	let yesterday = `${new Date().getFullYear()}-${('0' + (new Date().getMonth() + 1)).slice(-2)}-${(
		'0' +
		(new Date().getDate() - 1)
	).slice(-2)}`;
	let today = `${new Date().getFullYear()}-${('0' + (new Date().getMonth() + 1)).slice(-2)}-${(
		'0' + new Date().getDate()
	).slice(-2)}`;
	let tomorrow = `${new Date().getFullYear()}-${('0' + (new Date().getMonth() + 1)).slice(-2)}-${(
		'0' +
		(new Date().getDate() + 1)
	).slice(-2)}`;

	let date = new Date(data['daily']['time'][i]).getDay();

	switch (data['daily']['time'][i]) {
		case yesterday:
			return locales[language].weekDays.yesterday;
		case today:
			return locales[language].weekDays.today;
		case tomorrow:
			return locales[language].weekDays.tomorrow;
		default:
			switch (date) {
				case 0:
					return locales[language].weekDays.sunday;
				case 1:
					return locales[language].weekDays.monday;
				case 2:
					return locales[language].weekDays.tuesday;
				case 3:
					return locales[language].weekDays.wednesday;
				case 4:
					return locales[language].weekDays.thursday;
				case 5:
					return locales[language].weekDays.friday;
				case 6:
					return locales[language].weekDays.saturday;
			}
	}
}

function getDailyWeather(data) {
	try {
		let currentHourISO = `${new Date().getFullYear()}-${('0' + (new Date().getMonth() + 1)).slice(
			-2
		)}-${('0' + new Date().getDate()).slice(-2)}T${('0' + new Date().getHours()).slice(-2)}:00`;

		let currentHourIndex = data['hourly']['time'].findIndex((time) => time === currentHourISO) + 1;

		let info = [];

		for (let i = 0; i < data['daily']['time'].length; i++) {
			let item = {
				date: date(i, data),
				sunrise: data['daily']['sunrise'][i].slice(-5),
				sunset: data['daily']['sunset'][i].slice(-5),
				maxTemp: Math.round(data['daily']['temperature_2m_max'][i]) + getWeatherUnits(data).temp,
				minTemp: Math.round(data['daily']['temperature_2m_min'][i]) + getWeatherUnits(data).temp,
				weather: getWeatherIconString(data['daily']['weathercode'][i], true),
				precipitation:
					data['daily']['precipitation_probability_max'][i] + getWeatherUnits(data).probability,
				uvIndex: parseFloat(data['daily']['uv_index_max'][i]).toFixed(2)
			};

			info.push(item);
		}

		info[1].today = {
			visibility:
				(getWeatherUnits(data).visibility === 'km'
					? parseFloat(data['hourly']['visibility'][currentHourIndex] / 1000).toFixed(1)
					: parseFloat(data['hourly']['visibility'][currentHourIndex] / 5280).toFixed(1)) +
				getWeatherUnits(data).visibility,
			windDirection: data['hourly']['winddirection_10m'][currentHourIndex],
			windSpeed: data['hourly']['windspeed_10m'][currentHourIndex] + getWeatherUnits(data).windSpeed
		};

		return info;
	} catch (error) {
		console.log(`Couldn't fetch daily data: ${error}`);
		return null;
	}
}

export async function getWeatherData(lat, long, units) {
	const apiCallString = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,weathercode,surface_pressure,cloudcover,visibility,windspeed_10m,winddirection_10m,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max&current_weather=true&timezone=auto&past_days=1${
		units === 'Imperial'
			? '&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch'
			: ''
	}`;

	try {
		const response = await fetch(apiCallString.toString());
		const data = await response.json();

		let currentWeather = getCurrentWeather(data);
		let hourlyWeather = getHourlyWeather(data);
		let dailyWeather = getDailyWeather(data);

		return {
			currentWeather: currentWeather,
			hourlyWeather: hourlyWeather,
			dailyWeather: dailyWeather
		};
	} catch (error) {
		console.error(error);
		return null; // or handle the error appropriately
	}
}
