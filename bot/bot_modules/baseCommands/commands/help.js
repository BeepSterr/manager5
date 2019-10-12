module.exports = {

    trigger: "help",
	enabled: true,
	
    category: "Utility",
    description: "Get usefull information about manager and it's commands.",
    permissionLevel: 1,
	example: "help",
	
	where: 2,

    commandInitialization: function(){

			bot.addAlias(this, 'info');
			bot.addAlias(this, 'about');
			bot.addAlias(this, 'invite');
			bot.addAlias(this, 'config');
			bot.addAlias(this, 'commands');
			bot.addAlias(this, 'settings');

			os = require('os');

    },

    triggerCommand: function (message, args, config){

			var baseURL = "https://managerbot.me/"

        if(message.channel.type != 'text'){ 
			
			// We're in a DM. No specific server info :)
			message.channel.send('', {embed: {
						
				title: "Manager",
				description: `A Multipurpose bot aiming to help you make your server dynamic.
				A List of [Commands](` + cfg.manager.weburl + `/commands) is available, The default prefix is: \`m!\`

				Something not working out? Be sure to check out the [FAQ](` + cfg.manager.weburl + `/faq) and [Status Page](http://status.managerbot.me) before asking for help in our [Support Server](` + cfg.manager.weburl + `/support)`,				
				"color": 16776960,
				"footer": {
				  "icon_url": "https://cdn.discordapp.com/attachments/410174551687954452/411098954072195093/avatar.png",
				  "text": "Shard "+ (client.shard.id + 1) +" ( " + client.guilds.array().length + " Guilds) | Avg. Ping: "+Math.floor(client.ping)+"ms"
				},
				"fields": [
					{
						"name": "» Statistics",
						"value": `DM's are on shard `+(client.shard.id+1)+` out of ` + (client.shard.count) + ` with ` + Math.round(client.ping) + `ms latency.
						For more in-depth info type \``+config.prefix+`stats\``
					}
				]
			}});

        }else{

			// Can we use embeds?
            if(message.channel.permissionsFor(message.guild.member(client.user)).has('EMBED_LINKS')){
				
				message.channel.send('', {embed: {
						
					title: "Manager",
					description: `A Multipurpose bot aiming to help you make your server dynamic.
					A List of [Commands](` + cfg.manager.weburl + `/commands) is available, Be sure to use this server's prefix: \`` + config.prefix + `\`
	
					Something not working out? Be sure to check out the [FAQ](` + cfg.manager.weburl + `/faq) and [Status Page](http://status.managerbot.me) before asking for help in our [Support Server](` + cfg.manager.weburl + `/support)\n\nA Lot of managers settings can be configured on the [dashboard](` + cfg.manager.weburl + `/g/`+ message.guild.id +`).`,				
					"color": 16776960,
					"footer": {
					  "icon_url": "https://cdn.discordapp.com/attachments/410174551687954452/411098954072195093/avatar.png",
					  "text": "Shard "+ (client.shard.id + 1) +" ( " + client.guilds.array().length + " Guilds) | Avg. Ping: "+Math.floor(client.ping)+"ms"
					},
					"fields": [
						{
							"name": "» Statistics",
							"value": message.guild.name + ` is on shard `+(client.shard.id+1)+` out of ` + (client.shard.count) + ` with ` + Math.round(client.ping) + `ms latency.
							For more in-depth info type \``+config.prefix+`stats\``
						}
					]
				}});

			}else{

				message.channel.send(`**Manager Bot**
*Consider giving the bot link embedding permissions for more details.*
				
	Commands: https://managerbot.me/commands
	FAQ: https://managerbot.me/faq
	Support Server: https://managerbot.me/support

	Invite Manager: https://managerbot.me/invite`)

			}
        }

    }


}