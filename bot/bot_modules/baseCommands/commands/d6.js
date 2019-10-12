module.exports = {

    trigger: "dice",
    enabled: true,

    category: "Utility",
    description: "Roll any dice.",
    permissionLevel: 1,
	example: "dice <xd20 format>",

	where: 2,

    commandInitialization: function(){
		
		bot.addAlias(this, 'd');
		bot.addAlias(this, 'roll');
		
		bot.Roll = require('roll')

    },

    triggerCommand: function (message, args, config){
		
			roll = new bot.Roll();

			bot.log(args[0])

			var diceroll = roll.roll(args[0]);
			
			message.channel.send( '', {
				"embed": {
						"title": args[0],
						"description": "Rolls: **" + diceroll.rolled.join(' ') + "**",
						"author": {
							"name": message.author.tag,
							"icon_url": message.author.avatarURL( { size: 64 } )
						},
						"footer": {
							"text": diceroll.rolled.reduce((a, b) => a + b, 0) + " Total"
						},
					}
			})


    }


}