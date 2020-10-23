const fetch = require('node-fetch')

module.exports = {
	
	name: 'lol',
	description: 'Prune up to 99 messages.',
	
	async execute(message, args) {
		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		
		} else {
	
			const summonerQuery = args[0];
			const NAroute = "https://na1.api.riotgames.com";
			const summonerName = `/lol/summoner/v4/summoners/by-name`
			const matchAccId = `/lol/match/v4/matchlists/by-account`
			const matchId = "/lol/match/v4/matches"
			const KEY = "RGAPI-763bb50b-3787-42a7-a4c6-49028da13746"

			try {
				const response = await fetch(
					`${NAroute}${summonerName}/${summonerQuery}?api_key=${KEY}`
					)
						.then( res => res.json())
						// .then(res => console.log(res))
						.then( res => fetch(
							`${NAroute}${matchAccId}/${res.accountId}?api_key=${KEY}`
						)
							.then( res => res.json())
							// .then(res => console.log(res))
							.then( res => res.matches.slice(0,10))
							.then(
								res => Promise.all(res.map(item => fetch(`${NAroute}${matchId}/${item.gameId}?api_key=${KEY}`).then(res => res.json()) ))
							)
						)
					
				const response2 = response.map(item => item.teams[0].win)
				message.channel.send(response2);			
			} catch (err) {message.channel.send(err.message);}
}}};