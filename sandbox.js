import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://public-holiday.p.rapidapi.com/2019/US',
  headers: {
    'X-RapidAPI-Key': '572ad51bf0mshc666409ae633163p14001ejsnaae8605d0622',
    'X-RapidAPI-Host': 'public-holiday.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}