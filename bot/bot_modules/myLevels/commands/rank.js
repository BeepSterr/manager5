module.exports = {

    trigger: "level",
    enabled: true,

    category: "Levels",
    description: "View someones level",
    permissionLevel: 1,
	example: "rank [member]",

    where: 0,
    
    commandInitialization: function(){
        //
        bot.addAlias(this, 'rank');
    },

    triggerCommand: function (message, args, config){

        try{
            var channel = message.channel;
            var guild   = message.guild;

            var found   = bot.collectMembers(message.guild, bot.getArgs(message));
            
            if(found.length > 1){ channel.send(bot.L(config, 'genericMessages', 'errorTooManyMatched', "1" )); return; }
            if(found.length < 1){ found = [message.member] }
            if(!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) { message.channel.send( bot.L(config, 'genericMessages', 'errorBotPermissionS', 'Embed Links') ); return; }

            var member = found[0];

            if(member.user.bot == true){ channel.send('BOT Users cannot gain XP.'); return; }

            //we can fetch a profile
            bot.getMemberData( member, guild, (success, profile) => {

                if(profile != undefined){

                    var xpRequired  = bot.getXpForLevel( profile.level );
                    var percent     = Math.round( (profile.xpCurrent / xpRequired)*100 )

                    //We have a valid profile!
                    channel.send('', {
                        "embed": {
                        "footer": {
                            "text": profile.xpCurrent + " / " + xpRequired + " XP"
                        },
                        "author": {
                            "name": member.displayName,
                            "icon_url": member.user.avatarURL()
                        },
                        "fields": [
                            {
                            "name": "Level " + profile.level,
                            "value": bot.progressBar(percent) + " "+percent+"%\n"
                            }
                        ]
                        }
                    })
                    
                }else{
                    channel.send('User has not earned XP yet.');
                }

            });

        }catch(ex){

            channel.send(bot.L(config, 'genericMessages', 'errorUnknown'))

        }

    }


}