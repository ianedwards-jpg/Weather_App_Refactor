// Weather Application
// Technologies Used: OpenWeather API/Icon Pack, BootStrap, jQuery

// Set variable for zip-location input 
const zipInputBar = document.querySelector("#zip-input")

// let storedDefaultLocation = localStorage.getItem("defaultLocation")
// const globalDay = new Number;
// const globalMonth = new Number;

const monthsMap = [
  { month: 1, value: "January" },
  { month: 2, value: "February" },
  { month: 3, value: "March" },
  { month: 4, value: "April" },
  { month: 5, value: "May" },
  { month: 6, value: "June" },
  { month: 7, value: "July" },
  { month: 8, value: "August" },
  { month: 9, value: "September" },
  { month: 10, value: "October" },
  { month: 11, value: "November" },
  { month: 12, value: "December" }
]

const daysMap = [
  { day: 0, value: "Sunday" },
  { day: 1, value: "Monday" },
  { day: 2, value: "Tuesday" },
  { day: 3, value: "Wednesday" },
  { day: 4, value: "Thursday" },
  { day: 5, value: "Friday" },
  { day: 6, value: "Saturday" }
]

const affixMap = [
  { day: 1, value: "st" },
  { day: 2, value: "nd" },
  { day: 3, value: "rd" }
  // {day: 4, value: "th"}
]

// const searchHistory = []


// window.addEventListener('load', () => {
// searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
// })



// Initialize empty string for a default location set by the user. Until set, will use 10001 (Manhattan, NY)
let defaultLocation = new String()

// Intialize variable for searched zip, whether it is default location or inputted by user
let zipSearch = new String()

// Searches a new zip code inputted by the user
function searchNewZip(searchHistoryLink) {
  let zipInput = $("#zip-input").val().trim();
  // let weatherCard = document.querySelector(".weatherCard")
  let weatherCard = document.getElementsByClassName("weatherCard")
  
  let currentWeatherView = document.querySelector("#weather-view")
  let fiveDayView = document.querySelector("#fiveDayView")
  let zipCodeMessage = "Must Enter Valid Zip Code!"

  // console.log("searchHistoryLink", searchHistoryLink)
  // console.log("searchHistoryLink.length", searchHistoryLink.length)

  // If zip search bar is emptya nd 
  if (!(zipInput.length === 5) && (searchHistoryLink == null)) {
    console.log("5")
    // zipCodeMessage.append(zipCodeFailure);
    // zipCodeMessage.innertext = "Must Enter Valid Zip Code!"
    document.querySelector('.zipCodeMessage').innerText = zipCodeMessage;
    document.querySelector('#zipCodeMessage').classList.remove('hideZipCodeMessage');
    return
  } else {
    if (weatherCard) {

      currentWeatherView.innerHTML = '';
      fiveDayView.innerHTML = '';
    }
    document.querySelector('.zipCodeMessage').innerText = '';
    document.querySelector('#zipCodeMessage').classList.add('hideZipCodeMessage');
    displayCurrentWeather(searchHistoryLink);
    fiveDayForecast();
    getState();
    setTimeout(() => {
      populateSearchHistory();
    }, 1200)
  }

  // console.log(fiveDayView.childNodes)
  // console.log("zipInput not empty")
  // console.log("zipInput:", zipInput)
  // console.log("weatherCard.length", weatherCard.length)
  // console.log("getState", getState())
}

// Display Current Weather
function displayCurrentWeather(searchHistoryZip) {
  let zipInputBar = $("#zip-input").val().trim();

  // if(zipInput == null) {
  //   console.log("searchHistoryZip: undefined")
  // } 
  // else {
  //   console.log("Passed Search History Zip Value:", searchHistoryZip)
  // }
 

  // If no default location is saved
  // if (defaultLocation.length === 0) {
  //   console.log("Default Location Empty: Set as 10001")
  //   defaultLocation = "10001"
  //   zipSearch = defaultLocation
  // } 
  // else {
    // If the zip input bar is empty
    if(zipInputBar.length === 0) {
      // If the function isn't being invoked by search history link or pageload
      if(searchHistoryZip == null) {
        zipSearch = "10001"
        console.log("Not Search History Link")
      } 
      else {
        zipSearch = searchHistoryZip
      }
      console.log("No Zip Bar Value")
    } 
    else {
      zipSearch = zipInputBar
    }
  //}
  console.log("ZipSearch", zipSearch)

  // API call: Current Weather 
  // var theQueryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipSearch + ",us&appid=cee88101192942cc1ddef8fb37f11635";
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipSearch + ",us&appid=cee88101192942cc1ddef8fb37f11635";


  // console.log("THEQUERYURL", theQueryURL)
  // Creating an AJAX call for the current weather 
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    // console.log(response);
    // console.log("Response.name", response.name)

    let todayWeatherTitle = document.querySelector('#todayWeatherTitle')
    let currentCityTitle = document.querySelector(".currentCityTitle")
    let currentCity = response.name;
    let currentState = getState();

    // Get day, month, date to render for Current Weather
    // let getLocalDateAndTime = new Date(response.dt * 1000).toLocaleString();
    let currentMonth = new Date(response.dt * 1000).getMonth()
    let currentDay = new Date(response.dt * 1000).getDay()
    let currentDate = new Date(response.dt * 1000).getUTCDate()
    let currentDateAffixString = String(currentDate).slice(-1)
    let currentDateAffixNumber = Number(currentDateAffixString)
    let monthTitle, dateTitle, currentDateAffix;

    // Get Month for current date
    monthTitle = monthsMap[currentMonth].value

    // Get Week Day for current date
    dateTitle = daysMap[currentDay].value

    // Slice month value to last digit and assign suffix depending on value
    
      if (currentDateAffixNumber = affixMap.day) {
        currentDateAffix = affixMap[currentDateAffixNumber - 1].value 
      }
      else {
        // console.log("th")
        currentDateAffix = "th"
      }

    // console.log("CurrentDateAffix", currentDateAffix)

    // Grab the current weather title element and assign the date
    todayWeatherTitle.innerText = dateTitle + ", " + monthTitle + " " + currentDate + currentDateAffix;

    currentCityTitle.innerText = currentCity + ", " + currentState;


    // console.log("Get Local Date and Time", getLocalDateAndTime)
    // console.log("Current Month", currentMonth)
    // console.log("currentDay", currentDay)
    // console.log("UTC Date", currentDate)
    // console.log("Month Test", )
    // console.log("Date Test", dateTest + ", " + monthTest + " " + currentDate)

    // Storing the weather data
    var weather = response.weather[0].main;

    // Creating a div card to hold the current weather properties
    var weatherDiv = $("<div id='currentWeatherView' class='currentWeatherView card bg-light mb-3 weatherCard'>");

    // Current Weather icon 
    // Initalize variable for icon value from API response and select appropriate icon from /assets/icons
    let weatherIconValue = response.weather[0].icon

    // Initalize variable for current weather icon div
    var weatherIcon = $('<img />', {
      id: 'currentWeatherIcon',
      class: 'currentWeatherIcon',
      src: 'assets/icons/' + weatherIconValue + '.png',
      alt: 'Alt text'
    });

    // Creating an element to display current weather property (clear, clouds, etc.)
    var weatherValue = $("<p>").text(weather);
    weatherValue.attr('class', 'currentWeatherValue');

    // console.log(weatherValue)

    // Attach weather property and icon divs to current weather card. 
    weatherDiv.append(weatherIcon)
    weatherDiv.append(weatherValue);

    // Temperature Section 
    // var temperature = ((response.main.temp * 1.8) - 459.67);

    var temperature = Math.round(((response.main.temp * 1.8) - 459.67));


    // Creating an element to hold the plot
    var tempDisplay = $("<p>").text(temperature + " °F");
    tempDisplay.attr('class', 'currentWeatherTemp');


    // Appending the plot
    weatherDiv.append(tempDisplay);


    // Humidity Section 
    // Initalize variable for current weather humidity and set data from API call
    var humidity = response.main.humidity;


    // Creating an element to hold the current weather humidity value
    var humidityValue = $("<p>").text(" " + humidity + "%");
    humidityValue.attr('class', 'currentHumidityValue');

    // Attach humidity icon to humidity value (prepend so icon is in front of value)
    var humidityIcon = $('<img />', {
      id: 'id1',
      src: 'assets/icons/humidity.svg',
      alt: 'Alt text'
    });

    // $(document.createElement(humidityIcon));
    // Attach humidity icon in front of humidity value
    humidityValue.prepend(humidityIcon);

    // Attach humidity value to current weather card
    tempDisplay.append(humidityValue);

    // Retrieving the URL for the image
    var imgURL = response.Poster;

    // Creating an element to hold the image
    var image = $("<img>").attr("src", imgURL);

    // Appending the image
    weatherDiv.append(image);

    // Putting the entire movie above the previous movies
    $("#weather-view").prepend(weatherDiv);

    if( zipSearch != defaultLocation) {
      searchHistory.push({city: currentCity, state: currentState, zip: zipSearch})
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory ))

    }

    // console.log("Search History", searchHistory)
    // console.log("Search History Length Function End", searchHistory.length)
  });

}

function fiveDayForecast() {
  // let zipInput = $("#zip-input").val().trim();


  // if ( document.querySelector(".weatherCard") ) {
  //   console.log("toBeDeleted")
  // }

  if (defaultLocation.length === 0) {
    // console.log("Default Location Empty: Set as 10001")
    defaultLocation = "10001"
    zipSearch = defaultLocation
  }


  //var zipLocation = $("#data-name").val();
  // var zipLocation = $("#movie-input").val().trim();
  //var queryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipLocation + ",us&appid=cee88101192942cc1ddef8fb37f11635";
  var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?zip=" + zipSearch + ",us&appid=cee88101192942cc1ddef8fb37f11635";
  // Creating an AJAX call for the 5 day firecast
  $.ajax({
    url: fiveDayURL,
    method: "GET"
  }).then(function (response) {
    // Iterate over response 5 times for 5-day forecast

    // console.log("fiveDayResponse", response)
    // const days = {}

    const days = {}


    // console.log("Days", days)


    for (var i = 0; i < response.list.length; i++) {
      let item = response.list[i]
      let day = new Date(item.dt_txt).getDay()
      let month = new Date(item.dt_txt).getMonth()
      // let date = new Date(item.dt_txt).getUTCDate()
      // console.log("Month", month)
      // console.log("UTC Date", date)
      // console.log("Response.list.length", days[day].length)

      if (!days[day]) {
        days[day] = item
      }

    }

    let sortedDays = Object.values(days) //.sort((a, b) => (a.day > b.day) ? 1 : -1);

    sortedDays.forEach(day => {
      sortedDays.sort((a, b) => (a.dt_txt > b.dt_txt) ? 1 : -1)

    }
    )
    // console.log("Sorted Days", sortedDays)

    sortedDays.forEach(day => {

      // sortedDays.reverse( sortedDays.sort((a, b) => (a.dt_txt > b.dt_txt) ? 1 : -1) )
      sortedDays.sort((a, b) => (a.dt_txt > b.dt_txt) ? 1 : -1)


      // Creating a div to hold the current weather
      var colDiv = $("<div class='col'>");

      var weatherCard = $("<div class='fiveDayCards card bg-light text-black mb-4 weatherCard'>");

      let fiveDayDateResponse = new Date(day.dt_txt).toLocaleDateString();
      let forecastDays = new Date(day.dt_txt).getDay()

      let weatherIconValue = day.weather[0].icon


      // console.log("Forecast Days", forecastDays)

      // console.log("Day", daysMap[forecastDays].value  )

      // Initalize variable for current weather icon div
      var weatherIcon = $('<img />', {
        id: 'fiveDayWeatherIcon',
        class: 'fiveDayWeatherIcon',
        src: 'assets/icons/' + weatherIconValue + '.png',
        alt: 'Alt text'
      });

      // Storing the weather data
      var weather = day.weather[0].main;

      // Creating an element to have weather displayed
      var weatherValue = $("<p>").text(weather);
      weatherValue.attr('class', 'fiveDayWeatherValue');

      let fiveDayDateContainer = $("<div class='fiveDayDateContainer'>");

      let fiveDayDay = $("<p>").text(daysMap[forecastDays].value);
      let fiveDayDate = $("<p>").text(fiveDayDateResponse.slice(0, 5));
      fiveDayDateContainer.append(fiveDayDay)
      fiveDayDateContainer.append(fiveDayDate)

      // console.log("Five Day Date Test", (fiveDayDay + " " + fiveDayDate ))

      // console.log(weatherValue)

      // Displaying the weather
      weatherCard.append(fiveDayDateContainer)
      weatherCard.append(weatherIcon)
      weatherCard.append(weatherValue);

      // Storing the plot
      // var temperature = ((day.main.temp * 1.8) - 459.67);

      var temperature = Math.round(((day.main.temp * 1.8) - 459.67));


      // Creating an element to hold the plot
      // var tempDisplay = $("<p>").text("Temperature (F): " + temperature.toFixed(1) + "  deg.");
      let tempDisplay = $("<p>").text(" " + temperature + "°F");
      tempDisplay.attr('class', 'fiveDayForecastValue');

      var temperatureIcon = $('<img />', {
        id: 'fiveDayTemperatureIcon',
        class: 'fiveDayTemperatureIcon',
        src: 'assets/icons/thermometer-half.svg',
        alt: 'Alt text'
      });

      // $(document.createElement(humidityIcon));
      // humidityIcon.attr('src', './assets/icons/humidity.svg');
      tempDisplay.prepend(temperatureIcon);


      // Appending the plot
      weatherCard.append(tempDisplay);

      // Storing the humidity value
      var humidity = day.main.humidity;

      // humidity.toFixed(2);

      // Creating an element to hold the release year
      var humidityValue = $("<p>").text(" " + humidity + "%");
      humidityValue.attr('class', 'fiveDayForecastValue');


      // Displaying the release year
      weatherCard.append(humidityValue);

      var humidityIcon = $('<img />', {
        id: 'fiveHumidityIcon',
        class: 'fiveHumidityIcon',
        src: 'assets/icons/humidity.svg',
        alt: 'Alt text'
      });

      humidityValue.prepend(humidityIcon);

      // Retrieving the URL for the image
      var imgURL = day.Poster;

      // Creating an element to hold the image
      var image = $("<img>").attr("src", imgURL);

      // Appending the image
      weatherCard.append(image);

      // Putting the entire movie above the previous movies
      colDiv.append(weatherCard)
      $("#fiveDayView").prepend(weatherCard);
    })
  });

}

// Adding a click event listener to hourglass button on search bar and mapping "Enter" key event to searchNewZip();
$(document).on("click", "#searchWeather", searchNewZip);
$(document).keypress(function (e) {
  if (e.which == 13) {
    // console.log("enter")
    e.preventDefault()

    searchNewZip();
    // displayCurrentWeather(); 
    // fiveDayForecast();
  }
});

// Do this when the document loads. 
$(document).ready(function () {
  // Reset zipInputBar to '' to eliminate any characters leftover from previous searches. 
  zipInputBar.value = '';

  // Assign global search history variable as localStorage instance of 'searchHistory' or empty array and parse into JSON. 
  // searchHistory is set by newZipSearch as it only concerns locations manually searched by the user. 
  searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];


  displayCurrentWeather();
  fiveDayForecast();
  getState();

  populateSearchHistory()

});

async function populateSearchHistory() { 
  // await displayCurrentWeather()
  console.log("populateSearchHistory")

  let searchHistoryItems = document.getElementsByClassName("searchHistoryItem")
  let searchHistoryContainer = document.querySelector("#searchHistoryContainer")
  searchHistoryContainer.innerHTML = '';


  console.log("searchHistory", searchHistory)
  let searchHistoryFiltered = searchHistory.filter(
    (person, index) => index === searchHistory.findIndex(
      other => person.city === other.city
        && person.state === other.state
    ));

  for(i = 0; i < searchHistoryFiltered.length; i++) {
    let searchHistoryDiv = document.createElement("div");
    let searchHistoryItem = document.createElement("a");

    searchHistoryItem.href = "#";

    searchHistoryDiv.classList.add("searchHistoryDiv")
    searchHistoryItem.classList.add("searchHistoryItem")


    searchHistoryItem.textContent = searchHistoryFiltered[i].city + ", " + searchHistoryFiltered[i].state
    searchHistoryItem.value = searchHistoryFiltered[i].zip


    searchHistoryItem.addEventListener("click", () => {console.log("clicked", searchHistoryItem.value)})


    // searchHistoryItem.addEventListener("click",testSearchHistory(searchHistoryItem.value))


    searchHistoryDiv.append(searchHistoryItem)
    searchHistoryContainer.append(searchHistoryDiv)

    // console.log("Search History Filtered", searchHistoryFiltered);

  // End for loop 
  }

  // Make links out of each search history item. Add event listeners to trigger page refresh with mapped location.
  let searchHistoryLinks = [... searchHistoryItems] 
    searchHistoryLinks.forEach( link => {
      // console.log("Link Value", link.value)
      // link.addEventListener("click", testSearchHistory(link.value))

      link.addEventListener('click', function (event) {  
        // prevent browser's default action
        event.preventDefault();
    
        // call your awesome function here
        searchNewZip(link.value); // 'this' refers to the current button on for loop
    }, false);
  })
  //End populateSearchHistory(); 
}

// Determine the state of the searched zip code
function getState() {

  /* Ensure param is a string to prevent unpredictable parsing results */
  if (typeof zipSearch !== 'string') {
    console.log('Must pass the zipcode as a string.');
    console.log('Passed zipcode as type:', typeof zipSearch);
    console.log(zipSearch.length)
    return;
  }

  /* Ensure we have exactly 5 characters to parse */
  if (zipSearch.length !== 5) {
    console.log('Must pass a 5-digit zipcode.');
    return;
  }

  /* Ensure we don't parse strings starting with 0 as octal values */
  const zipcode = parseInt(zipSearch, 10);

  let st;
  let state;

  /* Code cases alphabetized by state */
  if (zipcode >= 35000 && zipcode <= 36999) {
    st = 'AL';
    state = 'Alabama';
  } else if (zipcode >= 99500 && zipcode <= 99999) {
    st = 'AK';
    state = 'Alaska';
  } else if (zipcode >= 85000 && zipcode <= 86999) {
    st = 'AZ';
    state = 'Arizona';
  } else if (zipcode >= 71600 && zipcode <= 72999) {
    st = 'AR';
    state = 'Arkansas';
  } else if (zipcode >= 90000 && zipcode <= 96699) {
    st = 'CA';
    state = 'California';
  } else if (zipcode >= 80000 && zipcode <= 81999) {
    st = 'CO';
    state = 'Colorado';
  } else if ((zipcode >= 6000 && zipcode <= 6389) || (zipcode >= 6391 && zipcode <= 6999)) {
    st = 'CT';
    state = 'Connecticut';
  } else if (zipcode >= 19700 && zipcode <= 19999) {
    st = 'DE';
    state = 'Delaware';
  } else if (zipcode >= 32000 && zipcode <= 34999) {
    st = 'FL';
    state = 'Florida';
  } else if ((zipcode >= 30000 && zipcode <= 31999) || (zipcode >= 39800 && zipcode <= 39999)) {
    st = 'GA';
    state = 'Georgia';
  } else if (zipcode >= 96700 && zipcode <= 96999) {
    st = 'HI';
    state = 'Hawaii';
  } else if (zipcode >= 83200 && zipcode <= 83999) {
    st = 'ID';
    state = 'Idaho';
  } else if (zipcode >= 60000 && zipcode <= 62999) {
    st = 'IL';
    state = 'Illinois';
  } else if (zipcode >= 46000 && zipcode <= 47999) {
    st = 'IN';
    state = 'Indiana';
  } else if (zipcode >= 50000 && zipcode <= 52999) {
    st = 'IA';
    state = 'Iowa';
  } else if (zipcode >= 66000 && zipcode <= 67999) {
    st = 'KS';
    state = 'Kansas';
  } else if (zipcode >= 40000 && zipcode <= 42999) {
    st = 'KY';
    state = 'Kentucky';
  } else if (zipcode >= 70000 && zipcode <= 71599) {
    st = 'LA';
    state = 'Louisiana';
  } else if (zipcode >= 3900 && zipcode <= 4999) {
    st = 'ME';
    state = 'Maine';
  } else if (zipcode >= 20600 && zipcode <= 21999) {
    st = 'MD';
    state = 'Maryland';
  } else if ((zipcode >= 1000 && zipcode <= 2799) || (zipcode == 5501) || (zipcode == 5544)) {
    st = 'MA';
    state = 'Massachusetts';
  } else if (zipcode >= 48000 && zipcode <= 49999) {
    st = 'MI';
    state = 'Michigan';
  } else if (zipcode >= 55000 && zipcode <= 56899) {
    st = 'MN';
    state = 'Minnesota';
  } else if (zipcode >= 38600 && zipcode <= 39999) {
    st = 'MS';
    state = 'Mississippi';
  } else if (zipcode >= 63000 && zipcode <= 65999) {
    st = 'MO';
    state = 'Missouri';
  } else if (zipcode >= 59000 && zipcode <= 59999) {
    st = 'MT';
    state = 'Montana';
  } else if (zipcode >= 27000 && zipcode <= 28999) {
    st = 'NC';
    state = 'North Carolina';
  } else if (zipcode >= 58000 && zipcode <= 58999) {
    st = 'ND';
    state = 'North Dakota';
  } else if (zipcode >= 68000 && zipcode <= 69999) {
    st = 'NE';
    state = 'Nebraska';
  } else if (zipcode >= 88900 && zipcode <= 89999) {
    st = 'NV';
    state = 'Nevada';
  } else if (zipcode >= 3000 && zipcode <= 3899) {
    st = 'NH';
    state = 'New Hampshire';
  } else if (zipcode >= 7000 && zipcode <= 8999) {
    st = 'NJ';
    state = 'New Jersey';
  } else if (zipcode >= 87000 && zipcode <= 88499) {
    st = 'NM';
    state = 'New Mexico';
  } else if ((zipcode >= 10000 && zipcode <= 14999) || (zipcode == 6390) || (zipcode == 501) || (zipcode == 544)) {
    st = 'NY';
    state = 'New York';
  } else if (zipcode >= 43000 && zipcode <= 45999) {
    st = 'OH';
    state = 'Ohio';
  } else if ((zipcode >= 73000 && zipcode <= 73199) || (zipcode >= 73400 && zipcode <= 74999)) {
    st = 'OK';
    state = 'Oklahoma';
  } else if (zipcode >= 97000 && zipcode <= 97999) {
    st = 'OR';
    state = 'Oregon';
  } else if (zipcode >= 15000 && zipcode <= 19699) {
    st = 'PA';
    state = 'Pennsylvania';
  } else if (zipcode >= 300 && zipcode <= 999) {
    st = 'PR';
    state = 'Puerto Rico';
  } else if (zipcode >= 2800 && zipcode <= 2999) {
    st = 'RI';
    state = 'Rhode Island';
  } else if (zipcode >= 29000 && zipcode <= 29999) {
    st = 'SC';
    state = 'South Carolina';
  } else if (zipcode >= 57000 && zipcode <= 57999) {
    st = 'SD';
    state = 'South Dakota';
  } else if (zipcode >= 37000 && zipcode <= 38599) {
    st = 'TN';
    state = 'Tennessee';
  } else if ((zipcode >= 75000 && zipcode <= 79999) || (zipcode >= 73301 && zipcode <= 73399) || (zipcode >= 88500 && zipcode <= 88599)) {
    st = 'TX';
    state = 'Texas';
  } else if (zipcode >= 84000 && zipcode <= 84999) {
    st = 'UT';
    state = 'Utah';
  } else if (zipcode >= 5000 && zipcode <= 5999) {
    st = 'VT';
    state = 'Vermont';
  } else if ((zipcode >= 20100 && zipcode <= 20199) || (zipcode >= 22000 && zipcode <= 24699) || (zipcode == 20598)) {
    st = 'VA';
    state = 'Virginia';
  } else if ((zipcode >= 20000 && zipcode <= 20099) || (zipcode >= 20200 && zipcode <= 20599) || (zipcode >= 56900 && zipcode <= 56999)) {
    st = 'DC';
    state = 'Washington DC';
  } else if (zipcode >= 98000 && zipcode <= 99499) {
    st = 'WA';
    state = 'Washington';
  } else if (zipcode >= 24700 && zipcode <= 26999) {
    st = 'WV';
    state = 'West Virginia';
  } else if (zipcode >= 53000 && zipcode <= 54999) {
    st = 'WI';
    state = 'Wisconsin';
  } else if (zipcode >= 82000 && zipcode <= 83199) {
    st = 'WY';
    state = 'Wyoming';
  } else {
    st = 'none';
    state = 'none';
    console.log('No state found matching', zipcode);
  }

  return state;
  // return st;
}




