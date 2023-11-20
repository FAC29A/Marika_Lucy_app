// export const wmoDescriptions = {
//   "00": "Cloud development not observed or observable",
//   "01": "Cloud dissolving or becoming less developed",
//   "02": "State of sky unchanged",
//   "03": "Clouds developing",
//   "04": "Visibility reduced by smoke",
//   "05": "Haze",
//   "06": "Dust in suspension, not raised by wind",
//   "07": "Dust or sand raised by wind",
//   "08": "Well-developed dust/sand whirls",
//   "09": "Duststorm or sandstorm",
//   "10": "Mist",
//   "11": "Shallow fog or ice fog",
//   "12": "More continuous shallow fog",
//   "13": "Lightning visible, no thunder",
//   "14": "Precipitation not reaching ground",
//   "15": "Distant precipitation",
//   "16": "Nearby precipitation",
//   "17": "Thunderstorm, no precipitation",
//   "18": "Squalls",
//   "19": "Funnel clouds",
//   "20": "Drizzle or snow grains", 
//   "21": "Rain not as showers",
//   "22": "Snow not as showers",
//   "23": "Rain and snow mixed",
//   "24": "Freezing drizzle or rain",
//   "25": "Showers of rain",
//   "26": "Showers of snow",
//   "27": "Showers of hail",
//   "28": "Fog or ice fog",
//   "29": "Thunderstorm",
//   "30": "Duststorm decreased",
//   "31": "Duststorm no change",
//   "32": "Duststorm began/increased",
//   "33": "Severe duststorm decreased", 
//   "34": "Severe duststorm no change",
//   "35": "Severe duststorm began/increased",
//   "36": "Slight/moderate drifting snow",
//   "37": "Heavy drifting snow", 
//   "38": "Slight/moderate blowing snow",
//   "39": "Heavy blowing snow",
//   "40": "Fog or ice fog at a distance",
//   "41": "Fog or ice fog in patches",
//   "42": "Fog thinned",
//   "43": "Fog not sky visible thinned",
//   "44": "Fog no appreciable change",
//   "45": "Fog not sky visible no change",
//   "46": "Fog began or thickened",
//   "47": "Fog not sky visible began/thickened", 
//   "48": "Fog depositing rime",
//   "49": "Fog depositing rime sky invisible",
//   "50": "Drizzle slight intermittent",
//   "51": "Drizzle slight continuous",
//   "52": "Drizzle moderate intermittent",
//   "53": "Drizzle moderate continuous",
//   "54": "Drizzle heavy intermittent",
//   "55": "Drizzle heavy continuous",
//   "56": "Drizzle freezing slight",
//   "57": "Drizzle freezing moderate/heavy",
//   "58": "Rain and drizzle slight",
//   "59": "Rain and drizzle moderate/heavy",
//   "60": "Rain slight intermittent",
//   "61": "Rain slight continuous", 
//   "62": "Rain moderate intermittent",
//   "63": "Rain moderate continuous",
//   "64": "Rain heavy intermittent", 
//   "65": "Rain heavy continuous",
//   "66": "Rain freezing slight",
//   "67": "Rain freezing moderate/heavy",
//   "68": "Rain or drizzle with snow slight",
//   "69": "Rain/drizzle with snow moderate/heavy",
//   "70": "Snowfall slight intermittent",
//   "71": "Snowfall slight continuous",
//   "72": "Snowfall moderate intermittent",
//   "73": "Snowfall moderate continuous",
//   "74": "Snowfall heavy intermittent",
//   "75": "Snowfall heavy continuous",
//   "76": "Diamond dust",
//   "77": "Snow grains",
//   "78": "Isolated snow crystals",
//   "79": "Ice pellets",
//   "80": "Rain shower slight",
//   "81": "Rain shower moderate/heavy",
//   "82": "Rain shower violent",
//   "83": "Rain/snow shower slight",
//   "84": "Rain/snow shower moderate/heavy",
//   "85": "Snow shower slight",
//   "86": "Snow shower moderate/heavy",
//   "87": "Snow pellets slight",
//   "88": "Snow pellets moderate/heavy",
//   "89": "Hail shower slight",
//   "90": "Hail shower moderate/heavy",
//   "91": "Slight rain with thunder",
//   "92": "Moderate/heavy rain with thunder",
//   "93": "Slight snow/hail with thunder",
//   "94": "Moderate/heavy snow/hail with thunder", 
//   "95": "Thunderstorm slight/moderate no hail",
//   "96": "Thunderstorm slight/moderate with hail",
//   "97": "Thunderstorm heavy no hail",
//   "98": "Thunderstorm with duststorm",
//   "99": "Thunderstorm heavy with hail"
// };
// exports.wmoDescriptions = descriptions;

export const wmoDescriptions = {
	"0":{
		"day":{
			"description":"Sunny",
			"image":"http://openweathermap.org/img/wn/01d@2x.png"
		},
		"night":{
			"description":"Clear",
			"image":"http://openweathermap.org/img/wn/01n@2x.png"
		}
	},
	"1":{
		"day":{
			"description":"Mainly Sunny",
			"image":"http://openweathermap.org/img/wn/01d@2x.png"
		},
		"night":{
			"description":"Mainly Clear",
			"image":"http://openweathermap.org/img/wn/01n@2x.png"
		}
	},
	"2":{
		"day":{
			"description":"Partly Cloudy",
			"image":"http://openweathermap.org/img/wn/02d@2x.png"
		},
		"night":{
			"description":"Partly Cloudy",
			"image":"http://openweathermap.org/img/wn/02n@2x.png"
		}
	},
	"3":{
		"day":{
			"description":"Cloudy",
			"image":"http://openweathermap.org/img/wn/03d@2x.png"
		},
		"night":{
			"description":"Cloudy",
			"image":"http://openweathermap.org/img/wn/03n@2x.png"
		}
	},
	"45":{
		"day":{
			"description":"Foggy",
			"image":"http://openweathermap.org/img/wn/50d@2x.png"
		},
		"night":{
			"description":"Foggy",
			"image":"http://openweathermap.org/img/wn/50n@2x.png"
		}
	},
	"48":{
		"day":{
			"description":"Rime Fog",
			"image":"http://openweathermap.org/img/wn/50d@2x.png"
		},
		"night":{
			"description":"Rime Fog",
			"image":"http://openweathermap.org/img/wn/50n@2x.png"
		}
	},
	"51":{
		"day":{
			"description":"Light Drizzle",
			"image":"http://openweathermap.org/img/wn/09d@2x.png"
		},
		"night":{
			"description":"Light Drizzle",
			"image":"http://openweathermap.org/img/wn/09n@2x.png"
		}
	},
	"53":{
		"day":{
			"description":"Drizzle",
			"image":"http://openweathermap.org/img/wn/09d@2x.png"
		},
		"night":{
			"description":"Drizzle",
			"image":"http://openweathermap.org/img/wn/09n@2x.png"
		}
	},
	"55":{
		"day":{
			"description":"Heavy Drizzle",
			"image":"http://openweathermap.org/img/wn/09d@2x.png"
		},
		"night":{
			"description":"Heavy Drizzle",
			"image":"http://openweathermap.org/img/wn/09n@2x.png"
		}
	},
	"56":{
		"day":{
			"description":"Light Freezing Drizzle",
			"image":"http://openweathermap.org/img/wn/09d@2x.png"
		},
		"night":{
			"description":"Light Freezing Drizzle",
			"image":"http://openweathermap.org/img/wn/09n@2x.png"
		}
	},
	"57":{
		"day":{
			"description":"Freezing Drizzle",
			"image":"http://openweathermap.org/img/wn/09d@2x.png"
		},
		"night":{
			"description":"Freezing Drizzle",
			"image":"http://openweathermap.org/img/wn/09n@2x.png"
		}
	},
	"61":{
		"day":{
			"description":"Light Rain",
			"image":"http://openweathermap.org/img/wn/10d@2x.png"
		},
		"night":{
			"description":"Light Rain",
			"image":"http://openweathermap.org/img/wn/10n@2x.png"
		}
	},
	"63":{
		"day":{
			"description":"Rain",
			"image":"http://openweathermap.org/img/wn/10d@2x.png"
		},
		"night":{
			"description":"Rain",
			"image":"http://openweathermap.org/img/wn/10n@2x.png"
		}
	},
	"65":{
		"day":{
			"description":"Heavy Rain",
			"image":"http://openweathermap.org/img/wn/10d@2x.png"
		},
		"night":{
			"description":"Heavy Rain",
			"image":"http://openweathermap.org/img/wn/10n@2x.png"
		}
	},
	"66":{
		"day":{
			"description":"Light Freezing Rain",
			"image":"http://openweathermap.org/img/wn/10d@2x.png"
		},
		"night":{
			"description":"Light Freezing Rain",
			"image":"http://openweathermap.org/img/wn/10n@2x.png"
		}
	},
	"67":{
		"day":{
			"description":"Freezing Rain",
			"image":"http://openweathermap.org/img/wn/10d@2x.png"
		},
		"night":{
			"description":"Freezing Rain",
			"image":"http://openweathermap.org/img/wn/10n@2x.png"
		}
	},
	"71":{
		"day":{
			"description":"Light Snow",
			"image":"http://openweathermap.org/img/wn/13d@2x.png"
		},
		"night":{
			"description":"Light Snow",
			"image":"http://openweathermap.org/img/wn/13n@2x.png"
		}
	},
	"73":{
		"day":{
			"description":"Snow",
			"image":"http://openweathermap.org/img/wn/13d@2x.png"
		},
		"night":{
			"description":"Snow",
			"image":"http://openweathermap.org/img/wn/13n@2x.png"
		}
	},
	"75":{
		"day":{
			"description":"Heavy Snow",
			"image":"http://openweathermap.org/img/wn/13d@2x.png"
		},
		"night":{
			"description":"Heavy Snow",
			"image":"http://openweathermap.org/img/wn/13n@2x.png"
		}
	},
	"77":{
		"day":{
			"description":"Snow Grains",
			"image":"http://openweathermap.org/img/wn/13d@2x.png"
		},
		"night":{
			"description":"Snow Grains",
			"image":"http://openweathermap.org/img/wn/13n@2x.png"
		}
	},
	"80":{
		"day":{
			"description":"Light Showers",
			"image":"http://openweathermap.org/img/wn/09d@2x.png"
		},
		"night":{
			"description":"Light Showers",
			"image":"http://openweathermap.org/img/wn/09n@2x.png"
		}
	},
	"81":{
		"day":{
			"description":"Showers",
			"image":"http://openweathermap.org/img/wn/09d@2x.png"
		},
		"night":{
			"description":"Showers",
			"image":"http://openweathermap.org/img/wn/09n@2x.png"
		}
	},
	"82":{
		"day":{
			"description":"Heavy Showers",
			"image":"http://openweathermap.org/img/wn/09d@2x.png"
		},
		"night":{
			"description":"Heavy Showers",
			"image":"http://openweathermap.org/img/wn/09n@2x.png"
		}
	},
	"85":{
		"day":{
			"description":"Light Snow Showers",
			"image":"http://openweathermap.org/img/wn/13d@2x.png"
		},
		"night":{
			"description":"Light Snow Showers",
			"image":"http://openweathermap.org/img/wn/13n@2x.png"
		}
	},
	"86":{
		"day":{
			"description":"Snow Showers",
			"image":"http://openweathermap.org/img/wn/13d@2x.png"
		},
		"night":{
			"description":"Snow Showers",
			"image":"http://openweathermap.org/img/wn/13n@2x.png"
		}
	},
	"95":{
		"day":{
			"description":"Thunderstorm",
			"image":"http://openweathermap.org/img/wn/11d@2x.png"
		},
		"night":{
			"description":"Thunderstorm",
			"image":"http://openweathermap.org/img/wn/11n@2x.png"
		}
	},
	"96":{
		"day":{
			"description":"Light Thunderstorms With Hail",
			"image":"http://openweathermap.org/img/wn/11d@2x.png"
		},
		"night":{
			"description":"Light Thunderstorms With Hail",
			"image":"http://openweathermap.org/img/wn/11n@2x.png"
		}
	},
	"99":{
		"day":{
			"description":"Thunderstorm With Hail",
			"image":"http://openweathermap.org/img/wn/11d@2x.png"
		},
		"night":{
			"description":"Thunderstorm With Hail",
			"image":"http://openweathermap.org/img/wn/11n@2x.png"
		}
	}
}