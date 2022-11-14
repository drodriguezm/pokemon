const request = require('request');
const url = 'https://pokeapi.co/api/v2/pokemon/ditto';
request({url: url}, (error, response) => {
	const data = JSON.parse(response.body);
	console.log(data.game_indices[0].version);
})
// const getData = async () => {
// 	try {
// 		const res = await got
// 			.get('https://pokeapi.co/api/v2/pokemon/ditto')
// 			.json();
// 		console.log(res);
// 	} catch (err) {
// 		console.log(err);
// 	}
// };