import diasEnOrden from "./gestion.js";

const API_HOST = 'ea3225febe56ed2a4fe18cdcd8f84d7a';
let resultadoAPI;

const tiempo = document.querySelector('.tiempo');
const temperatura = document.querySelector('.temperatura');
const lugar = document.querySelector('.lugar');
const hora = document.querySelectorAll('.hora-prevision');
const grados = document.querySelectorAll('.hora-grados');
const dia = document.querySelectorAll('.dia');
const diaNombre = document.querySelectorAll('.dia-previson-nombre');
const diaTemperatura = document.querySelectorAll('.dia-previson-temperatura');

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
        temperatura.innerText = `${resultadoAPI.current.temp}º 🧥`;
        // Math.trunc
        lugar.innerText = resultadoAPI.timezone;

        let horaActual = new Date().getHours();
        for (let i = 0; i < hora.length; i++) {
            let horaIncr = horaActual+ i*3;
            if(horaIncr>24){
                hora[i].innerText =`${horaIncr - 24}h`;
            } else if(horaIncr === 24 ){
                hora[i].innerText = '00h';
            }else{
                hora[i].innerText = `${horaIncr}h`;
            }
            
        }

        for (let j = 0; j < grados.length; j++) {
            grados[j].innerText = `${resultadoAPI.hourly[j * 3].temp}º`;            
        }

        for (let k = 0; k < diasEnOrden.length; k++) {
            diaNombre[k].innerText = diasEnOrden[k];
        }

        for (let l = 0; l < 7; l++) {
            diaTemperatura[l].innerText = `${resultadoAPI.daily[l+1].temp.day}º`;
        }
    });
}
