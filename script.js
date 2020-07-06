//Run page when document is loaded
$(document).ready(function () {

  //API Key
  const appID = "de153e330cd6475e4d72b5a0d24f06ce";

  //Search Button function for City Search
  $("#cityInputButton").click(function (e) {
    // Prevents page from refreshing when submit buttons are clicked
    e.preventDefault();

    let query_param = $(this).prev().val();

    if (query_param.length === 0) {
      console.log("Please enter a city")
      return
    };

    console.log(`You are searching for the weather of city ${query_param}`)
    $.get(`https://api.openweathermap.org/data/2.5/weather?q=${query_param}&appid=${appID}`)
      .then((response) => response)
      .then((weatherData) => {

        const {
          name,
          main,
          weather,
          wind,
          coord
        } = weatherData;

        const {
          temp,
          humidity
        } = main;

        $("#city").html(name);
        $("#temperature").html(temp);
        $("#humidity").html(humidity);
        $("#wind-speed").html(wind.speed);

        $("#weather_image").attr("src", "http://openweathermap.org/img/w/" + weather[0].icon + ".png");

        return coord;
      })
      .then(({
        lat,
        lon
      }) => {
        // #uvIndex
        // Retrieve UV index
        $.get(`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${appID}`)
          .then(({
            value
          }) => $("#uvIndex").html(value))

      })
      // 5 Day Forecast
        $.get(`https://api.openweathermap.org/data/2.5/forecast?q=${lat}&lon=${lon}&appid=${appID}`)
        .then((response) => response)
      .then((fiveDay) => {

        const {
          date,
          icon,
          coord
        } = fiveDay;

        const {
          temp,
          humidity
        } = forecast;

        
        $("#temperature1").html(temp);
        $("#humidity1").html(humidity);
        
      })
  })

  // Code for temperature conversion
  let fahrenheit = true;

  $("#convertToFahrenheit").click(function () {
    if (fahrenheit == false) {
      $("#temperature").text((($("#temperature").text() * (9 / 5)) + 32));
    }
    fahrenheit = true;
  })
});