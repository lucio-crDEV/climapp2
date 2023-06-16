document.querySelector(document).ready(function () {
  function mostrarMensaje() {
    setTimeout(() => {
      document.querySelector("#msjeNavegador").removeClass("display-none");
      setTimeout(() => {
        document.querySelector(".autoriza").removeClass("display-none");
        setTimeout(() => {
          document.querySelector(".autorizaLink").removeClass("display-none");
          setTimeout(() => {
            document.querySelector(".authOk").removeClass("display-none");
          }, 4000);
        }, 1000);
      }, 2000);
    }, 2000);
  }

  mostrarMensaje();
});
