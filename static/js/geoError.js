window.addEventListener("DOMContentLoaded", () => {
  (()=>{
    setTimeout(() => {
      document.querySelector("#msjeNavegador").classList.remove("display-none");
      setTimeout(() => {
        document.querySelector(".autoriza").classList.remove("display-none");
        setTimeout(() => {
          document.querySelector(".autorizaLink").classList.remove("display-none");
          setTimeout(() => {
            document.querySelector(".authOk").classList.remove("display-none");
          }, 4000);
        }, 1000);
      }, 2000);
    }, 2000);
  })()
});
