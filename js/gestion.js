let diasSemana = ['Lunes 😃','Martes 😄','Miércoles😁','Jueves 😆','Viernes 🥳','Sábado 🤪','Domingo😴'];

let today = new Date();
let opciones = {weekday: 'long'};
let diaActual = today.toLocaleDateString('es-ES', opciones);

diaActual = diaActual.charAt(0).toUpperCase + diaActual.slice(1);

let diasEnOrden = diasSemana.slice(diasSemana.indexOf(diaActual)).concat(diasSemana.slice(0, diasSemana.indexOf(diaActual)));

// alert(diasEnOrden);

export default diasEnOrden ;