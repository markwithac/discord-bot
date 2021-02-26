const fs = require('fs');
const Discord = require('discord.js');
const { prefix } = require('./config.json');
require('dotenv').config()

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);  // set a new item in the Collection with the key as the command name and the value as the exported module
}

// Log in
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Commands
client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(' ');
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);

  try {
		command.execute(message, args);
	} catch (error) {
		// console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});


// Its friday checker
client.setInterval(() => {  
  let curDate = new Date()
  console.log(`Date checked: ${curDate.toUTCString()}`)
  
  if (
    curDate.getDay() === 5  
    && curDate.getUTCHours() >= 17 
    && curDate.getUTCHours() <= 18
  ) {
    let minChecker = client.setInterval(() => {
      console.log('Minute checked')
      if (curDate.getUTCHours() == 18) {
        client.channels.cache.get('379813082362281995').send("https://www.youtube.com/watch?v=1AnG04qnLqI")
        clearInterval(minChecker)
        console.log('interval cleared')
      } 
    }, 60000) // every minute until 9am ET
  }
}, 3600000) // every hour  = 3600000

client.login(process.env.TOKEN);
