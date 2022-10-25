const { Client, GatewayIntentBits } = require('discord.js');
const config = require("./config.json");
const rpgDiceRoller = require('@dice-roller/rpg-dice-roller');
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

// function getQuote() {
// 	return fetch("https://zenquotes.io/api/kindness")
// 		.then(res => {
// 			return res.json()
// 		})
//     .then(data => {
// 		return data[0]["q"] + " -" + data[0]["a"]
//     })
// }

console.log("Loggin with token: "+config.BOT_TOKEN);
const prefix = "!";
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});
client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
	}
});
client.on("messageCreate", function(message) {
	//guardians
	if (message.author.bot) return; //let's ignore bots.
	if (!message.content.startsWith(prefix)) return;

	console.log(message.author + " says:");
	console.log(message.content);
	const commandBody = message.content.slice(prefix.length);
	console.log("command body:" + commandBody);
	const args = commandBody.split(' ');
	console.log("args: "+args);
	const command = args.shift().toLowerCase();
	console.log('command:'+command);
	if (command === "ping") {
		const timeTaken = Date.now() - message.createdTimestamp;
		message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
	}
	if (command==="r"){
		const rollin=args.join('')
		console.log('trying '+ rollin);
		const roll = new rpgDiceRoller.DiceRoll(rollin)??'invalid roll'; //tryn null coalesing to catch failing instance
		console.log(`${roll.output}!`);
		message.reply(`${roll.output}!`);
	}
	if(command==="an"){
		console.log(args);
		console.log('trying '+ args.join(' '));
	}
	// if (command === "sum") {
	// 	const numArgs = args.map(x => parseFloat(x));
	// 	const sum = numArgs.reduce((counter, x) => counter += x);
	// 	message.reply(`The sum of all the arguments you provided is ${sum}!`);
	// }
	// if (command === "inspiration"){
	// 	message.reply(getQuote());
	// }
});
client.login(config.BOT_TOKEN);
