$(document).ready(function () {
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );

  const myTooltipEl = document.getElementById("climaActual");
  const tooltip = bootstrap.Tooltip.getOrCreateInstance(myTooltipEl);
  const myTooltipEl2 = document.getElementById("compartir");
  const tooltip2 = bootstrap.Tooltip.getOrCreateInstance(myTooltipEl2);

  // Obtener los elementos HTML
  var ciudadElement = $(".ciudad");
  var descripcionElement = $("#descripcion");
  var temperaturaElement = $("#temperatura");
  var temperaturaMinElement = $("#temp_min");
  var temperaturaMaxElement = $("#temp_max");
  var latitudElement = $("#latitud");
  var longitudElement = $("#longitud");
  var iconoElement = $("#icono");
  var uvElement = $("#uv_max");
  var uvActualElement = $("#uvActual");
  var probLluviaElement = $("#probLluvia");
  var nubosidadElement = $("#nubosidad");
  var humedadElement = $("#humedad");
  var iconoElement2 = $("#icono2");
  var codigo_clima2Element = $("#codigo_clima2");
  var descripcion2Element = $("#descripcion2");
  var probabilidad_lluvia2Element = $("#probabilidad_lluvia2");
  var temperatura_min2Element = $("#temperatura_min2");
  var temperatura_max2Element = $("#temperatura_max2");
  var uv_index_max2Element = $("#uv_index_max2");
  var formatted_horaElement = $("#formatted_hora");
  var dia_consultaElement = $("#dia_consulta");

  // Limpiando variables para cada consulta
  ciudadElement.empty();
  descripcionElement.empty();
  temperaturaElement.empty();
  temperaturaMinElement.empty();
  temperaturaMaxElement.empty();
  latitudElement.empty();
  longitudElement.empty();
  iconoElement.empty();
  uvElement.empty();
  uvActualElement.empty();
  probLluviaElement.empty();
  nubosidadElement.empty();
  humedadElement.empty();
  iconoElement2.empty();
  codigo_clima2Element.empty();
  descripcion2Element.empty();
  probabilidad_lluvia2Element.empty();
  temperatura_min2Element.empty();
  temperatura_max2Element.empty();
  uv_index_max2Element.empty();
  formatted_horaElement.empty();
  dia_consultaElement.empty();

  // Obtener la ubicación actual del usuario
  function obtenerUbicacion() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;

          // Actualizar los elementos HTML con las coordenadas
          latitudElement.text(latitude.toFixed(6));
          longitudElement.text(longitude.toFixed(6));

          // Obtener el clima utilizando las coordenadas
          obtenerClima(latitude, longitude);
        },

        function (error) {
          // Manejar el error de obtener la ubicación
          console.error(error);
          // Mostrar el mensaje de error
          $(".cargando").hide();
          $("#mensaje-error").show();
          $("#svgWrapper").show();
        }
      );
    } else {
      alert("La geolocalización no es compatible en este navegador.");
    }
  }

  // Copiar al portapapeles
  function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
  }

  // Obtener el clima utilizando las coordenadas
  function obtenerClima(latitude, longitude) {
    var data = {
      latitude: latitude,
      longitude: longitude,
    };

    // Realizar una solicitud POST al servidor para obtener el clima
    $.ajax({
      url: "/obtener_clima",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (response) {
        // Actualizar los elementos HTML con la información del clima
        ciudadElement.text(response.ciudad);
        descripcionElement.text(response.descripcion);
        temperaturaElement.text(response.temperatura + "°C");
        temperaturaMinElement.text(response.temperatura_min + "°C");
        temperaturaMaxElement.text(response.temperatura_max + "°C");
        uvElement.text(response.uv_index_max);
        uvActualElement.text(response.uv_index_actual);
        probLluviaElement.text(response.probabilidad_lluvia + "%");
        nubosidadElement.text(response.nubosidad + "%");
        humedadElement.text(response.humedad_relativa + "%");
        codigo_clima2Element.text(response.codigo_clima2);
        descripcion2Element.text(response.descripcion2);
        probabilidad_lluvia2Element.text(response.probabilidad_lluvia2 + "%");
        temperatura_min2Element.text(response.temperatura_min2 + "°C");
        temperatura_max2Element.text(response.temperatura_max2 + "°C");
        uv_index_max2Element.text(response.uv_index_max2);
        formatted_horaElement.text(response.formatted_hora);
        dia_consultaElement.text(
          response.dia_consulta + " | " + response.ciudad
        );

        // Obtener el icono correspondiente al clima
        obtenerIconoClima(response.descripcion);
        obtenerIconoClima2(response.descripcion2);

        //Copiar clima al clipboard
        myTooltipEl.addEventListener("click", () => {
          copyToClipboard("#temperaturaActual");
          tooltip.setContent({ ".tooltip-inner": "Copiado!" });
          setTimeout(() => {
            tooltip.hide();
            setTimeout(() => {
              tooltip.setContent({ ".tooltip-inner": "Copiar clima" });
            }, 2000);
          }, 2000);
        });

        //Compartir pagina
        myTooltipEl2.addEventListener("click", () => {
          copyToClipboard("#urlApp");
          setTimeout(() => {
            tooltip2.hide();
          }, 1000);
        });

        // Mostrar el contenido del clima
        $(".cargando").hide();
        $(".contenido-clima").show();
        $("#carousel").show();
      },
      error: function (error) {
        // Manejar los errores de la solicitud
        console.error(error);
        // Mostrar el mensaje de error
        $("#mensaje-error").show();
      },
    });
  }

  // Obtener el icono correspondiente al clima utilizando la descripción
  function obtenerIconoClima(descripcion) {
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
  function obtenerIconoClima2(descripcion) {
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

  // Obtener la ubicación y el clima al cargar la página
  obtenerUbicacion();

  // Inicializar el carrusel
  $("#carousel").owlCarousel({
    loop: false,
    margin: 50,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  });
});