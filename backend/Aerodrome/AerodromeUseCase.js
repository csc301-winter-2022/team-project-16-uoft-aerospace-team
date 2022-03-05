var axios = require("axios").default;
const Aerodrome = require("./Aerodrome.js");

const nearby = {
  method: 'GET',
  url: 'https://forteweb-airportguide-airport-basic-info-v1.p.rapidapi.com/airports_nearby',
  params: {auth: 'authairport567', lat: '33.922840', lng: '-118.335187', miles: '5'},
  headers: {
    'x-rapidapi-host': 'forteweb-airportguide-airport-basic-info-v1.p.rapidapi.com',
    'x-rapidapi-key': '94669c1224mshd12b65b412250c0p17f0b6jsnb8a840eb74de'
  }
};

axios.request(nearby).then(function (response) {
    const NearbyAerodrome = response.data.airport_list.map(function(aerodrome_info) {
        return new Aerodrome(aerodrome_info.name, aerodrome_info.local_id, "cert", "0", "0", "0");
    });

    console.log(NearbyAerodrome);
}).catch(function (error) {
	console.error(error);
});