module.exports = {

	doIt: function(event, data, bot, client){

		//this is where registered events will be received
		if(event == 'message' || event == 'messageUpdate'){

			if(event == "messageUpdate"){
				data = data.neww;
			}

			if(data.webhookID != null){ return; } // Ignore webhooks
			if(data.author.bot == true){ return; }// Ignore bots.

			bot.getConfig(data.guild, '', (done, g, c, pass)=>{

				var config = c.config;
				var autoMod = config.autoMod;
				var amod = autoMod.filters

				if(amod == undefined){ return; }

				if(!done) return;
				if(config.disabled == 1){ return; }

				var message = data;
				var rank	= bot.getRank( data.guild, data.member, config );

				var guild 	= data.guild;
				var member 	= data.member;

				if(member.user.bot == true){ return; }

				//Message does not belong to a moderator or up so we can mess with it!
				if(rank < 2){

					// Invite Detection.
					if(amod.invites.enabled == true){

						if(amod.invites.excluded_channels.includes(message.channel.id)){ return; }

						var content 	= message.cleanContent.replace('discord.gg', 'https://discord.gg')
						content 		= content.replace('https://https://', 'https://')

						var links = Array.from(geturls(content));

						links.forEach( link => {

							if(!link.startsWith('https://')){ link = "https://" + link}

							client.fetchInvite(link).then( invite => {

								if(invite.guild.id != guild.id){
									message.delete();
									message.channel.send('You cannot send invites here, <@' + member + '>');
									bot.onEvent('autoMod', { guild: guild, member: member, type: 'Discord Invite', context: 'message'  } );
									return;
								}

							})
							
						})

						if(links == []){

							if(content.includes('discord.gg/') || content.includes('discordapp.com/invite/') ){
								
								message.delete();
								message.channel.send('You cannot send invites here, <@' + member + '>');
								bot.onEvent('autoMod', { guild: guild, member: member, type: 'Discord Invite', context: 'message'  } );
								return;
		
							}
						}

					}

					// Malware Detection.
					if(amod.bad_links.enabled == true){

						if(amod.bad_links.excluded_channels.includes(message.channel.id)){ return; }

						var links = Array.from(geturls(message.cleanContent));
						
						if(links.length > 0){

							safeBrowsing.checkMulti(links)
							.then(urlMap => {
								for (let url in urlMap) {
									if(urlMap[url] == true){
	
										// We have a harmfull URL!!!
										message.delete();
										message.channel.send('Your message contained a link to malware, <@' + member + '>');
										bot.onEvent('autoMod', { guild: guild, member: member, type: 'Safe-Browsing link check failed.', context: 'message' } );
	
									}
								}
							})
							.catch(err => {
								console.log('So sad...');
								console.log(err);
							});
							
						}
					}


					// ALLCAPS Detection.
					if(amod.mass_ping.enabled == true){

						if(amod.mass_ping.excluded_channels.includes(message.channel.id)){ return; }

						if(message.mentions.users.array().length >= amod.mass_ping.max_pings){
							message.delete();
							message.channel.send('Please do not mass-mention, <@' + member + '>');
							bot.onEvent('autoMod', { guild: guild, member: member, type: 'Mass Mention', context: 'message' } );
						}

					}
					
					// ALLCAPS Detection.
					if(amod.all_caps.enabled == true){

						if(amod.all_caps.excluded_channels.includes(message.channel.id)){ return; }

						var cstr = message.cleanContent
						var capcount = 0;

						for (var i = 0; i < cstr.length; i++) {
							var char = cstr.charAt(i)
							if (/[A-Z]/.test( char )){
								capcount++;
							}
						}

						if ( capcount > (cstr.length * (amod.all_caps.caps_pct/100) ) ){

								// If the string contains >80% capitals, bep bep deelt

								message.delete();
								message.channel.send('Your caps lock is showing, <@' + member + '>');
								bot.onEvent('autoMod', { guild: guild, member: member, type: 'Too Many Capitals', context: 'message' } );
						}


					}
					
					// banned words Detection.
					if(amod.bad_words.enabled == true){

						if(amod.bad_words.excluded_channels.includes(message.channel.id)){ return; }

						var cstr = message.cleanContent
						var words = JSON.parse(amod.bad_words.list);

						var ok = true;

						for (var i = 0; i < words.length; i++) {
							if( cstr.includes(words[i]) ){ ok = false }
						}

						if ( ok == false ){

							message.delete();
							message.channel.send('Please don\'t say that, <@' + member + '>');
							bot.onEvent('autoMod', { guild: guild, member: member, type: 'Banned Word', context: 'message' } );
						
						}


					}
				}

				

			})

			
		}

		if(event == 'messageDelete'){

			bot.getConfig(data.guild, '', (done, g, c, pass)=>{

				var config = c.config;
				var autoMod = config.autoMod;
				var amod = autoMod.filters

				if(amod == undefined){ return; }
				if(amod.invites == undefined){ return; }
				if(amod.bad_links == undefined){ return; }
				if(amod.list_boost == undefined){ return; }

				if(!done) return;
				if(config.disabled == 1){ return; }

				var message = data;
				var rank	= bot.getRank( data.guild, data.member, config );

				var guild 	= data.guild;
				var member 	= data.member;
				
				if(member.user.bot == true){ return; }


				//Message does not belong to a moderator or up so we can mess with it!
				if(rank < 2){

					// Invite Detection.
					if(amod.ghost_ping.enabled == true){

						if(amod.ghost_ping.excluded_channels.includes(message.channel.id)){ return; }

						if(message.mentions.users.array().length > 0 || message.mentions.roles.array().length)

						var messageAge 	= moment(message.createdAt).add(5, 'seconds');
						var now			= moment();

						if(messageAge > now){

							message.channel.send('Please do not ghostping, <@' + member + '>');
							bot.onEvent('autoMod', { guild: guild, member: member, type: 'Ghost Ping', context: 'message' } );

							message.mentions.users.forEach( user => {
								
								bot.emitNotification( user, 'ghostping', bot.L(config, 'notifications', 'ghostPing', "<#" +  message.channel + ">", message.guild.name, "`"+message.author.tag+"`"))
							
							})
						}
					}
				}
			})
		}
		

		if(event == 'guildMemberUpdate'){

			bot.getConfig(data.old.guild, '', (done, g, c, pass)=>{

				if(!done) return;

				var config = c.config;
				var amod = config.autoMod;
				
				if(amod == undefined){ return; }
				if(amod.invites == undefined){ return; }
				if(amod.bad_links == undefined){ return; }
				if(amod.list_boost == undefined){ return; }

				if(config.disabled == 1){ return; }

				var rank	= bot.getRank( data.neww.guild, data.neww, config );
				
				if(data.old.user.bot == true){ return; }


				if(amod.list_boost.enabled == true){

					//Prevent listBoost
					var member = data.neww;

					if(member.nickname){

						if(rank < 2){
							
							var deleteNick = false;
							if(member.nickname.startsWith('!')){ deleteNick = true; }
							if(member.nickname.startsWith('?')){ deleteNick = true; }
							if(member.nickname.startsWith('#')){ deleteNick = true; }
							if(member.nickname.startsWith('@')){ deleteNick = true; }
							if(member.nickname.startsWith('*')){ deleteNick = true; }
							if(member.nickname.startsWith(',')){ deleteNick = true; }
							if(member.nickname.startsWith('-')){ deleteNick = true; }
							if(member.nickname.startsWith('.')){ deleteNick = true; }
							if(member.nickname.startsWith('$')){ deleteNick = true; }
							if(member.nickname.startsWith('=')){ deleteNick = true; }

							if(deleteNick){
								member.setNickname( member.user.username, 'autoMod Violation: ListBump');
								bot.onEvent('autoMod', { guild: data.old.guild, member: data.neww, type: 'List Boosting', context: 'nick' } );
							}
						}
					}
				}

			})

		}

	}
	
}