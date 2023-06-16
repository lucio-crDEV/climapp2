import { obtenerIconoClima, obtenerIconoClima2 } from './getClimate';
import { clearElements } from './clearAll';
import { toolTips } from './toolTips';


  // Obtener la ubicación actual del usuario
  (()=>{
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
          document.querySelector(".cargando").hide();
          document.querySelector("#mensaje-error").show();
          document.querySelector("#svgWrapper").show();
        }
      );
    } else {
      alert("La geolocalización no es compatible en este navegador.");
    }

    toolTips()
    clearElements()
  })()

  
  // Obtener los elementos HTML
  var ciudadElement = document.querySelector(".ciudad");
  var descripcionElement = document.querySelector("#descripcion");
  var temperaturaElement = document.querySelector("#temperatura");
  var temperaturaMinElement = document.querySelector("#temp_min");
  var temperaturaMaxElement = document.querySelector("#temp_max");
  var latitudElement = document.querySelector("#latitud");
  var longitudElement = document.querySelector("#longitud");
  var iconoElement = document.querySelector("#icono");
  var uvElement = document.querySelector("#uv_max");
  var uvActualElement = document.querySelector("#uvActual");
  var probLluviaElement = document.querySelector("#probLluvia");
  var nubosidadElement = document.querySelector("#nubosidad");
  var humedadElement = document.querySelector("#humedad");
  var iconoElement2 = document.querySelector("#icono2");
  var codigo_clima2Element = document.querySelector("#codigo_clima2");
  var descripcion2Element = document.querySelector("#descripcion2");
  var probabilidad_lluvia2Element = document.querySelector("#probabilidad_lluvia2");
  var temperatura_min2Element = document.querySelector("#temperatura_min2");
  var temperatura_max2Element = document.querySelector("#temperatura_max2");
  var uv_index_max2Element = document.querySelector("#uv_index_max2");
  var formatted_horaElement = document.querySelector("#formatted_hora");
  var dia_consultaElement = document.querySelector("#dia_consulta");

  // Obtener el clima utilizando las coordenadas
  function obtenerClima(latitude, longitude) {
    var data = {
      latitude: latitude,
      longitude: longitude,
    };

    // Solicitud POST, recepciópn JSON, contenido de Elements
    document.querySelector.ajax({
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
        probabilidad_lluvia2Element.text(
          response.probabilidad_lluvia2 + "%"
        );
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
        document.querySelector(".cargando").hide();
        document.querySelector(".contenido-clima").show();
        document.querySelector("#carousel").show();
      },
      error: function (error) {
        // Manejar los errores de la solicitud
        console.error(error);
        // Mostrar el mensaje de error
        document.querySelector("#mensaje-error").show();
      },
    });
  }

  // Inicializar el carrusel
  document.querySelector("#carousel").owlCarousel({
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