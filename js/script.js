// Set variable for zip-location

// Initialize empty string for a default location set by the user. Until set, will use 10001 (Manhattan, NY)
// let defaultLocation = new String()
const zipInputBar = document.querySelector("#zip-input")

let defaultLocation = new String()

// Intialize variable for searched zip, whether it is default location or inputted by user
let zipSearch = new String()


function searchNewZip () {
  let zipInput = $("#zip-input").val().trim();
  // let weatherCard = document.querySelector(".weatherCard")
  let weatherCard = document.getElementsByClassName("weatherCard")
  let currentWeatherView = document.querySelector("#weather-view")
  let fiveDayView = document.querySelector("#fiveDayView")
  let zipCodeMessage = "Must Enter Valid Zip Code!"
  // let zipCodeMessage = document.querySelector(".zipCodeMessage")
  // let zipCodeFailure = $("<p>").text("Must Enter Valid Zip Code!");
  


  

  if (!( zipInput.length === 5) ) {
    console.log("5")
    // zipCodeMessage.append(zipCodeFailure);
    // zipCodeMessage.innertext = "Must Enter Valid Zip Code!"
    document.querySelector('.zipCodeMessage').innerText=zipCodeMessage;
    return
  } else {
    if ( weatherCard ) {

      currentWeatherView.innerHTML = '';
      fiveDayView.innerHTML = '';
    }
    document.querySelector('.zipCodeMessage').innerText='';  
    displayCurrentWeather(); 
    fiveDayForecast();
  }

  

  console.log(fiveDayView.childNodes)
  console.log ("zipInput not empty")
  console.log ("zipInput:", zipInput)
  console.log(weatherCard.length)
}

function displayCurrentWeather() {

  let zipInput = $("#zip-input").val().trim();

  if (defaultLocation.length  === 0) {
    console.log("Default Location Empty: Set as 10001")
    defaultLocation = "10001"
    zipSearch = defaultLocation 
  } else {
    zipSearch = zipInput 
  }


  //var zipLocation = $("#data-name").val();
  // var zipLocation = $("#movie-input").val().trim();
  console.log(zipInput)
  console.log(zipSearch)

  // if ( !(zipSearch.length === 0 ) ){
  //   console.log("ToBeSearched:", zipInput)
  //   zipSearch = zipInput
  // } else {
  //   zipSearch = defaultLocation
  // }

  // if (zipLocation.val() === 0)
  //var queryURL = "https://api.openweathermap.org/data/2.5/weather?zip=06804,us&appid=cee88101192942cc1ddef8fb37f11635";

  // API call: Current Weather 
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipSearch + ",us&appid=cee88101192942cc1ddef8fb37f11635";
  // Creating an AJAX call for the current weather 
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    console.log(response);
    // Creating a div to hold the current weather
    // var weatherDiv = $("<div class='weatherInfo'>");
    var weatherDiv = $("<div id='currentWeatherView' class='currentWeatherView card bg-light mb-3 weatherCard'>");

  //  class="" style="max-width: 18rem;">

    // Storing the weather data
    var weather = response.weather[0].main;

    // Creating an element to have weather displayed
    // var pOne = $("<p>").text("Weather: " + weather);
    var pOne = $("<p>").text(weather);

    console.log(pOne)

    // Displaying the rating
    weatherDiv.append(pOne);

    // Storing the release year
    var humidity = response.main.humidity;

    // Creating an element to hold the release year
    var pTwo = $("<p>").text("Humidity: " + humidity + "%");

    // Displaying the release year
    weatherDiv.append(pTwo);

    // Storing the plot
    var temperature = ((response.main.temp * 1.8) - 459.67);

    // Creating an element to hold the plot
    // var tempDisplay = $("<p>").text("Temp. (F°):"  + temperature.toFixed(1) + "  deg.");
    var tempDisplay = $("<p>").text("Temp. "  + temperature.toFixed(1) + "°F");

    // Appending the plot
    weatherDiv.append(tempDisplay);

    // Retrieving the URL for the image
    var imgURL = response.Poster;

    // Creating an element to hold the image
    var image = $("<img>").attr("src", imgURL);

    // Appending the image
    weatherDiv.append(image);

    // Putting the entire movie above the previous movies
    $("#weather-view").prepend(weatherDiv);
  });

}

function fiveDayForecast() {
  let zipInput = $("#zip-input").val().trim();


  // if ( document.querySelector(".weatherCard") ) {
  //   console.log("toBeDeleted")
  // }

  if (defaultLocation.length  === 0) {
    console.log("Default Location Empty: Set as 10001")
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
    const days = {}
    for (var i = 0; i < response.list.length; i++) {
      let item = response.list[i]
      let day = new Date(item.dt_txt).getDay()
      if (!days[day]) {
        days[day] = item
      }

    } 
    console.log(Object.values("objectValueDays", days))
      console.log("Days", days)
        Object.values(days).forEach(day=>{
           // Creating a div to hold the current weather
          var colDiv= $("<div class='col'>");

          var weatherCard= $("<div class='card bg-light text-black mb-4 weatherCard'>");

          // Storing the weather data
          var weather = day.weather[0].main;

          // Creating an element to have weather displayed
          var pOne = $("<p>").text("Weather: " + weather);
          // console.log(pOne)

          // Displaying the rating
          weatherCard.append(pOne);

          // Storing the release year
          var humidity = day.main.humidity;

          humidity.toFixed(2);

          // Creating an element to hold the release year
          var pTwo = $("<p>").text("Humidity: " + humidity + "%");

          // Displaying the release year
          weatherCard.append(pTwo);

          // Storing the plot
          var temperature = ((day.main.temp * 1.8) - 459.67);


          // Creating an element to hold the plot
          var tempDisplay = $("<p>").text("Temperature (F): " + temperature.toFixed(1) + "  deg.");

          // Appending the plot
          weatherCard.append(tempDisplay);

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

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", "#searchWeather", searchNewZip);
$(document).keypress(function(e) {
  if(e.which == 13) {
    console.log("enter")
    e.preventDefault()

    searchNewZip();
    // displayCurrentWeather(); 
    // fiveDayForecast();
  }
});


$( document ).ready(function() {
  
  // console.log(zipLocation)
  // if (zipInput.length === 0){
    // console.log ("zipInput Empty")
  // if (defaultLocation.length  === 0) {
  //   console.log("Default Location Empty: Set as 10001")
  //   defaultLocation = "10001"
  //   zipSearch = defaultLocation 
  // }

  // } 


  
  console.log( "Document OnLoad" );

  console.log( "Default Zip Location:", defaultLocation );
  // console.log( "Zip Input", zipInput );
  // console.log( "Zip Searched", zipSearch );
  zipInputBar.value = '';


  displayCurrentWeather(); 
  fiveDayForecast();
  
});




