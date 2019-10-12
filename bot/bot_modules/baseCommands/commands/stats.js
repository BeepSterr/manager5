module.exports = {

    trigger: "stats",
	enabled: true,
	
    category: "Utility",
    description: "Manager Statistics",
    permissionLevel: 1,
	example: "stats",
	
	where: 0,

    commandInitialization: function(){

			bot.addAlias(this, 'status');
			os = require('os');

    },

    triggerCommand: function (message, args, config){

        var tempTime    = moment.duration(client.uptime)
        var upti        = Math.floor(tempTime.asHours()) + moment.utc(tempTime.asMilliseconds()).format(":mm:ss")

        var memusage = ((os.freemem() / os.totalmem()) * 100);
        console.log(memusage)

        if(message.channel.type != 'text'){ 
			

        }else{

			// Can we use embeds?
            if(message.channel.permissionsFor(message.guild.member(client.user)).has('EMBED_LINKS')){

                client.shard.fetchClientValues('guilds.size')
                .then(results => {
                    var guildsTotal = results.reduce((prev, val) => prev + val, 0);
				
                    message.channel.send('', {embed: {
                        "color": 16776960,
                        "fields": [
                            {
                                "name": "» Ping",
                                "value": Math.round(client.ping) + "ms Average",
                                "inline": true
                            },
                            {
                                "name": "» Guilds",
                                "value": "`" + guildsTotal + "` Total Servers\n `" + client.guilds.array().length + "` On this shard",
                                "inline": true
                            },
                            {
                                "name": "» Shards",
                                "value": "`" + client.shard.count + "` Total Shards\n `" + (client.shard.id + 1) + "` ShardID Current",
                                "inline": true
                            },
                            {
                                "name": "» Voice Sessions",
                                "value": "None",
                                "inline": true
                            },
                            {
                                "name": "» Objects",
                                "value": '' + 
                                "`" + client.channels.array().length + "` Channels\n" +
                                "`" + client.emojis.array().length + "` Emojis\n" +
                                "`" + client.users.array().length + "` Users",
                                "inline": true
                            },
                            {
                                "name": "» uptime",
                                "value": '' + 
                                "`" + bot.formattime( Math.round(client.uptime / 1000) ) + "`",
                                "inline": true
                            },
                            {
                                "name": "» Usage",
                                "value": ''+
                                "`RAM` " + bot.progressBar(memusage) + "  `[" + Math.round(memusage) + "%]`",
                                "inline": false
                            },
                            {
                                "name": "» Permissions (Current Channel)",
                                "value": '```json\n' + JSON.stringify(message.channel.permissionsFor(message.guild.me).serialize(), null, 2) + '```',
                                "inline": false
                            }
                        ]
                    }});

                })

			}else{
                message.channel.send('Missing embed permissions.')
            }

        }

    }


}