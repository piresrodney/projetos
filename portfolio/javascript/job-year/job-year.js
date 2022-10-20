const spanHTML = document.querySelector('span.job-year');
const anoInicio = 2013;
const anoCorrente = new Date().getFullYear();
spanHTML.innerHTML = Number(anoCorrente) - Number(anoInicio);