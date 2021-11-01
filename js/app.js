import diasEnOrden from "./gestion.js";
// LA CLAVE DE NUESTRA API
const API_HOST = 'ea3225febe56ed2a4fe18cdcd8f84d7a';
let resultadoAPI;

// HTML
const tiempo = document.querySelector('.tiempo');
const temperatura = document.querySelector('.temperatura');
const lugar = document.querySelector('.lugar');
const hora = document.querySelectorAll('.hora-prevision');
const grados = document.querySelectorAll('.hora-grados');
const dia = document.querySelectorAll('.dia');
const diaNombre = document.querySelectorAll('.dia-previson-nombre');
const diaTemperatura = document.querySelectorAll('.dia-previson-temperatura');
const imgIcone = document.querySelector('.logo');
const spinner = document.querySelector('.cargando');

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        // Recogemos los datos del cliente gracias a la info de su navegador
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
    // Solicitamos los datos meteorologicos a esta API
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitud}&lon=${longitud}&exclude=minutely&units=metric&lang=es&appid=${API_HOST}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        resultadoAPI=data;
        // tiempo de ahora
        tiempo.innerText = resultadoAPI.current.weather[0].description;
        // temperatura de ahora
        temperatura.innerText = `${resultadoAPI.current.temp}º 🧥`;
        // Math.trunc
        // Lugar desde donde estoy iniciando
        lugar.innerText = resultadoAPI.timezone;

        let horaActual = new Date().getHours();
        // Separamos el dia en tramos de tres horas
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

        // imprime la temperatura que va a hacer
        for (let j = 0; j < grados.length; j++) {
            grados[j].innerText = `${resultadoAPI.hourly[j * 3].temp}º`;            
        }
        // imprime dia de la semana empezando por el de hoy
        for (let k = 0; k < diasEnOrden.length; k++) {
            diaNombre[k].innerText = diasEnOrden[k];
        }
        // imprime media de temperatura de cada día 
        for (let l = 0; l < 7; l++) {
            diaTemperatura[l].innerText = `${resultadoAPI.daily[l+1].temp.day}º`;
        }

        if(horaActual >= 6 && horaActual <= 21){
            // coge las imagenes de la carpeta de dia
            imgIcone.src = `src/dia/${resultadoAPI.current.weather[0].icon}.svg`;
        }else{
            // coge las imagenes de la carpeta de noche
            imgIcone.src = `src/noche/${resultadoAPI.current.weather[0].icon}.svg`;
        }

        // Añadimos un loading...
        spinner.classList.add('desaparecer');
    });
}
