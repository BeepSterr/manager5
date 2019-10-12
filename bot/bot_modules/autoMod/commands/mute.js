module.exports = {

	trigger: "mute",
    enabled: true,

    category: "Moderation",
    description: "Mute A Member indefinetly, Or for X amount of time.",
    permissionLevel: 2,
	example: "mute < member > [ 10s / 10m / 10h / 10d ]",

	where: 0,


    commandInitialization: function(){

        bot.getMuteRole = function( guild, config, cb ){

			bot.log('GetMutedRole')
			
			if( guild.roles.find( (role)=>{ return role.name == 'Muted'}) ){
				
				var role = guild.roles.find( (role)=>{ return role.name == 'Muted'})
				
				// Someone just got muted, and the role exists. But since the last mute new channels may have been made
				// So, just to be sure we'll reapply the overwrites to every channel.
				
				guild.channels.array().forEach( channel => {

					if(channel.permissionsLocked == true){
						// Don't edit this channel as its synced to some category
						// We'll apply it on the category instead.
					}else{
								
						// We got a channel we should be allowed to add muted to, so lets do it!
						channel.updateOverwrite(role, { 'SEND_MESSAGES': false, 'SPEAK': false }, 'Adding new channel to muted role.')
	
					}
							
				})
				
				//Return the role.
				
				cb(role);
				
			}else{
				
				guild.roles.create({
				  data: {
					name: 'Muted',
					color: 'DARKER_GREY',
				  },
				  reason: 'Created Muted Role',
				}).then( role => {

					role.setPermissions([]).then( updatedRole => {

						guild.channels.array().forEach( channel => {
							
							if(channel.permissionsLocked == true){
								// Don't edit this channel as its synced to some category
								// We'll apply it on the category instead.
							}else{
								
								// We got a channel we should be allowed to add muted to, so lets do it!
								channel.updateOverwrite(updatedRole, { 'SEND_MESSAGES': false, 'SPEAK': false, 'ADD_REACTIONS': false, 'CONNECT': false, 'CREATE_INSTANT_INVITE': false }, 'Disallowing muted to access channel.')
								
							}
							
						})	

						cb(updatedRole);				
						
					})
					
				})
			}
			
		}

	},
    
    triggerCommand: function (message, args, config){

        try{

            var channel = message.channel;
			var guild   = message.guild;

            var found   = bot.collectMembers(message.guild, bot.getArgs(message));
            
			if(found.length < 1){ channel.send(bot.L(config, 'genericMessages', 'errorTooLittleMatched', "1" )); return; }

			var muteMember = function( member, callback ){

				if(member.user.bot == true){ callback(false, member, 'bot'); return; }

				//Get ranks
				if( bot.getRank(guild, message.member, config) >= 2){

					//we have perms
					if( bot.getRank(guild, member, config) >= bot.getRank(guild, message.member, config) ){

						// We cannot target this person because they're above us.
						callback(false, member, 'Cannot Target');
						return;

					}

					// Alright. We can mute now.
					bot.getMuteRole( guild, config, ( role )=> {

						// we have muted role.
						member.roles.add( role );

						//Check for timed event
						bot.getTime(args[ args.length - 1 ], (success, time) => {

							if(success == true){

								var scheduleID = snowflake.nextId();
								var target = member.id;
								var action = 'removerole';
								var context = 'Muted';

								knex('guild_planned_events').insert({
									scheduleID: scheduleID,
									guild: guild.id,
									target: target,
									action: action,
									context: context,
									at: time.toISOString()
								}).then( ()=>{

									bot.log('Schedule inserted.');
									callback(true, member, time.fromNow(true) )

								})

							}else{
								callback(true, member, null )
							}

						})


					})

				}
			}

			if( bot.getRank(message.guild, message.member, config) < 2){ channel.send(bot.L(config, 'genericMessages', 'errorYouPermission' )); return; }

			if(found.length >= 2){
						
				bot.confirmAction( channel, message.member, "You are about to mute **" + bot.formatMembers(found) + "**", config, ( code, dialog )=> {

					if(code != 0){ return; }

					var y = 0;
					var x = 0;
					var t = found.length

					//Mute em ALL.
					found.forEach( member => {
						
						muteMember(member, (b, member, data)=> {

							if(b == true){ y++ }
							if(b == false){ x++ }

							if( y+x == t){
								dialog.setMessage('Completed!\n' + y + " Members muted.\n" + x + " Members unable to mute.")
							}

						})

					})

				})

			}else{

				//Only a single member was targeted, Mute em.
				muteMember(found[0], (b, member, data)=> {

					if( b == true && data == null ){ channel.send('Muted ' + member.displayName + ' `Indefinetly`'); }
					if( b == true && data != null ){ channel.send('Muted ' + member.displayName + ' `'+data+'`'); }

					if( b == false && data != "Cannot Target" ){ channel.send('You cannot target this person.'); }

				})

			}


        }catch(ex){

			message.channel.send('Something went wrong. `' + ex + '`'); 
			bot.logError(ex.stack);
            return;

        }

    }


}