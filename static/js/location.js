$(document).ready(function () {
    function mostrarMensaje() {
      setTimeout(() => {
        $("#msjeNavegador").removeClass("display-none")
        setTimeout(() => {
          $(".autoriza").removeClass("display-none");
          setTimeout(() => {
            $(".autorizaLink").removeClass("display-none")
            setTimeout(() => {
              $(".authOk").removeClass("display-none");
            }, 4000);
          }, 1000);
        }, 2000);
      }, 2000);
    }

    mostrarMensaje();
  });