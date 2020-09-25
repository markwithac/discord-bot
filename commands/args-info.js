module.exports = {
	name: 'args-info',
	description: 'Information about the arguments provided.',
	args: true,
	execute(message, args) {
    if (!args.length) {
      return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}
		
		message.channel.send(`Command name: ${command}\nArguments: ${args}`);
	},
};