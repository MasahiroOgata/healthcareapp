const tableRows = document.querySelectorAll(".table-clickable tbody tr");

for (const tableRow of tableRows) { 
    tableRow.addEventListener("click", function () {
        window.location.href = this.dataset.href;
    });}

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
