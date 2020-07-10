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
      console.log("Please enter a city");
      return;
    }

    console.log(`You are searching for the weather of city ${query_param}`);
    $.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${query_param}&appid=${appID}`
      )
      .then((response) => response)
      .then((weatherData) => {
        console.log(weatherData);
        const { name, main, weather, wind, coord } = weatherData;

        const { temp, humidity } = main;

        $("#city").html(name);
        const convertedTemp = (parseFloat(temp) - 273.15) * (9 / 5) + 32;
        $("#temperature").html(`${convertedTemp.toFixed(1)} °F`);
        $("#humidity").html(humidity + " %");
        $("#wind-speed").html(wind.speed + " mph");

        $("#weather_image").attr(
          "src",
          "http://openweathermap.org/img/w/" + weather[0].icon + ".png"
        );

        return coord;
      })
      .then(({ lat, lon }) => {
        // #uvIndex
        // Retrieve UV index
        $.get(
          `http://api.openweathermap.org/data/2.5/uvi?appid=${appID}&lat=${lat}&lon=${lon}`
        )
          .then((response) => response)
          .then((uvIndex) => {
            const { value } = uvIndex;
console.log(uvIndex);
            $("#uvIndex").html(value);
            uvColor(value);
          
        })

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
      
    // 5 Day Forecast
    $.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${query_param}&appid=${appID}`
    )
      .then((response) => response)
      .then((fiveDay) => {
        const {list} = fiveDay;

       
        const sliceArray = list.slice(0,5);
        console.log(sliceArray);

        for(const dayForecast of sliceArray){
          const { dt, main:{temp, humidity} } =dayForecast
          const convertedTemp = ((parseFloat(temp) - 273.15) * (9 / 5) + 32).toFixed(1);
          const date = new Date(dt * 1000).toLocaleDateString()
          console.log(date, convertedTemp, humidity);

          const cardTemplate =`<div class="row card col-3">
          <div class= "fiveDay">
              <div class="date5">Date:&nbsp${date}</div>
              <br>
              <img class="5Day-img"><img src=" " alt=" ">
              <br>
              <div class="temp5">Temp:&nbsp${convertedTemp}&nbsp°F</div>
              <br>
              <div class="humidity5">Humidity:&nbsp${humidity}&nbsp%</div>
          </div>
      </div>`

      // TO DO: Append the card template to forecast container

      $('#forecast').append(cardTemplate);
      
      for(let i=0; i < date[i]; i++){
        let cardTemplate = function(i){
          return(cardTemplate);
        }
      }
    }
  })
  })
});