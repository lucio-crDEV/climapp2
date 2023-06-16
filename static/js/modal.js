const mostrarModal = () => {
  document.querySelector("#modal321").modal("toggle")
}

const closeModal = () => {
  document.querySelector("#modal321").modal("hide")
}

export { mostrarModal, closeModal }