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

client.on('message', msg => {
  if (msg.content.toLowerCase() === `${prefix}ping`) {
    msg.channel.send('Pong!');
  } else if (msg.content.toLowerCase() === `${prefix}ding`) {
    msg.channel.send('Dong!');

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