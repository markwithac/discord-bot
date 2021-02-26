const fetch = require('node-fetch')
'use strict';
const fs = require('fs');
const { stringify } = require('querystring');

var data = JSON.parse(fs.readFileSync('champions.json'));
// console.log(Object.values(data.data))
// Object.keys(rawdata).map(e => console.log(e.id))

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
			const KEY = process.env.API_KEY

			try {
        (async () => {
          const response1 = await fetch(
            `${NAroute}${summonerName}/${summonerQuery}?api_key=${KEY}`
            )
            .then( res => res.json())
            .then( res => fetch(
                `${NAroute}${matchAccId}/${res.accountId}?queue=420&endIndex=10&api_key=${KEY}`
              ))
            .then( res => res.json())
            .catch(error => console.log(error))
        
          const response2 = await Promise.all(response1.matches.map(item => 
            fetch(`${NAroute}${matchId}/${item.gameId}?api_key=${KEY}`)
            .then(res => res.json()))) 
        
          participantIds = []
          championIds = []
          const response3 = response2.map((each, index) => {
            each.participants.reduce(function(arr, e, i) {
              if (e.championId == response1.matches[index].champion)  {
                participantIds.push(i+1);
                championIds.push(e.championId)
              }
              return ;
            }, [])}
          )
      
          let results = []
          response2.map((each, i) => {
            if (( each.teams[0].win == "Win" && participantIds[i] <6 ) || ( each.teams[1].win == "Win" && participantIds[i] > 5 ) ) {
              results.push("Victory")
            } else { results.push("Defeat") }
          })

          let finalResults = [];
          const championNames = []
          const finalChampions = championIds.map((each, i) => {
            Object.values(data.data).reduce(function(arr, e, i) {
              if (e.key == each.toString()) {
                championNames.push(e.id);
              } 
              return ;
            }, [])
          })

          championNames.forEach((champion, i) => finalResults.push({[champion] : results[i]}));
          finalResults = JSON.stringify(finalResults, null, 1)
          console.log(finalResults[0])

          message.channel.send(finalResults);

        })()			
			} catch (err) {message.channel.send(err.message);}
}}};



