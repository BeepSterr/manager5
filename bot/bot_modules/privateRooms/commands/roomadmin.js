module.exports = {

    trigger: "roomadmin",
    enabled: true,
    
    category: "Private Rooms",
    description: "Moderate other members rooms",
    permissionLevel: 1,
	example: "roomadmin",
    
    where: 0,
    
    commandInitialization: function(){

        //alias
        bot.addAlias(this, 'radmin');
        bot.addAlias(this, 'pradmin');
        bot.addAlias(this, 'pra');

        bot.removeDuplicates = function(e,r){for(var n={},o=0,t=e.length;t>o;o++)n[e[o][r]]||(n[e[o][r]]=e[o]);var u=[];for(var c in n)u.push(n[c]);return u}

    },

    triggerCommand: function (message, args, config){

        var channel = message.channel;
        var member = message.member;
        var guild   = message.guild;
        var g       = guild;

        var userRank = bot.getRank( guild, member, config )

        if(userRank >= 2){

            console.log(args);

            if(args[0] == undefined){

                channel.send('', {
                    "embed": {
                      "color": 16511898,
                      "author": {
                        "name": "Room Admin",
                        "icon_url": "https://managerbot.me/static/manager-web3$1.0.0/src/components/site-layout/logo.png"
                      },
                      "fields": [
                        {
                          "name": "Delete a room",
                          "value": "`" + config.prefix + "pra delete <@>`"
                        }
                      ]
                    }
                  })
    
            }else if(args[0] == 'delete'){


            //Remove the "room" and "invite" items in the arguments array.
            args.splice(0,1);
            var found   = bot.collectMembers(message.guild, args, true);
            if(found.length < 1){ channel.send(bot.L(config, 'rooms', 'inviteNone')); return; }

            bot.confirmAction( channel, message.member, "Delete rooms for **" + bot.formatMembers(found) + "**", config, ( code )=> {

                if(code != 0){ return; }
                
                found.forEach( mem => {

                    bot.modules['privateRooms'].revokeRoom( mem , message.guild, config );

                });
    
            })

            


            }

        }else{

            channel.send( bot.L(config, 'genericMessages', 'errorYouPermission') );
            return;

        }

        
    }


}