module.exports = {
	name: 'kick',
	description: 'kick user',
	execute(message) {
    if (!message.mentions.users.size) {
      return message.reply('you need to tag a user in order to kick them!');
    }
    
    const taggedUser = message.mentions.users.first();  // grab the "first" mentioned user from the message. This will return a `User` object, just like `message.author`
    
    message.channel.send(`You wanted to kick: ${taggedUser.username}`);
	},
};