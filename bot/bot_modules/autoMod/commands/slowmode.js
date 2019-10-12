module.exports = {

    trigger: "slowmode",
    enabled: true,

    category: "Settings",
    description: "Set discord SlowMode setting on a whim",
    permissionLevel: 2,
	example: "slowmode < on / off / Amount of seconds >",

	where: 0,

    commandInitialization: function(){
		
		bot.addAlias(this, 'slow');

    },

    triggerCommand: function (message, args, config){

        if( bot.getRank(message.guild, message.member, config) >= 2){

            // Timer
            bot.log(args[0]);
            
            var slowTime = null;
            slowTime = Number(args[0]);

            if(args[0] == "on"){ slowTime = 5; }
            if(args[0] == "off"){ slowTime = 0; }

            if(slowTime > 120){
                message.channel.send( bot.L(config, 'moderationCommands', 'slowModeMax' ) )
                return;
            }

            if(slowTime < 0){
                slowTime = 0;
            }

            message.channel.setRateLimitPerUser(slowTime)

            if(slowTime > 0){
                message.channel.send( bot.L(config, 'moderationCommands', 'slowModeOn', slowTime ) )
            }else{
                message.channel.send( bot.L(config, 'moderationCommands', 'slowModeOff' ) )
            }

        }



    }


}