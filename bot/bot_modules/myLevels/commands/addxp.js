module.exports = {

    trigger: "grantxp",
    enabled: true,

    category: "Levels",
    description: "Grant XP to a member.",
    permissionLevel: 3,
	example: "grantxp <member> <amount>",
    
    where: 0,
    

    commandInitialization: function(){
        
        bot.addAlias(this, 'givexp');
    },

    triggerCommand: function (message, args, config){

        //Rank check
        if( bot.getRank( message.guild, message.member, config ) < 3){
            message.channel.send(bot.L(config, 'genericMessages', 'errorYouPermission' ));
            return;
        }

        try{
            var channel = message.channel;
            var guild   = message.guild;
			
			var args = bot.getArgs(message)
			var amount = args.pop();

            var found   = bot.collectMembers(message.guild, args);
            
            if(found.length > 1){ channel.send(bot.L(config, 'genericMessages', 'errorTooManyMatched', "1" )); return; }
            if(found.length < 1){ found = [message.member] }
            if(!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) { message.channel.send( bot.L(config, 'genericMessages', 'errorBotPermissionS', 'Embed Links') ); return; }

            var member = found[0];
            var xp = Number(amount);

            if(xp === NaN){
                channel.send(bot.L(config, 'genericMessages', 'errorUnknown'))
                return;
            }

            if(member.user.bot == true){ channel.send('BOT Users cannot gain XP.'); return; }

            //we can fetch a profile
            bot.getMemberData( member, guild, (success, profile) => {

                if(profile != undefined){

                    var xpRequired  = bot.getXpForLevel( profile.level );
                    bot.grantXP( member, guild, xp, true );

                    channel.send('Gave ' + member.displayName + ' ' + xp + "XP")
                }
            });

        }catch(ex){

            channel.send(bot.L(config, 'genericMessages', 'errorUnknown'))

        }

    }


}