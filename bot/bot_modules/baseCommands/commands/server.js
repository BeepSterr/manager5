module.exports = {

    trigger: "server",
    enabled: true,

    category: "Utility",
    description: "Get information about the server.",
    permissionLevel: 1,
    example: "server",
    
    where: 0,


    commandInitialization: function(){
        //
    },

    triggerCommand: function (message, args, config){

        var channel = message.channel;
        var guild   = message.guild;
        var g       = guild;

		
		//Set image for image commands.
		bot.cache.lastImage[message.member.id] = guild.iconURL({ format: 'png', size: 2048 });

        //if(!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) { message.channel.send( bot.L(config, 'genericMessages', 'errorBotPermissionS', 'Embed Links') ); return; }
        
		var onlineMembers = g.members.filter( val => val.user.presence.status != 'offline' );
        var onlineStaff = onlineMembers.filter( val => bot.getRank( g, val, config ) >= 2 ).array();

        var memberString = g.members.array().length + " Members \n" + g.members.array().join(' ');
        if(memberString.length >= 1024){ memberString = g.members.array() + " Members"; }

        message.channel.send('', {
            "embed": {
                "color": 16312092,
                "footer": {
                    "icon": g.iconURL({ format: 'png', size: 512 }),
                    "text": "Server ID: " + g.id
                },
                "thumbnail": {
                    "url": g.iconURL({ format: 'png', size: 512 }),
                },
                "fields": [
                    {
                        "name": bot.L(config, 'genericTerms', 'serverName'),
                        "value": g.name,
                        "inline": false
                    },
                    {
                        "name": bot.L(config, 'genericTerms', 'serverCreated'),
                        "value": moment.utc(g.createdAt).format('MMMM Do YYYY, h:mm a'),
                        "inline": false
                    },
					{
						"name": bot.L(config, 'genericTerms', 'serverIcon'),
						"value": "[Open in browser]("+g.iconURL({ format: 'png', size: 512 })+")",
						"inline": false
                    },
                    {
                        "name": bot.L(config, 'genericTerms', 'serverRegion'),
                        "value": g.region,
                        "inline": false
                    },
                    {
                        "name": bot.L(config, 'genericTerms', 'serverOwner'),
                        "value": g.owner.toString(),
                        "inline": false
                    },
                    {
                        "name": bot.L(config, 'genericTerms', 'onlineStaff'),
                        "value": onlineStaff.join(' ').substring(0, 1020),
                        "inline": false
                    }
                ]
            }
        }).catch(ex => {
            message.channel.send(bot.L(config, 'genericMessages', 'errorUnknown'))
            bot.logError(ex)
        })

    }


}