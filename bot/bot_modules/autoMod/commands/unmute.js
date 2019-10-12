module.exports = {

    trigger: "unmute",
    enabled: true,

    category: "Moderation",
    description: "Mute A Member",
    permissionLevel: 2,
	example: "unmute <member>",
	
	where: 0,


    commandInitialization: function(){

	},
    
    triggerCommand: function (message, args, config){

        try{

            var channel = message.channel;
            var guild   = message.guild;

            var found   = bot.collectMembers(message.guild, bot.getArgs(message));
            
            if(found.length > 1){ channel.send(bot.L(config, 'genericMessages', 'errorTooManyMatched', "1" )); return; }
            if(found.length < 1){ channel.send(bot.L(config, 'genericMessages', 'errorTooLittleMatched', "1" )); return; }

            var member = found[0];
            if(member.user.bot == true){ channel.send('This is a bot.'); return; }

            //Get ranks
            if( bot.getRank(guild, message.member, config) >= 2){

                //we have perms
                if( bot.getRank(guild, member, config) >= bot.getRank(guild, message.member, config) ){

                    // We cannot target this person because they're above us.
                    channel.send('You cannot target this person.');
                    return;

                }

                // Alright. We can mute now.
                bot.getMuteRole( guild, config, ( role )=> {

					// we have muted role.
					member.roles.remove( role );
                    channel.send('Unmuted ' + member.displayName);

                })

            }


        }catch(ex){

			channel.send('Something went wrong. `' + ex + '`'); 
			bot.logError(ex.stack);
            return;

        }

    }


}