// Copiar al portapapeles
export function copyToClipboard(element) {
  var documentQuerySelectorTemp = document.querySelector("<input>");
  document.querySelector("body").append(document.querySelectortemp);
  documentQuerySelectorTemp
    .val(document.querySelector(element).text())
    .select();
  document.execCommand("copy");
  documentQuerySelectorTemp.remove();
}
