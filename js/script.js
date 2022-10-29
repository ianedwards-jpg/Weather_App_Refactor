// Initial array of movies
var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

let zipLocation = $("#movie-input").val().trim();


// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayCurrentWeather() {

  //var zipLocation = $("#data-name").val();
  // var zipLocation = $("#movie-input").val().trim();
  console.log(zipLocation)
  // if (zipLocation.val() === 0)
  //var queryURL = "https://api.openweathermap.org/data/2.5/weather?zip=06804,us&appid=cee88101192942cc1ddef8fb37f11635";
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipLocation + ",us&appid=cee88101192942cc1ddef8fb37f11635";
  // Creating an AJAX call for the current weather 
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    console.log(response);
    // Creating a div to hold the current weather
    // var weatherDiv = $("<div class='weatherInfo'>");
    var weatherDiv = $("<div class='weatherInfo card bg-light mb-3'>");

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

  //var zipLocation = $("#data-name").val();
  // var zipLocation = $("#movie-input").val().trim();
  //var queryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipLocation + ",us&appid=cee88101192942cc1ddef8fb37f11635";
  var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?zip=" + zipLocation + ",us&appid=cee88101192942cc1ddef8fb37f11635";
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

    } console.log(Object.values(days))
      console.log(days)
        Object.values(days).forEach(day=>{
           // Creating a div to hold the current weather
          var colDiv= $("<div class='col'>");

          var weatherCard= $("<div class='card bg-primary text-white mb-4'>");

          // Storing the weather data
          var weather = day.weather[0].main;

          // Creating an element to have weather displayed
          var pOne = $("<p>").text("Weather: " + weather);
          console.log(pOne)

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

// Function for displaying movie data
// function renderButtons() {

//   // Deleting the movies prior to adding new movies
//   // (this is necessary otherwise you will have repeat buttons)
//   $("#buttons-view").empty();

//   // Looping through the array of movies
//   for (var i = 0; i < movies.length; i++) {

//     // Then dynamicaly generating buttons for each movie in the array
//     // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
//     var a = $("<button>");
//     // Adding a class of movie-btn to our button
//     a.addClass("movie-btn");
//     // Adding a data-attribute
//     a.attr("data-name", movies[i]);
//     // Providing the initial button text
//     a.text(movies[i]);
//     // Adding the button to the buttons-view div
//     $("#buttons-view").append(a);
//   }
// }

// // This function handles events where a movie button is clicked
// $("#add-movie").on("click", function(event) {
//   event.preventDefault();
//   // This line grabs the input from the textbox
//   var movie = $("#movie-input").val().trim();

//   // Adding movie from the textbox to our array
//   movies.push(movie);

//   // Calling renderButtons which handles the processing of our movie array
//   renderButtons();
// });

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).one("click", "#searchWeather", displayCurrentWeather);
$(document).one("click", "#searchWeather", fiveDayForecast);

$( document ).ready(function() {
  
  console.log(zipLocation)
  if (zipLocation.length ===0) {
    console.log("zipempty")
    zipLocation = "10001"
  }
  console.log( "ready!" );
  console.log( "zip value", zipLocation );

  displayCurrentWeather(); 
  fiveDayForecast();
});


      // Calling the renderButtons function to display the initial buttons
      //renderButtons();

      // var queryURL = "api.openweathermap.org/data/2.5/weather?zip=" + zipLocation + "&appid=cee88101192942cc1ddef8fb37f11635";

