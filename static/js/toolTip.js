export default function toolTips() {
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
}
