const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix } = require('./config.json');
require('dotenv').config()

const date = new Date();

const commands = [{
  "ping": "Pong!",
  "ding": "Dong!",
}]

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// its friday checker
client.setInterval(() => {  
  let curDate = new Date()
  console.log(`Date checked: ${curDate.toUTCString()}`)
  
  if (curDate.getDay() === 5  && curDate.getUTCHours() > 12 && curDate.getUTCHours() < 14) {
    let minChecker = client.setInterval(() => {
      if (curDate.getUTCHours() == 13) {
        client.channels.cache.get('736072678540312616').send("https://www.youtube.com/watch?v=1AnG04qnLqI")
        clearInterval(minChecker)
      } 
    }, 60000) // every minute until 9am ET
  }
}, 3600000) // every hour


client.on('message', msg => {
  if (msg.content.toLowerCase() === `${prefix}ping`) {
    msg.channel.send('Pong!');
  } else if (msg.content.toLowerCase() === `${prefix}ding`) {
    msg.channel.send('Dong!');
  } else if (msg.content.toLowerCase() === `${prefix}wing`) {
    msg.channel.send('Wong!');
  } else if (msg.content.toLowerCase() === `${prefix}whodat`) {
    msg.channel.send('ur mum!');
  } else if (msg.content.toLowerCase() === `${prefix}date`) {
    let month = date.getMonth()
    let day = date.getDay()
    let year = date.getFullYear()
    msg.channel.send(`${month}-${day}-${year}`)
  } else if (msg.content.toLowerCase() === `${prefix}time`) {
    let hour = date.getHours();
    let minute = date.getMinutes();
    let seconds = date.getSeconds();
    msg.channel.send(`${hour - 3}:${minute}:${seconds}`)
  }
});

client.login(process.env.TOKEN);
