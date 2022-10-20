const textoHTML = document.querySelector('span.current-year');
const ano = new Date().getFullYear();
textoHTML.innerHTML = ano;