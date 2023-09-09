const apiKey = '8d0b2d15b4fcd6dd1824109334d8aa11';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

// ?q={city name}&appid={API key}'

document.addEventListener('DOMContentLoaded', function(){
    let input = document.getElementById('textbox');

    input.addEventListener('keydown', function(event){
        if (event.key === 'Enter'){
            event.preventDefault();
            let uncleanInput = event.target.value;
            let userInput = uncleanInput.toLowerCase();
            handleUserInput(userInput);
        }
    });

    async function handleUserInput(userInput){
        let callString  = '?q=' + userInput + '&appid=' + apiKey;
        const response = await fetch(apiUrl + callString);
        let data = await response.json();
        console.log(data);

        img = document.getElementById('img');
        description = data['weather'][0]['description'];
        console.log(description);
        img.src = `pictures/${description}.png`;

        degree = document.getElementById('degree');
        temp = data['main']['feels_like'] - 273.15;
        degree.innerHTML = `${temp.toFixed(2)}&deg;c`;
        
        country = document.getElementById('country');
        let countryString = userInput.toString();
        country.innerHTML = countryString.charAt(0).toUpperCase() + countryString.slice(1);
        
        humidity = document.getElementById('humidity');
        percent = data['main']['humidity'];
        humidity.innerHTML = `${percent}%`;

        windSpeed = document.getElementById('wind-speed');
        speed = data['wind']['speed'] * 3.6;
        windSpeed.innerHTML = `${speed.toFixed(2)} km/h`;
    }


});

