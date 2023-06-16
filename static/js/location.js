document.addEventListener("DOMContentLoaded", function() {
    function mostrarMensaje() {
      setTimeout(function() {
        document.getElementById("msjeNavegador").classList.remove("display-none");
        setTimeout(function() {
          document.querySelector(".autoriza").classList.remove("display-none");
          setTimeout(function() {
            document.querySelector(".autorizaLink").classList.remove("display-none");
            setTimeout(function() {
              document.querySelector(".authOk").classList.remove("display-none");
            }, 4000);
          }, 1000);
        }, 2000);
      }, 2000);
    }
  
    mostrarMensaje();
  });
  
