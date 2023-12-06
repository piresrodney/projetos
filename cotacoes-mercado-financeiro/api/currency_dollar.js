const currencyURL = 'https://brapi.dev/api/v2/currency?currency=USD-BRL&tokenxaKhfFAyWPAhyHVFetxkuG'

async function currencyDolar() {
  const currencyResponse = await fetch(currencyURL)
  const currencyData = await currencyResponse.json()
  const dollarText = currencyData.currency[currencyData.currency.length-1].askPrice
  const dollarValue = Number(dollarText).toFixed(2).replace('.', ',')

  console.log(dollarValue)

  return dollarValue
}

module.exports = currencyDolar

