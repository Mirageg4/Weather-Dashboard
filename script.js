//Run page when document is loaded
$(document).ready(function () {
  //API Key
  const appID = "de153e330cd6475e4d72b5a0d24f06ce";

  const savedCities = JSON.parse(localStorage.getItem("savedCities")) || []

  const savedCitiesContainer = $("#saved-city")

  // Load any saved cities from local storage onto the page
  for (const city of savedCities) {
    const cityItem = `<ul class="list-group-item col-8">${city}</ul>`

    savedCitiesContainer.append(cityItem)
  }

  // Bind a click event to a saved city list item which calls the API with that city
  $(".saved-city-item").click(function (e) {
    const cityName = $(this).text()

    // TODO - Call the API

  })

  //Search Button function for City Search
  $("#cityInputButton").click(function (e) {
    // Prevents page from refreshing when submit buttons are clicked
    e.preventDefault();

    let query_param = $(this).prev().val();

    if (query_param.length === 0) {
      console.log("Please enter a city");
      return;
    }
    //Get Weather API with necessary key values
    console.log(`You are searching for the weather of city ${query_param}`);
    $.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${query_param}&appid=${appID}`
      )
      .then((response) => response)
      .then((weatherData) => {
        console.log(weatherData);
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

        // Save a city to local storage and render onto page when a city is searched for
        savedCities.push(name)

        localStorage.setItem("savedCities", JSON.stringify(savedCities))

        const cityItem = `<ul class="list-group-item col-8 saved-city-item">${name}</ul>`
        
        // Saved Cities Container
        savedCitiesContainer.append(cityItem)

        //Display City, Temperature, Humidity, Wind Speed
        $("#city").html(name);
        const convertedTemp = (parseFloat(temp) - 273.15) * (9 / 5) + 32;
        $("#temperature").html(`${convertedTemp.toFixed(1)} °F`);
        $("#humidity").html(humidity + " %");
        $("#wind-speed").html(wind.speed + " mph");
        //get weather icon url
        $("#weather_image").attr(
          "src",
          `http://openweathermap.org/img/w/${weather[0].icon}.png`

        );

        return coord;
      })
      .then(({
        lat,
        lon
      }) => {
        // #uvIndex
        // Retrieve UV index
        $.get(
            `http://api.openweathermap.org/data/2.5/uvi?appid=${appID}&lat=${lat}&lon=${lon}`
          )
          .then((response) => response)
          .then((uvIndex) => {
            const {
              value
            } = uvIndex;
            console.log(uvIndex);
            $("#uvIndex").html(value);
            uvColor(value);

          })
          // UV Index Color Chart
        function uvColor(uv) {
          var colors;

          if (uv < 3) {
            colors = "#458b00";
          } else if (uv < 6) {
            colors = "#ffd700";
          } else if (uv < 8) {
            colors = "#ee7600";
          } else if (uv < 11) {
            colors = "#ff4040";
          } else {
            colors = "#9400d3";
          }

          $("#uvIndex").css("background-color", colors);

        }
      })

    // Get 5 Day Forecast
    $.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${query_param}&appid=${appID}`
      )
      .then((response) => response)
      .then((fiveDay) => {
        const {
          list
        } = fiveDay;

        const renderedDays = [];

        for (const dayForecast of list) {
          const {
            dt,
            main: {
              temp,
              humidity,
            },
            weather
          } = dayForecast

          const [weatherData] = weather;

          const {
            icon
          } = weatherData

          //Adjust millisecond date parameter, & convert Kelvin to Fahrenheit
          const day = new Date(dt * 1000).getDate()
          if (renderedDays.includes(day)) continue
          else renderedDays.push(day)
          const convertedTemp = ((parseFloat(temp) - 273.15) * (9 / 5) + 32).toFixed(1);
          const date = new Date(dt * 1000).toLocaleDateString()

          console.log(date, convertedTemp, humidity, icon);

          //Create Five Day Forecast card template
          const cardTemplate = `<div class="row card col-3">
          <div class= "fiveDay">
              <div class="date5">Date:&nbsp${date}</div>
              <br>
              <div class="5Day-img"><img src="http://openweathermap.org/img/w/${icon}.png"</div>
              <br>
              <div class="temp5">Temp:&nbsp${convertedTemp}&nbsp°F</div>
              <br>
              <div class="humidity5">Humidity:&nbsp${humidity}&nbsp%</div>
          </div>
      </div>`

          // TO DO: Append the card template to forecast container

          $('#forecast').append(cardTemplate);


        }
      });
  })
});