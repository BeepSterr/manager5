module.exports = {

    trigger: "room",
    enabled: true,
    
    category: "Private Rooms",
    description: "Base command for Private Rooms.",
    permissionLevel: 1,
	example: "room",
    
    where: 0,
    
    commandInitialization: function(){

        //alias
        bot.addAlias(this, 'rooms');
        bot.addAlias(this, 'privateroom');
        bot.addAlias(this, 'pr');

        bot.removeDuplicates = function(e,r){for(var n={},o=0,t=e.length;t>o;o++)n[e[o][r]]||(n[e[o][r]]=e[o]);var u=[];for(var c in n)u.push(n[c]);return u}

    },

    triggerCommand: function (message, args, config){

        var channel = message.channel;
        var guild   = message.guild;
        var g       = guild;

        if(args[0] == undefined){

            channel.send('', {
                "embed": {
                  "color": 16511898,
                  "author": {
                    "name": "Create personalized private voice/text channels!",
                    "icon_url": "https://managerbot.me/static/manager-web3$1.0.0/src/components/site-layout/logo.png"
                  },
                  "fields": [
                    {
                      "name": "Summoning your room",
                      "value": "Type `" + config.prefix + "room summon` to create your personal room."
                    },
                    {
                      "name": "Invite some people!",
                      "value": "Now that you have a room, Invite some friends with `" + config.prefix + "room invite @Friend`\nInstead of mentioning every single person you want to add, Try using [Special Mentions](https://managerbot.me/commands#filtermentions)"  
                    },
                    {
                      "name": "Make it your own!",
                      "value": "Using the `" + config.prefix + "room set` command you can customize some of your rooms settings! (Depending on server configuration)"
                    },
                    {
                      "name": "Explore!",
                      "value": "Use the `" + config.prefix + "commands` command to list ALL available room commands!"
                    },
                    {
                      "name": "Done?",
                      "value": "If your room is empty, It will automatically be removed after a while. If you want to manually remove it you can with `" + config.prefix + "room revoke`\n\nIf you liked using this feature, Please consider upvoting the bot over at [Discord Bot List](https://discordbots.org/bot/345612130122334209)",
                      "inline": false
                    }
                  ]
                }
              })

        }

        if(args[0] == "commands"){						
            
            channel.send('', {
                "embed": {
                "color": 16511898,
                "author": {
                    "name": "Private Rooms: Command List",
                    "icon_url": "https://managerbot.me/static/manager-web3$1.0.0/src/components/site-layout/logo.png"
                },
                "fields": [
                    {
                    "name": "room summon",
                    "value": "Create your private room."  
                    },
                    {
                    "name": "room revoke",
                    "value": "Remove your private room."  
                    },
                    {
                    "name": "room unlock",
                    "value": "Allow anyone on the server to join your room."  
                    },
                    {
                    "name": "room lock",
                    "value": "Only allow added members to join your room."  
                    },
                    {
                    "name": "room invite @",
                    "value": "Invites @ to your room."  
                    },
                    {
                    "name": "room kick @",
                    "value": "Removed @ from your room."  
                    },
                    {
                    "name": "room ban @",
                    "value": "Blocks @ from your room. This will also not allow them to enter if the room is unlocked."  
                    },
                    {
                    "name": "room set",
                    "value": "Customize your room."  
                    }
                ]
                }
            })
        }
        else if(args[0] == "summon"){
            bot.modules['privateRooms'].summonRoom( message.guild, message.member, message, config)
        }
        else if(args[0] == "lock"){

            if(!bot.roomPerm(config, 'allowLock')){ message.channel.send(bot.L(config, 'rooms', 'optionNotChangable')); return; }

            knex.select().from('private_rooms').where('Owner', message.author.id ).then(function(data){

                if(data[0] == undefined){ bot.reply(message, bot.L(config, 'rooms', 'noRoom')); return;}
                    
                    if(data[0].VoiceChannel != "none"){
                        message.guild.channels.get(data[0].VoiceChannel).updateOverwrite(guild.defaultRole, { 'CONNECT': false })
                    }
                    
                    if(data[0].TextChannel != "none"){
                        message.guild.channels.get(data[0].TextChannel).updateOverwrite(guild.defaultRole, { 'VIEW_CHANNEL': false, 'SEND_MESSAGES': false })
                    }
                        

                bot.reply(message, bot.L(config, 'rooms', 'optionLocked'));

            })
				
        }
        if(args[0] == "unlock"){

            if(!bot.roomPerm(config, 'allowLock')){ message.channel.send(bot.L(config, 'rooms', 'optionNotChangable')); return; }

            knex.select().from('private_rooms').where('Owner', message.author.id ).then(function(data){

                if(data[0] == undefined){ bot.reply(message, bot.L(config, 'rooms', 'noRoom')); return;}
                    
                    if(data[0].VoiceChannel != "none"){
                        message.guild.channels.get(data[0].VoiceChannel).updateOverwrite(guild.defaultRole, { 'CONNECT': null })
                    }
                    
                    if(data[0].TextChannel != "none"){
                        message.guild.channels.get(data[0].TextChannel).updateOverwrite(guild.defaultRole, { 'VIEW_CHANNEL': null, 'SEND_MESSAGES': null })
                    }
                        

                bot.reply(message, bot.L(config, 'rooms', 'optionUnlocked'));

            })
				
        }

        if(args[0] == "invite" || args[0] == "add"){

            //Remove the "room" and "invite" items in the arguments array.
            args.splice(0,1);
            var found   = bot.collectMembers(message.guild, args, true);

            if(found.length > 25){ channel.send(bot.L(config, 'rooms', 'inviteToomany', "25" )); return; }
            if(found.length < 1){ channel.send(bot.L(config, 'rooms', 'inviteNone')); return; }

            knex.select().from('private_rooms').where('Owner', message.author.id ).then(function(data){

                if(data[0] == undefined){ bot.reply(message, bot.L(config, 'rooms', 'noRoom')); return;}

                found.forEach( member =>{


                    //Deny any weird edits to entry allowance
                    if(member.id == data[0].Owner){ return; }
                    if(member.id == guild.me.id	){ return; }

                    if(data[0].VoiceChannel != "none"){
                        message.guild.channels.get(data[0].VoiceChannel).updateOverwrite(member, { 'VIEW_CHANNEL': true, 'CONNECT': true })
                    }
                    
                    if(data[0].TextChannel != "none"){
                        message.guild.channels.get(data[0].TextChannel).updateOverwrite(member, { 'VIEW_CHANNEL': true, 'SEND_MESSAGES': true })
                    }
                        
                });

                var arr = [];
                found.forEach( item => {
                    arr.push(item.displayName);
                });
            
                var response = arr.join(', ')
                bot.reply(message, bot.L(config, 'rooms', 'inviteSuccess', response));
                
                //Call event for logging
				bot.onEvent('roomUpdated', { guild: guild, owner: message.member, action: 'MemberAdd', context: found.join(' ') });

            })
				
        }
        if(args[0] == "kick"){

            //Remove the "room" and "invite" items in the arguments array.
            args.splice(0,1);
            var found   = bot.collectMembers(message.guild, args, true);

            if(found.length > 25){ channel.send(bot.L(config, 'rooms', 'kickToomany', "25" )); return; }
            if(found.length < 1){ channel.send(bot.L(config, 'rooms', 'kickNone')); return; }

            knex.select().from('private_rooms').where('Owner', message.author.id ).then(function(data){

                if(data[0] == undefined){ bot.reply(message, bot.L(config, 'rooms', 'noRoom')); return;}

                found.forEach( member =>{

                    //Deny any weird edits to entry allowance
                    if(member.id == data[0].Owner){ return; }
                    if(member.id == guild.me.id	){ return; }

                    bot.log(member.displayName);

                    if(data[0].VoiceChannel != "none"){
                        message.guild.channels.get(data[0].VoiceChannel).updateOverwrite(member, { 'VIEW_CHANNEL': null, 'CONNECT': null })
                    }
                    
                    if(data[0].TextChannel != "none"){
                        message.guild.channels.get(data[0].TextChannel).updateOverwrite(member, { 'VIEW_CHANNEL': null, 'SEND_MESSAGES': null })
                    }
                        
                });

                var arr = [];
                found.forEach( item => {
                    arr.push(item.displayName);

    
                    if(item.voiceChannelID == data[0].VoiceChannel){
                        item.setVoiceChannel(guild.afkChannel)
                    }

                });
            
                var response = arr.join(', ')
                bot.reply(message, bot.L(config, 'rooms', 'kickSuccess', response));     

                //Call event for logging
				bot.onEvent('roomUpdated', { guild: guild, owner: message.member, action: 'MemberKick', context: found.join(' ') });

            })
				
        }
        if(args[0] == "ban"){

            //Remove the "room" and "invite" items in the arguments array.
            args.splice(0,1);
            var found   = bot.collectMembers(message.guild, args, true);

            if(found.length > 25){ channel.send(bot.L(config, 'rooms', 'banToomany', "25" )); return; }
            if(found.length < 1){ channel.send(bot.L(config, 'rooms', 'banNone')); return; }

            knex.select().from('private_rooms').where('Owner', message.author.id ).then(function(data){

                if(data[0] == undefined){ bot.reply(message, bot.L(config, 'rooms', 'noRoom')); return;}

                found.forEach( member =>{


                    //Deny any weird edits to entry allowance
                    if(member.id == data[0].Owner){ return; }
                    if(member.id == guild.me.id	){ return; }
                    
                    if(data[0].VoiceChannel != "none"){
                        message.guild.channels.get(data[0].VoiceChannel).updateOverwrite(member, { 'VIEW_CHANNEL': false, 'CONNECT': false })
                    }
                    
                    if(data[0].TextChannel != "none"){
                        message.guild.channels.get(data[0].TextChannel).updateOverwrite(member, { 'VIEW_CHANNEL': false, 'SEND_MESSAGES': false })
                    }
                        
                });

                var arr = [];
                found.forEach( item => {
                    arr.push(item.displayName);
    
                    if(item.voiceChannelID == data[0].VoiceChannel){
                        item.setVoiceChannel(guild.afkChannel)
                    }

                });

                var response = arr.join(', ')
                bot.reply(message, bot.L(config, 'rooms', 'banSuccess', response));

                //Call event for logging
				bot.onEvent('roomUpdated', { guild: guild, owner: message.member, action: 'MemberBan', context: found.join(' ') });

            })
				
        }
        if(args[0] == "revoke"){

            /*
                NioNote: Haven't tested this yet because i didn't have access to a database :)
            */

            bot.modules['privateRooms'].revokeRoom( message.member, message.guild, config, message );
				
        }
        if(args[0] == "speaker"){

            if(args[1] == undefined){

            }else{
                
                args.splice(0,1);    
                var found   = bot.collectMembers(message.guild, args, true);
    
                if(found.length > 25){ channel.send(bot.L(config, 'rooms', 'inviteToomany', "25" )); return; }
                if(found.length < 1){ channel.send(bot.L(config, 'rooms', 'inviteNone')); return; }    
                var arr = [];
                found.forEach( item => {
                    arr.push(item.displayName);
                });
                

                knex.select().from('private_rooms').where('owner', message.author.id ).then(function(data){

                    //Make sure room is active
                    if(data[0] == undefined){ bot.reply(message, bot.L(config, 'rooms', 'noRoom')); return }

                    if(data[0].VoiceChannel != "none"){

                        var vc = client.channels.get(data[0].VoiceChannel);

                        if(!bot.roomPerm(config, 'speaker')){
                            message.channel.send(bot.L(config, 'rooms', 'optionNotChangable'));
                            return;
                        }
    

                        //add speaker
                        if(args[0] == "add"){
                            found.forEach( memb => {
                                vc.updateOverwrite(memb, { 'PRIORITY_SPEAKER': true} )
                            })

                            message.channel.send(bot.L(config, 'rooms', 'speakersAdd', '`' + arr.join(', ') + '`'));

                        }

                        //remove speaker
                        if(args[0] == "remove"){
                            found.forEach( memb => {
                                vc.updateOverwrite(memb, { 'PRIORITY_SPEAKER': null })
                            })

                            message.channel.send(bot.L(config, 'rooms', 'speakersRemove', '`' + arr.join(', ') + '`' ));
                        }

                    }



                });

            }

				
        }
        if(args[0] == "set"){

            knex.select().from('private_rooms').where('owner', message.author.id ).then(function(data){

                //Make sure room is active
                if(data[0] == undefined){ bot.reply(message, bot.L(config, 'rooms', 'noRoom')); return }

                //AAAAA

                if(args[1] == undefined){

                    var optionstring = "";
                    if(bot.roomPerm(config, 'name')){ optionstring+= "name <newname>\n" }
                    if(bot.roomPerm(config, 'memberlimit')){ optionstring+= "memberlimit <1-99>\n" }
                    if(bot.roomPerm(config, 'bitrate')){ optionstring+= "bitrate <8/12/24/36/48/64/96 >\n" }
                    if(bot.roomPerm(config, 'ptt')){ optionstring+= "ptt <on/off>\n" }
                    if(bot.roomPerm(config, 'embeds')){ optionstring+= "embeds <on/off>\n" }
                    if(bot.roomPerm(config, 'files')){ optionstring+= "files <on/off>\n" }
                    if(bot.roomPerm(config, 'nsfw')){ optionstring+= "nsfw <on/off>" }

                    channel.send('', {
                        "embed": {
                          "color": 16511898,
                          "author": {
                            "name": "Create personalized private voice/text channels!",
                            "icon_url": "https://managerbot.me/static/manager-web3$1.0.0/src/components/site-layout/logo.png"
                          },
                          "fields": [
                            {
                              "name": "Available Options",
                              "value": optionstring,
                              "inline": false
                            }
                          ]
                        }
                    })
                }

                if(args[1] == "name"){

                    if(!bot.roomPerm(config, 'name')){
                        message.channel.send(bot.L(config, 'rooms', 'optionNotChangable'));
                        return;
                    }

                    var response = false;

                    if(data[0].VoiceChannel != "none"){

                        message.guild.channels.get(data[0].VoiceChannel).setName( args.slice(2,99).join(' ').slice(0, 32) ).then( (channel) =>{
                            response = true;
                        }).catch( (error) => {
                            message.channel.send(bot.L(config, 'rooms', 'optionNameFailed', 'Voice'));
                        })

                    }
                    if(data[0].TextChannel != "none"){

                        message.guild.channels.get(data[0].TextChannel).setName( bot.dashify(args.slice(2,99).join('-')).slice(0, 32) ).then( (channel) =>{
                            response = true
                        }).catch( (error) => {
                            message.channel.send(bot.L(config, 'rooms', 'optionNameFailed', 'Text'));
                        })

                    }

                    setTimeout( ()=>{
                        if(response){
                            message.channel.send(bot.L(config, 'rooms', 'optionName'))

                            //Call event for logging
                            bot.onEvent('roomUpdated', { guild: guild, owner: message.member, action: 'OptionSet', context: 'name', value: args.slice(2,99).join(' ').slice(0, 32) });
                        }
                    },500)

                }else if(args[1] == "memberlimit"){

                    if(!bot.roomPerm(config, 'memberlimit')){
                        message.channel.send(bot.L(config, 'rooms', 'optionNotChangable'));
                        return;
                    }

                    if( Number(args[2]) < 0 || Number(args[2] > 99)){
                        message.channel.send(bot.L(config, 'rooms', 'optionInvalidValue', '0 - 99'));
                        return;
                    }

                    if(data[0].VoiceChannel != "none"){

                        message.guild.channels.get(data[0].VoiceChannel).setUserLimit( Number(args[2]) ).then( (channel) =>{

                            message.channel.send(bot.L(config, 'rooms', 'optionMemberlimit', args[2] ));

                            //Call event for logging
                            bot.onEvent('roomUpdated', { guild: guild, owner: message.member, action: 'OptionSet', context: 'memberlimit', value: Number(args[2]) });

                        }).catch( (error) => {
                            message.channel.send(bot.L( config, 'genericMessages', 'errorUnknown' ));
                        })

                    }else{
                        message.channel.send(bot.L(config, 'rooms', 'noVoiceChannel'));
                    }


                }else if(args[1] == "bitrate"){

                    if(!bot.roomPerm(config, 'bitrate')){
                        message.channel.send(bot.L(config, 'rooms', 'optionNotChangable'));
                        return;
                    }

                    var ValidRates = [ '8', '12', '24', '36', '48', '64', '96' ];

                    if(!ValidRates.includes(args[2])){
                        message.channel.send(bot.L(config, 'rooms', 'optionInvalidValue', '8 / 12 / 24 / 36 / 48 / 64 / 96'));
                        return;
                    }

                    if(data[0].VoiceChannel != "none"){

                        message.guild.channels.get(data[0].VoiceChannel).setBitrate( Number(args[2])*1000 ).then( (channel) =>{

                            message.channel.send(bot.L(config, 'rooms', 'optionBitrate', args[2] ));

                            //Call event for logging
                            bot.onEvent('roomUpdated', { guild: guild, owner: message.member, action: 'OptionSet', context: 'bitrate', value: Number(args[2])*1000 });

                        }).catch( (error) => {
                            message.channel.send(bot.L( config, 'genericMessages', 'errorUnknown' ));
                        })

                    }else{
                        message.channel.send(bot.L(config, 'rooms', 'noVoiceChannel'));
                    }
                    

                }else if(args[1] == "ptt"){

                    if(!bot.roomPerm(config, 'ptt')){
                        message.channel.send(bot.L(config, 'rooms', 'optionNotChangable'));
                        return;
                    }

                    if(args[2] == "yes") args[2] = true;					
					if(args[2] == "y") args[2] = true;					
					if(args[2] == "on") args[2] = true;					
					if(args[2] == "true") args[2] = true;	
					
					if(args[2] == "no") args[2] = false;
					if(args[2] == "n") args[2] = false;
                    if(args[2] == "off") args[2] = false;
                    if(args[2] == "false") args[2] = false;

                    bot.log(args[2])
                    
                    if(typeof args[2] != "boolean"){
                        message.channel.send(bot.L(config, 'rooms', 'optionInvalidValue', 'on/off'));
                        return;
                    }

                    if(data[0].VoiceChannel != "none"){

                        message.guild.channels.get(data[0].VoiceChannel).updateOverwrite(guild.defaultRole.id, { 'USE_VAD': !args[2] }, 'Update PTT Option').then( (channel) =>{

                            message.channel.send(bot.L(config, 'rooms', 'optionPTT', args[2] ));

                            //Call event for logging
                            bot.onEvent('roomUpdated', { guild: guild, owner: message.member, action: 'OptionSet', context: 'ptt', value: args[2] });

                        }).catch( (error) => {
                            message.channel.send(bot.L( config, 'genericMessages', 'errorUnknown' ));
                        })

                    }else{
                        message.channel.send(bot.L(config, 'rooms', 'noVoiceChannel'));
                    }
                    

                }else if(args[1] == "nsfw"){

                    if(!bot.roomPerm(config, 'nsfw')){
                        message.channel.send(bot.L(config, 'rooms', 'optionNotChangable'));
                        return;
                    }
					
                    if(args[2] == "yes") args[2] = true;					
					if(args[2] == "y") args[2] = true;					
					if(args[2] == "on") args[2] = true;					
					if(args[2] == "true") args[2] = true;	
					
					if(args[2] == "no") args[2] = false;
					if(args[2] == "n") args[2] = false;
                    if(args[2] == "off") args[2] = false;
                    if(args[2] == "false") args[2] = false;
                    
                    if(typeof args[2] != "boolean"){
                        message.channel.send(bot.L(config, 'rooms', 'optionInvalidValue', 'on/off'));
                        return;
                    }

                    if(data[0].TextChannel != "none"){

                        message.guild.channels.get(data[0].TextChannel).edit( { nsfw: args[2] } ).then( (channel) =>{

                            message.channel.send(bot.L(config, 'rooms', 'optionNSFW', args[2] ));

                            //Call event for logging
                            bot.onEvent('roomUpdated', { guild: guild, owner: message.member, action: 'OptionSet', context: 'nsfw', value: args[2] });

                        }).catch( (error) => {
                            message.channel.send(bot.L( config, 'genericMessages', 'errorUnknown' ));
                        })

                    }else{
                        message.channel.send(bot.L(config, 'rooms', 'noTextChannel'));
                    }
                    

                }else if(args[1] == "embeds"){

                    if(!bot.roomPerm(config, 'embeds')){
                        message.channel.send(bot.L(config, 'rooms', 'optionNotChangable'));
                        return;
                    }
                    
                    if(args[2] == "yes") args[2] = true;					
                    if(args[2] == "y") args[2] = true;					
                    if(args[2] == "on") args[2] = true;					
                    if(args[2] == "true") args[2] = true;	
                    
                    if(args[2] == "no") args[2] = false;
                    if(args[2] == "n") args[2] = false;
                    if(args[2] == "off") args[2] = false;
                    if(args[2] == "false") args[2] = false;
                    
                    if(typeof args[2] != "boolean"){
                        message.channel.send(bot.L(config, 'rooms', 'optionInvalidValue', 'on/off'));
                        return;
                    }

                    if(data[0].TextChannel != "none"){

                        message.guild.channels.get(data[0].TextChannel).updateOverwrite(guild.defaultRole.id, { 'EMBED_LINKS': args[2] }, 'Update Embeds Option').then( (channel) =>{

                            message.channel.send(bot.L(config, 'rooms', 'optionEmbed', args[2] ));

                            //Call event for logging
                            bot.onEvent('roomUpdated', { guild: guild, owner: message.member, action: 'OptionSet', context: 'embeds', value: args[2] });

                        }).catch( (error) => {
                            message.channel.send(bot.L( config, 'genericMessages', 'errorUnknown' ));
                        })

                    }else{
                        message.channel.send(bot.L(config, 'rooms', 'noTextChannel'));
                    }

                }else if(args[1] == "files"){

                    if(!bot.roomPerm(config, 'files')){
                        message.channel.send(bot.L(config, 'rooms', 'optionNotChangable'));
                        return;
                    }

                    bot.log(args[2])
                    
                    if(args[2] == "yes") args[2] = true;					
                    if(args[2] == "y") args[2] = true;					
                    if(args[2] == "on") args[2] = true;					
                    if(args[2] == "true") args[2] = true;	
                    
                    if(args[2] == "no") args[2] = false;
                    if(args[2] == "n") args[2] = false;
                    if(args[2] == "off") args[2] = false;
                    if(args[2] == "false") args[2] = false;

                    bot.log(args[2])
                    
                    if(typeof args[2] != "boolean"){
                        message.channel.send(bot.L(config, 'rooms', 'optionInvalidValue', 'on/off'));
                        return;
                    }

                    if(data[0].TextChannel != "none"){

                        message.guild.channels.get(data[0].TextChannel).updateOverwrite(guild.defaultRole.id, { 'ATTACH_FILES': args[2] }, 'Update Files Option').then( (channel) =>{

                            message.channel.send(bot.L(config, 'rooms', 'optionFiles', args[2] ));
                            
                            //Call event for logging
                            bot.onEvent('roomUpdated', { guild: guild, owner: message.member, action: 'OptionSet', context: 'files', value: args[2] });

                        }).catch( (error) => {
                            message.channel.send(bot.L( config, 'genericMessages', 'errorUnknown' ));
                        })

                    }else{
                        message.channel.send(bot.L(config, 'rooms', 'noTextChannel'));
                    }

                }

            });

        }
        
    }


}