
$(document).ready(function () {

    // Function

    function show(data) {
    // temp (F), humidity (%), wind (mph)
        return "<h2>" + data.name + moment().format(' (MM/DD/YYYY)') + "</h2>" +
            `
        <p><strong>Temperature</strong>: ${data.main.temp} °F</p>
        <p><strong>Humidity</strong>: ${data.main.humidity}%</p>
        <p><strong>Wind Speed</strong>: ${data.wind.speed} mph</p>
        `
    }

    // UV displayed as bold, utilize lat and log var (class act)
    function showUV(data) {
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        console.log(uvDisplay);
        return `
        <p><strong>UV Index:</strong>:${data.value}</p>
        `
    }

    // city list, local storage
    function displayCities(cityList) {
        $('.city-list').empty();
        var list = localStorage.getItem("cityList");
        cityList = (JSON.parse(list));
        // string returned, js function to parse cityList
        if (list) {
            for (var i = 0; i < cityList.length; i++) {
                var container = $("<div class=card></div>").text(cityList[i]);
                $('.city-list').prepend(container);
            }
        }
    }

    function showForecast(data) {
        var forecast
        // Obj to display date, icon, temp, humidity ; html display

        // Variables for each requested data category
        // convert temp F (class act)
        var temp 
        var humidity
        var date 
        var icon
        var iconUrl

        let htmlDisplay = `
            <div class="col-sm weatherCondition">
            <div class="card">
                <div class="card-body 5d">
                    <p><strong>date</strong></p>
                    <div><img src=icon-url/></div>
                    <p>Temp: °F</p>
                    <p>Humidity:%</p>
                </div>
            </div> 
        </div>`;
        //push info into htmlDisplay
    }

}

// Method

var stored = localStorage.getItem("cityList")
if (stored) {
    cityList = JSON.parse(stored)
} else {
    cityList = []
}

// var cityList 
$('#submitCity').click(function (event) {
    // prevent default action!
    event.preventDefault();
    var city = $('#city').val();

    // city gets pushed into cityList array
    // cityList set in localStorage
    // displayCities(cityList) if (AJAX)...else (error, cityName input req)
        // ajax, reference class act
            // $.ajax({
            //     url: 'openWeather API' + city + "&units=imperial",
            //     type: "GET",
            //     success: function (data) {
            //         var display = show(data);
            //         $("#show").html(display);
            //     }
            // });            
        // 
    }