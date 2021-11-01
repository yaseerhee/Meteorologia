const API_HOST = 'ea3225febe56ed2a4fe18cdcd8f84d7a';
let resultadoAPI;

const tiempo = document.querySelector('.tiempo');
const temperatura = document.querySelector('.temperatura');
const lugar = document.querySelector('.lugar');

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        let longitud =  position.coords.longitude;
        let latitud =  position.coords.latitude;
        llamarAPI(longitud,latitud);
        
    }, () =>{
        alert('Has rechazado la geolocalización!');
    });

}

let llamarAPI = (longitud, latitud) => {
    console.log(longitud);
    console.log(latitud);

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitud}&lon=${longitud}&exclude=minutely&units=metric&lang=es&appid=${API_HOST}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        resultadoAPI=data;

        tiempo.innerText = resultadoAPI.current.weather[0].description;
        temperatura.innerText = `${resultadoAPI.current.temp}º`;
        // Math.trunc
        lugar.innerHTML = resultadoAPI.timezone;


    });

}
