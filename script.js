$(document).ready(function () {

    function show(data) {
        // temp (F), humidity (%), wind (mph)
        return "<h2>" + data.name + moment().format(' (MM/DD/YYYY)') + "</h2>" +
            `
        <p><strong>Temperature</strong>: ${data.main.temp} °F</p>
        <p><strong>Humidity</strong>: ${data.main.humidity}%</p>
        <p><strong>Wind Speed</strong>: ${data.wind.speed} mph</p>
        `
    }

    function showUV(data) {
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        console.log(uvDisplay);
        return `
        <p><strong>UV Index:</strong>:${data.value}</p>
        `
    }

    function displayCities(cityList) {
        $('.cityList').empty();
        var list = localStorage.getItem("cityList");
        cityList = (JSON.parse(list));
        if (list) {
            for (var i = 0; i < cityList.length; i++) {
                var container = $("<div class=card></div>").text(cityList[i]);
                $('.cityList').prepend(container);
            }
        }
    }

    function showForecast(data) {
        var forecast = data.list;
        var currentForecast = [];
        for (var i = 0; i < forecast.lenght; i++) {
            var currentObject = forecast[i];
            // 1:0, 2:-1, 3:-2
            var dt_time = currentObject.dt_txt.split(' ')[1] // 1 is index
            if (dt_time === "12:00:00") {
                var main = currentObject.main;
                var temp = main.temp; // *C -> *F
                var humidity = main.humidity;
                var date = moment(currentObject.dt_txt).format('1'); // momentjs conversion
                var icon = currentObject.weather[0].icon;
                var iconUrl = "https://openweathermap.org/img/wn/" + icon + ".png";
            
                let htmlDisplay = `
                    <div class="col-sm currentWeather">
                        <div class="card">
                            <div class="card-body 5day">
                                <p><strong>${date}</strong></p>
                                <div><img src=${iconUrl}/></div>
                                <p>Temp: ${temp} °F</p>
                                <p>Humidity: ${humidity}%</p>
                            </div>
                        </div> 
                    </div>`;
                currentForecast.push(htmlDisplay);
            }
        }
        $("#5day-forecast").html(currentForecast.join(''));
    }

// Method
    var stored = localStorage.getItem("cityList")
    if (stored) {
        cityList = JSON.parse(stored)
    } else {
        cityList = []
    }

    $('#submitCity').click(function (event) {
        event.preventDefault();
        var city = $('#city').val();
        cityList.push(city);
        localStorage.setItem("cityList", JSON.stringify(cityList));
        displayCities(cityList);
        if (city != '') {
            $.ajax({
                // url: api.openweathermap.org/data/2.5/weather?id={city id}&appid={your api key}
                type: "GET",
                success: function (data) {
                    var display = show(data);
                    $("#show").html(display);
                }
            });

            // $.ajax({}) showForecast

            //$.ajax({}) showUV

        } else {
            $('#error').html('Please insert a city:');
        }
    });

    displayCities(cityList);

});