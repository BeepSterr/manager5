module.exports = {

    trigger: "member",
    enabled: true,

    category: "Utility",
    description: "Get information about a member.",
    permissionLevel: 1,
	example: "whois [Member]",
	
	where: 0,

    commandInitialization: function(){

		moment = require('moment');
		
		bot.addAlias(this, 'whois')
		
    },

    triggerCommand: function (message, args, config){

        var channel = message.channel;
		var guild = message.guild;
		var found   = bot.collectMembers(message.guild, args);
 

        if(found.length > 1){ channel.send(bot.L(config, 'genericMessages', 'errorTooManyMatched', "1" )); return; }
		if(found.length < 1){ found = [message.member] }
        if(!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) { message.channel.send( bot.L(config, 'genericMessages', 'errorBotPermissionS', 'Embed Links') ); return; }

        var member = found[0];
		
		//Set image for image commands.
		bot.cache.lastImage[message.member.id] = member.user.displayAvatarURL({ format: 'png', size: 2048 });
		
		knex.select('*').from('guild_events').where( { 'target': member.id, 'guild': member.guild.id, 'eventType': "NICKNAME" } ).orderBy('timestamp', 'desc').limit(10).then( (names) =>{
			
			//nicknames
			nicknames = [];
			console.log(names)
			names.forEach( name => {
				
				nicknames.push( name.context )
				
            })
			
			nicknames.shift()
			
			if(names.length < 2){ nicknames.push( 'No previous nicknames stored.' ); }

			var accountDate = moment.utc(member.user.createdAt).fromNow();
			var joinDate = moment.utc(member.joinedAt).fromNow();

			//acount dates
			if(message.content.includes('--nofuzzy')){ 
				accountDate = moment.utc(member.user.createdAt).format('MMMM Do YYYY, h:mm a')
				joinDate = moment.utc(member.joinedAt).format('MMMM Do YYYY, h:mm a')
			}

			channel.send('', {
				"embed": {
					"color": 16312092,
					"thumbnail": {
						"url": member.user.displayAvatarURL({ size: 512 })
					},
					"fields": [
						{
							"name": bot.L(config, 'genericTerms', 'username'),
							"value": member.user.tag,
							"inline": true
						},
						{
							"name": "Server Rank",
							"value": bot.ranks[bot.getRank(message.guild, member, config)],
							"inline": true
						},
						{
							"name": "Avatar",
							"value": "[Open in browser]("+member.user.displayAvatarURL({ size: 2048 })+")",
							"inline": false
						},
						{
							"name": bot.L(config, 'genericTerms', 'accountCreated'),
							"value": accountDate,
							"inline": true
						},
						{
							"name": bot.L(config, 'genericTerms', 'joinedServerDate'),
							"value": joinDate,
							"inline": true
						},
						{
							"name": bot.L(config, 'genericTerms', 'roles') + " (" + member.roles.array().length + ")",
							"value": member.roles.array().join(' '),
							"inline": false
						},
						{
							"name": bot.L(config, 'genericTerms', 'nicknameHistory') + " (" + nicknames.length + ")",
							"value": nicknames.join('\n'),
							"inline": false
						}
					]
				}
			})
			
		})
    }


}