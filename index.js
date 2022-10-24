const Discord = require("discord.js");
const config = require("./config.json");
const fetch = require("node-fetch")
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});

function getQuote() {
	return fetch("https://zenquotes.io/api/kindness")
		.then(res => {
			return res.json()
		})
    .then(data => {
		return data[0]["q"] + " -" + data[0]["a"]
    })
}

const prefix = "!";
client.on("messageCreate", function(message) {
	//guardians
	if (message.author.bot) return; //let's ignore bots.
	if (!message.content.startsWith(prefix)) return;
	const commandBody = message.content.slice(prefix.length);
	const args = commandBody.split(' ');
	const command = args.shift().toLowerCase();
	if (command === "ping") {
		const timeTaken = Date.now() - message.createdTimestamp;
		message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
	}
	if (command === "sum") {
		const numArgs = args.map(x => parseFloat(x));
		const sum = numArgs.reduce((counter, x) => counter += x);
		message.reply(`The sum of all the arguments you provided is ${sum}!`);
	}
	if (command === "inspiration"){
		message.reply(getQuote());
	}
});
client.login(config.BOT_TOKEN);
