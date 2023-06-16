// Obtener el icono correspondiente al clima utilizando la descripción
export default function obtenerIconoClima(descripcion) {
  var icono = "";

  switch (descripcion) {
    case "Despejado":
    case "Principalmente despejado":
      icono = "fa-sun text-warning";
      break;
    case "Parcialmente nublado":
      icono = "fa-cloud-sun";
      break;
    case "Nublado":
      icono = "fa-cloud";
      break;
    case "Niebla":
      icono = "fa-smog";
      break;
    case "Niebla con escarcha":
      icono = "fa-smog"; // Opcional: puedes asignar un ícono diferente si lo deseas
      break;
    case "Llovizna ligera":
    case "Llovizna moderada":
    case "Llovizna densa":
      icono = "fa-cloud-rain";
      break;
    case "Lluvia ligera":
    case "Lluvia moderada":
    case "Lluvia fuerte":
    case "Lluvia helada ligera":
    case "Lluvia helada fuerte":
      icono = "fa-cloud-showers-heavy";
      break;
    case "Nieve ligera":
    case "Nieve moderada":
    case "Nieve fuerte":
    case "Granos de nieve o cinarra":
      icono = "fa-snowflake";
      break;
    case "Lluvia leve":
    case "Lluvia moderada":
    case "Lluvia violenta":
      icono = "fa-cloud-rain";
      break;
    case "Chubascos de nieve leves":
    case "Chubascos de nieve fuertes":
      icono = "fa-snowflake"; // Opcional: puedes asignar un ícono diferente si lo deseas
      break;
    default:
      icono = "fa-question";
      break;
  }

  // Actualizar el elemento HTML con el icono correspondiente
  iconoElement.attr("class", "fas " + icono);
}

// Obtener el icono correspondiente al clima utilizando la descripción
export default function obtenerIconoClima2(descripcion) {
  var icono = "";

  switch (descripcion) {
    case "Despejado":
    case "Principalmente despejado":
      icono = "fa-sun text-warning";
      break;
    case "Parcialmente nublado":
      icono = "fa-cloud-sun";
      break;
    case "Nublado":
      icono = "fa-cloud";
      break;
    case "Niebla":
      icono = "fa-smog";
      break;
    case "Niebla con escarcha":
      icono = "fa-smog"; // Opcional: puedes asignar un ícono diferente si lo deseas
      break;
    case "Llovizna ligera":
    case "Llovizna moderada":
    case "Llovizna densa":
      icono = "fa-cloud-rain";
      break;
    case "Lluvia ligera":
    case "Lluvia moderada":
    case "Lluvia fuerte":
    case "Lluvia helada ligera":
    case "Lluvia helada fuerte":
      icono = "fa-cloud-showers-heavy";
      break;
    case "Nieve ligera":
    case "Nieve moderada":
    case "Nieve fuerte":
    case "Granos de nieve o cinarra":
      icono = "fa-snowflake";
      break;
    case "Lluvia leve":
    case "Lluvia moderada":
    case "Lluvia violenta":
      icono = "fa-cloud-rain";
      break;
    case "Chubascos de nieve leves":
    case "Chubascos de nieve fuertes":
      icono = "fa-snowflake"; // Opcional: puedes asignar un ícono diferente si lo deseas
      break;
    default:
      icono = "fa-question";
      break;
  }

  // Actualizar el elemento HTML con el icono correspondiente
  iconoElement2.attr("class", "fas " + icono);
}
