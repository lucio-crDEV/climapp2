document.addEventListener("DOMContentLoaded", function() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = Array.from(tooltipTriggerList).map(function(tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  
    const myTooltipEl = document.getElementById("climaActual");
    const tooltip = bootstrap.Tooltip.getOrCreateInstance(myTooltipEl);
    const myTooltipEl2 = document.getElementById("compartir");
    const tooltip2 = bootstrap.Tooltip.getOrCreateInstance(myTooltipEl2);
  
    var ciudadElement = document.querySelector(".ciudad");
    var descripcionElement = document.getElementById("descripcion");
    var temperaturaElement = document.getElementById("temperatura");
    var temperaturaMinElement = document.getElementById("temp_min");
    var temperaturaMaxElement = document.getElementById("temp_max");
    var latitudElement = document.getElementById("latitud");
    var longitudElement = document.getElementById("longitud");
    var iconoElement = document.getElementById("icono");
    var uvElement = document.getElementById("uv_max");
    var uvActualElement = document.getElementById("uvActual");
    var probLluviaElement = document.getElementById("probLluvia");
    var nubosidadElement = document.getElementById("nubosidad");
    var humedadElement = document.getElementById("humedad");
    var iconoElement2 = document.getElementById("icono2");
    var codigo_clima2Element = document.getElementById("codigo_clima2");
    var descripcion2Element = document.getElementById("descripcion2");
    var probabilidad_lluvia2Element = document.getElementById("probabilidad_lluvia2");
    var temperatura_min2Element = document.getElementById("temperatura_min2");
    var temperatura_max2Element = document.getElementById("temperatura_max2");
    var uv_index_max2Element = document.getElementById("uv_index_max2");
    var formatted_horaElement = document.getElementById("formatted_hora");
    var dia_consultaElement = document.getElementById("dia_consulta");
  
    ciudadElement.innerHTML = "";
    descripcionElement.innerHTML = "";
    temperaturaElement.innerHTML = "";
    temperaturaMinElement.innerHTML = "";
    temperaturaMaxElement.innerHTML = "";
    latitudElement.innerHTML = "";
    longitudElement.innerHTML = "";
    iconoElement.innerHTML = "";
    uvElement.innerHTML = "";
    uvActualElement.innerHTML = "";
    probLluviaElement.innerHTML = "";
    nubosidadElement.innerHTML = "";
    humedadElement.innerHTML = "";
    iconoElement2.innerHTML = "";
    codigo_clima2Element.innerHTML = "";
    descripcion2Element.innerHTML = "";
    probabilidad_lluvia2Element.innerHTML = "";
    temperatura_min2Element.innerHTML = "";
    temperatura_max2Element.innerHTML = "";
    uv_index_max2Element.innerHTML = "";
    formatted_horaElement.innerHTML = "";
    dia_consultaElement.innerHTML = "";
  
    function obtenerUbicacion() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
  
            latitudElement.innerHTML = latitude.toFixed(6);
            longitudElement.innerHTML = longitude.toFixed(6);
  
            obtenerClima(latitude, longitude);
          },
          function(error) {
            console.error(error);
            document.querySelector(".cargando").style.display = "none";
            document.getElementById("mensaje-error").style.display = "block";
            document.getElementById("svgWrapper").style.display = "block";
          }
        );
      } else {
        alert("La geolocalización no es compatible en este navegador.");
      }
    }
  
    function copyToClipboard(element) {
      var tempInput = document.createElement("input");
      document.body.appendChild(tempInput);
      tempInput.value = document.querySelector(element).textContent;
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
    }
  
    function obtenerClima(latitude, longitude) {
      var data = {
        latitude: latitude,
        longitude: longitude,
      };
  
      fetch("/obtener_clima", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(function(response) {
          if (!response.ok) {
            throw new Error("Error en la solicitud.");
          }
          return response.json();
        })
        .then(function(response) {
          ciudadElement.textContent = response.ciudad;
          descripcionElement.textContent = response.descripcion;
          temperaturaElement.textContent = response.temperatura + "°C";
          temperaturaMinElement.textContent = response.temperatura_min + "°C";
          temperaturaMaxElement.textContent = response.temperatura_max + "°C";
          uvElement.textContent = response.uv_index_max;
          uvActualElement.textContent = response.uv_index_actual;
          probLluviaElement.textContent = response.probabilidad_lluvia + "%";
          nubosidadElement.textContent = response.nubosidad + "%";
          humedadElement.textContent = response.humedad_relativa + "%";
          codigo_clima2Element.textContent = response.codigo_clima2;
          descripcion2Element.textContent = response.descripcion2;
          probabilidad_lluvia2Element.textContent = response.probabilidad_lluvia2 + "%";
          temperatura_min2Element.textContent = response.temperatura_min2 + "°C";
          temperatura_max2Element.textContent = response.temperatura_max2 + "°C";
          uv_index_max2Element.textContent = response.uv_index_max2;
          formatted_horaElement.textContent = response.formatted_hora;
          dia_consultaElement.textContent = response.dia_consulta + " | " + response.ciudad;
  
          obtenerIconoClima(response.descripcion);
          obtenerIconoClima2(response.descripcion2);
  
          myTooltipEl.addEventListener("click", function() {
            copyToClipboard("#temperaturaActual");
            tooltip.setContent({ ".tooltip-inner": "Copiado!" });
            setTimeout(function() {
              tooltip.hide();
              setTimeout(function() {
                tooltip.setContent({ ".tooltip-inner": "Copiar clima" });
              }, 2000);
            }, 2000);
          });
  
          myTooltipEl2.addEventListener("click", function() {
            copyToClipboard("#urlApp");
            setTimeout(function() {
              tooltip2.hide();
            }, 1000);
          });
  
          document.querySelector(".cargando").style.display = "none";
          document.querySelector(".contenido-clima").style.display = "block";
          document.getElementById("carousel").style.display = "block";
        })
        .catch(function(error) {
          console.error(error);
          document.getElementById("mensaje-error").style.display = "block";
        });
    }
  
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
          icono = "fa-smog";
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
          icono = "fa-snowflake";
          break;
        default:
          icono = "fa-question";
          break;
      }
  
      iconoElement.className = "fas " + icono;
    }
  
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
          icono = "fa-smog";
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
          icono = "fa-snowflake";
          break;
        default:
          icono = "fa-question";
          break;
      }
  
      iconoElement2.className = "fas " + icono;
    }
  
    obtenerUbicacion();
  
    var owl = $("#carousel");
    owl.owlCarousel({
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