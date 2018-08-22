//http://data.fixer.io/api/latest?access_key=29ccdd0e801b7de27dad066e35415fcc
const axios = require('axios')
// const getCurrencyRate = (from, to) => {
//     return axios.get('http://data.fixer.io/api/latest?access_key=29ccdd0e801b7de27dad066e35415fcc')
//         .then((response) => {
//             const euro = 1 / response.data.rates[from]
//             const rate = euro * response.data.rates[to]
//             return rate;
//         })
//         .catch(() => {
//         })
// }

const getCurrencyRate = async (from, to) => {
    const response = await axios.get('http://data.fixer.io/api/latest?access_key=29ccdd0e801b7de27dad066e35415fcc');
    const euro = 1 / response.data.rates[from]
    const rate = euro * response.data.rates[to]
    return rate;
}


const getCountriesPerCurrency = async (cur) => {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${cur}`);

    let countries = response.data.map(i => i.name);
    return countries;
}


convertCurrency = async (from, to, amount) => {
    const currencyRate = await getCurrencyRate(from, to);
    let newAmout = amount * currencyRate;
    const countries = await getCountriesPerCurrency(to)
    return {newAmout, countries};

}

// getCurrencyRate('USD', 'CAD')
//     .then((rate) => {
//         console.log('rate', rate)
//     })
//     .catch(() => {
//     })
//
// getCountriesPerCurrency("ILS")
//     .then((countries) => {
//         console.log('countries', countries)
//     })

convertCurrency('USD', 'ILS', 100)
    .then(({newAmout, countries}) => {
        console.log(`100 usd worth ${newAmout.toFixed(2)} ils, u can spend them in ${countries}`)
    })