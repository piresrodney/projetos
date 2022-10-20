const tag_idade = document.querySelector('span.year-old');
const dataAtual = new Date();
const anoNascimento = 1990;
const anoAtual = Number(dataAtual.getFullYear());
const idade = anoAtual - anoNascimento;
tag_idade.innerHTML = idade;
