// Main Constants

const prefix = '.';
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

const DiscordBoats = require("dboats-api");
const boats = new DiscordBoats({token: (config.api)});

const dbs = client.guilds.get('421630709585805312');
const gingey = client.guilds.get('425517015869030400');
const spotix = client.guilds.get('495102977930035230');

// Main Events

client.on('error', console.error);

process.on('unhandledRejection', console.error);

setInterval(() => {
	client.user.setActivity(`${client.users.size} users on ${client.guilds.size} servers`, { type: 'watching' });
	boats.postGuilds(client.guilds.size);
	console.log(`Updated with ${client.users.size} users on ${client.guilds.size} different servers`)
}, 300000);

client.on('ready', () => {
	client.user.setActivity(`${client.users.size} users on ${client.guilds.size} servers`, { type: 'watching' });
	boats.postGuilds(client.guilds.size);
	console.log([
		'',
		`Woody | updated with ${client.users.size} users on ${client.guilds.size} different servers `,
		'',
	].join('\n'));
});

client.on('disconnect', () => {
	console.log([
		'',
		`Woody | logged off :( `,
		'',
	].join('\n'));
});

client.on('guildCreate', guild => {
	console.log(`Woody | ${guild.name} with (${guild.memberCount} users) has added woody to their server.`);
	client.user.setActivity(`${client.users.size} users on ${client.guilds.size} servers`, { type: 'watching' });
});

client.on('guildDelete', guild => {
	console.log(`Woody | Removed from ${guild.name} with (${guild.memberCount} users)`);
	client.user.setActivity(`${client.users.size} users on ${client.guilds.size} servers`, { type: 'watching' });
});

// Message

let discordLinks = [
	'discord.me',
	'discord.io',
	'discord.gg',
	'discordbots.org',
	'discordservers.com',
	'disboard.org',
	'discordlist.me',
	'discordsl.me',
	'discordhub.com',
	'discordapp.com',
	'bigbeans.solutions',
	'watchanimeattheoffice.com',
	'discord.chat',
	'disco.gg'
];

client.on('message', message => {
	if (message.author.bot) return
		if(!message.guild === null);
			let member = message.member;
			let guild = message.guild;
			for (var i in discordLinks) {
			if(message.content.includes(discordLinks[i])) {
				if (!message.member.hasPermission('KICK_MEMBERS')) {
					if (message.guild.me.hasPermission('MANAGE_MESSAGES')) {
						message.delete();
						message.reply(`Advertising Discord servers is prohibited.`);
						break;
					}
				}
			}
		}
		if (message.mentions.users.firstKey() == client.user.id) {
			message.channel.send('**Woody Commands:**\n`.help`\n`~~.info~~`\n`.pong`\n`~~.config~~`\n`.search`\n`~~.purge~~`\n`~~.mute~~`\n`~~.unmute~~`\n`~~.ban~~`\n`~~.unban~~`')
			.then(msg => {
				if (message.guild.me.hasPermission('MANAGE_MESSAGES')) message.delete(16000);
				msg.delete(16000)
			})
		}		
			let args = message.content.split(' ');
			let command = args.shift();
			switch(command) {
				case prefix + 'help':
					message.channel.send('**Woody Commands:**\n`.help`\n`~~.info~~`\n`.pong`\n`~~.config~~`\n`.search`\n`~~.purge~~`\n`~~.mute~~`\n`~~.unmute~~`\n`~~.ban~~`\n`~~.unban~~`')
					.then(msg => {
						if (message.guild.me.hasPermission('MANAGE_MESSAGES')) message.delete(16000);
						msg.delete(16000)
					})
					break;		
				//
				case prefix + 'config':
					if (!member.hasPermission('ADMINISTRATOR')) {
						message.channel.send('You are missing the permission \'`ADMINISTRATOR`\'')
						.then(msg => {
							if (message.guild.me.hasPermission('MANAGE_MESSAGES')) message.delete(16000);
							msg.delete(16000)
						})
						}
					if (member.hasPermission('ADMINISTRATOR')) {
						message.channel.send('Configuration Values:\n`.logs` sets the logs channel\n`.mod` sets the moderator role\n`~~.prefix~~` sets the prefix')
					}
					break;
				case prefix + 'logs':
					if (!member.hasPermission('ADMINISTRATOR')) {
						message.channel.send('You are missing the permission \'`ADMINISTRATOR`\'')
						.then(msg => {
							if (message.guild.me.hasPermission('MANAGE_MESSAGES')) message.delete(16000);
							msg.delete(16000)
						})
						}
					if (member.hasPermission('ADMINISTRATOR')) {
						message.channel.send(`Set \`#${message.channel.name}(${message.channel})\` to the new logging channel. < COMING SOON`)
						break;
					}
				case prefix + 'mod':
					if (!member.hasPermission('ADMINISTRATOR')) {
						message.channel.send('You are missing the permission \'`ADMINISTRATOR`\'')
						.then(msg => {
							if (message.guild.me.hasPermission('MANAGE_MESSAGES')) message.delete(16000);
							msg.delete(16000)
						})
						}
					if (member.hasPermission('ADMINISTRATOR')) {
						let newRole = message.mentions.roles.first() || message.guild.roles.find(role => role.name === args[0]);
						if (!newRole) return message.channel.send('Usage: `.mod [new mod role]`')
						if (newRole) {
							message.channel.send(`Set \`${newRole.name}(${newRole})\` to the new moderator role. < COMING SOON`)
						}
					}
					break;

				//
				case prefix + 'pong':
					message.channel.send(`:ping_pong: My current ping: \`${Math.round(client.ping)}ms\``)
					.then(msg => {
						if (message.guild.me.hasPermission('MANAGE_MESSAGES')) message.delete(16000);
						msg.delete(16000)
					})
					break;
				case prefix + 'search':
					let search = message.mentions.members.first() || message.guild.member(args[0]);
					if (search) {
						member = search.user.tag
						createdAt = search.user.createdAt
						highestRole = search.highestRole.name
						message.channel.send(`\`${member}\` created on \`${createdAt}\` whose highest role is \`${highestRole}\``)
					}
					if (!search) message.channel.send('Usage: `.search [member]`')
					break;
			}
});

// Eval

function clean(text) {
	if (typeof(text) === "string")
		return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
	else
		return text;
}

client.on('message', async message => {
	if (message.author.bot) return
	let args = message.content.split(" ").slice(1);
	if (message.content.startsWith(prefix + "eval")) {
		if(message.author.id !== config.id) return message.channel.send('You aren\'t cool enough to do that :wink:');
		//
		let msg = message;
		let guild = message.guild;
		let member = message.member;
		let user = message.member.user;
		let channel = message.channel;
		let roles = message.guild.roles.map(r => r.name).join("\n");

		//
			try {
				let code = args.join(" ");
				if (!code) return message.channel.send('Usage: `.eval [eval]`')
				if (code);
				let evaled = await eval(code);
				if (typeof evaled !== "string")
					evaled = require("util").inspect(evaled);
				message.channel.send(clean(evaled), {code:"xl"});
			} catch (err) {
				message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
			}
		}
});

// Logs

client.on('messageDelete', message => {
	if (message.author.bot) return
	let member = message.author.tag;
	let channel = message.channel;
	let logs = message.guild.channels.find(ch => ch.name === 'logs');
	if (!logs) logs = message.guild.channels.find(ch => ch.name === 'ultimate-testing');
	if (!logs) logs = message.guild.channels.find(ch => ch.name === 'bot-hell');
	if (logs) {
		let embed = new Discord.RichEmbed()
		.setAuthor(member, message.author.avatarURL)
		.setColor('#FF0000')
		.setDescription(`message deleted in ${channel}`)
		.setTimestamp()
		.addField('**Content:**', `${message}`, true)
		.addBlankField(true)
		logs.send({embed});
	}
});

client.on(`messageUpdate`, async (oldMessage, newMessage) => {
	let message = oldMessage;
	if (message.author.bot) return
	if (oldMessage.content === newMessage.content) return; {
	let member = message.author.tag;
	let channel = message.channel;
	let logs = message.guild.channels.find(ch => ch.name === 'logs');
	if (!logs) logs = message.guild.channels.find(ch => ch.name === 'ultimate-testing');
	if (!logs) logs = message.guild.channels.find(ch => ch.name === 'bot-hell');
	if (logs) {
		let embed = new Discord.RichEmbed()
		.setAuthor(member, message.author.avatarURL)
		.setColor('#FF0000')
		.setDescription(`message edited in ${channel}`)
		.setTimestamp()
		.addField('**New:**', `${newMessage.content}`, true)
		.addBlankField(true)
		.addField('**Old:**', `${oldMessage.content}`, true)
		logs.send({embed});
	}
}
});

// Login

client.login(config.token);
