module.exports = {

    trigger: "notify",
    enabled: true,
    
    category: "Settings",
    description: "Quickly mute/unmute your notifications",
    permissionLevel: 1,
    example: "notify [mute/unmute]",
    
    where: 2,
    

    commandInitialization: function(){

        //alias
        bot.addAlias(this, 'notifications');

    },

    triggerCommand: function (message, args, config){

        bot.getUserProfile(message.author, (s, userProfile)=>{

            if(args[0] == undefined){

                var enbledNotifs = "<:enabled:424537047215374356> Default Notification Channel \n"
                userProfile.notifySettings.forEach( setting => {
                    enbledNotifs += '<:enabled:424537047215374356> ' + bot.notificationNames[setting] + '\n'
                })

                enbledNotifs += '\n [Subscribe / Unsubscribe from notifications.]('+cfg.manager.weburl+'/user/'+message.author.id+')\n'


                message.channel.send('', {
                    "embed": {
                        "color": 16511898,
                        "title": "Notifications",
                        "description": "We'll notify you for stuff you subscribe to, Below you can see your subscribed notifications and how to mute/disable them.",
                        "fields": [
                            {
                            "name": "Subscribed Notifications",
                            "value": enbledNotifs
                            },
                            {
                            "name": "Temporarily Mute Notifications",
                            "value": "Type `" + config.prefix + "notify mute` to mute all notifications for a while."
                            }
                        ]
                    }
                })

            }
            else if(args[0] == 'mute'){

                if(bot.mutedProfiles.includes(message.author.id)){
                    message.channel.send( bot.L(config, 'notifications', 'alreadyMuted', config.prefix + 'notify unmute') );
                    return;
                }

                bot.mutedProfiles.push( message.author.id )
                message.channel.send( bot.L(config, 'notifications', 'mutedNotifs') );
                return;

            }
            else if(args[0] == 'unmute'){

                var index = bot.mutedProfiles.indexOf(message.author.id )
                if (index > -1) {
                    bot.mutedProfiles.splice(index, 1);
                }
                
                message.channel.send( bot.L(config, 'notifications', 'unmutedNotifs') );
                return;

            }

        })
        
    }


}