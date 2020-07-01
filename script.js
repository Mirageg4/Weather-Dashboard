//Run page when document is loaded
$(document).ready(function() {

    //API Key
    const appID = "de153e330cd6475e4d72b5a0d24f06ce";

    //Search Button for City
    $(".btn btn-primary").click(function(){
        let query_param = $(this).prev().val();

        //Input Placeholder including previous city search
        ($(this).prev().attr("placeholder") == "City") {
          let weather = "api.openweathermap.org/data/2.5/weather?q={city name},{state code}&appid=" + query_param + "&APPID=" + appID;
      }

        $.getJSON(weather,function(json){
            $("#city").html(json.name);
            $("#temperature").html(json.main.temp);
            $("#humidity").html(json.main.humidity);
            $("#wind speed").html(json.main.windSpeed);
            $("#uvIndex").html(json.uvIndex);

            $("#weather_image").attr("src", "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
            
          });
        })
             // Code for temperature conversion
    let fahrenheit = true;

    $("#convertToCelsius").click(function() {
        if (fahrenheit) {
            $("#temperature").text(((($("#temperature").text() - 32) * 5) / 9));
        }
        fahrenheit = false;
    });

    $("#convertToFahrenheit").click(function() {
        if (fahrenheit == false) {
            $("#temperature").text((($("#temperature").text() * (9/5)) + 32));
        }
        fahrenheit = true;
    })
});

$.get("api.openweathermap.org/data/2.5/weather?q={city name},{state code}&appid=" + query_param + "&APPID=" + appID)
  .then((res) => {
    console.log("First callback");
  })
  .then((res) => {
    console.log("Second callback");
  })
  .then((res) => {
    console.log("Third callback");
  });

    console.log("Test");

