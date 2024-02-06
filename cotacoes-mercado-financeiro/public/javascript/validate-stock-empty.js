const form = document.querySelector('#form-post-stocks')
const stock = document.getElementById('stocks')

form.addEventListener('submit', event => {
  if (!stock.value)
  {
    alert('O nome do ativo deve ser informado.')
    event.preventDefault()
  }
})


