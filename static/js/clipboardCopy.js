// Copiar al portapapeles
export default function copyToClipboard(element) {
  var documentQuerySelectorTemp = document.querySelector("<input>");
  document.querySelector("body").append(document.querySelectortemp);
  documentQuerySelectorTemp
    .val(document.querySelector(element).text())
    .select();
  document.execCommand("copy");
  documentQuerySelectorTemp.remove();
}
