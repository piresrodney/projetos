const axios = require('axios')

// class CurrencyDolar {
//   constructor() {
//     currencyDolar = currencyDolar()
//   }

//   currencyDolar() {
//     axios.get('https://brapi.dev/api/v2/currency?currency=USD-BRL')
//     .then(response => {        
//       return response
//     })
//   }
// }

function currencyDolar() {
  axios.get('https://brapi.dev/api/v2/currency?currency=USD-BRL')
  .then(response => {        
    return response
  })
}

module.exports = currencyDolar

