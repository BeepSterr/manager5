module.exports = {

	initializeModule: function(mod){

		//set name
		this.module = mod;

        //subscribe to bot events
		bot.subscribeEvent(this, 'ready');
		bot.subscribeEvent(this, 'channelDelete');
		bot.subscribeEvent(this, 'joinVoice');
		bot.subscribeEvent(this, 'moveVoice');
		bot.subscribeEvent(this, 'guildMemberRemove');

	},

	onEvent: function(event, data){

		if(event == 'guildMemberRemove'){

			var member = data;
			bot.getConfig(member.guild, '', (done, g, conf, pass)=>{

				if(!done){ return; }
				var config = conf.config;

				bot.modules['privateRooms'].revokeRoom( member, member.guild, config );

			});
			
		}

		if(event == "ready"){

			if(bot.initialized == false)
			{
				setTimeout( () => {

					setInterval( ()=>{ 
						this.inactiveRoomCheck() 
					}, 1000);
	
					setInterval( ()=>{ 
						//this.roomSummonChannelCheck(); testing with this
					}, 1000);
	
				}, 5000);
				
			}

		}


		if(event == "joinVoice" || event == "moveVoice"){

			this.betterSummonCheck(event, data);

		}

		if(event == "channelDelete"){

			knex('private_rooms').where('voiceChannel', data.id ).update('voiceChannel', 'none' ).then(function(response){ })
			knex('private_rooms').where('textChannel', data.id ).update('textChannel', 'none' ).then(function(response){ })

		}


	},

	summonRoom( guild, member, message, config, doMove = false ){

		if(config.disabled == 1){ return; }

		/*
			Room Summoning checks
		*/

		// Making sure we can respond if needed. (We can't do that if user is using the join channel.)
		var canRespond = false;
		if(message){
			canRespond = true
		}

		//Alight. lets check if we're allowed to create rooms at the moment.
		if(config.roomsEnabled == 0){
			if(canRespond){ bot.reply(message, bot.L(config, 'rooms', 'disabled')); } //Send the disabled message.
			return;
		}

		
		// Lets do some basic permission checking for debugging.
		var err_string = "Cannot summon room, Missing permissions: ";
		if( guild.me.hasPermission( 'MANAGE_ROLES' ) == false ) { err_string = err_string + "`Manage Roles` "; var has_perm = false;  }
		if( guild.me.hasPermission( 'MANAGE_CHANNELS' ) == false ) { err_string = err_string + "`Manage Channels` "; var has_perm = false;  }
		if( guild.me.hasPermission( 'MANAGE_GUILD' ) == false ) { err_string = err_string + "`Manage Guild`"; var has_perm = false;  }
		if(has_perm == false){
			if(canRespond){ message.channel.send(err_string);
			}else{ member.setVoiceChannel(guild.afkChannel); member.user.send(err_string); }
			return;
		}

		// Oh, We totally should check if the current user actually is allowed to create a room (whitelist, blacklist)

		var whitelist 	= JSON.parse(config.roomsWhitelist)
		var blacklist 	= JSON.parse(config.roomsBlacklist)
		var defaults	= JSON.parse(config.roomsDefaults)

		console.log(whitelist)

		var blacklisted = false;
		blacklist.forEach( role => {
			if(member.roles.has(role)){
				// User is blacklisted :(
				blacklisted = true;
				return;
			}
		})

		if(blacklisted){

			bot.reply(message, bot.L(config, 'genericMessages', 'errorYouPermission'));
			return;
		}

		var whitelisted = false;
		//Make sure a whitelist is set

		if(typeof(whitelist) == 'object'){

			whitelist.forEach( role => {

				if(member.roles.has(role)){
					whitelisted = true;
				}
				
			})

			if(whitelist.length == 0){
				whitelisted = true
			}

		}

		if(whitelisted == false){

			bot.reply(message, bot.L(config, 'genericMessages', 'errorYouPermission'));
			return;
			
		}

		//We're allowed to summon, Lets see if they don't already have a room out there.
		knex.select().from('private_rooms').where('owner', member.id ).then(function(data){
			
			//We were able to fetch a existing room. Deny summoning a new one.
			if(typeof data[0] != 'undefined'){ 
				if(canRespond){ bot.reply(message, bot.L(config, 'rooms', 'alreadyHasRoom')); 
				}else{ member.setVoiceChannel(data[0].VoiceChannel) }
				return;
			}

				/*
					Room Summoning checks passed
				*/

				// Create a special ID for the current room instance so we don't have to rely on channel ID's
				var roomInstance = snowflake.nextId();

				//Get some vars
				var category = guild.channels.get(config.roomsCategory);
				var textCategory = guild.channels.get(config.roomsCategoryText);

				var roomName = defaults.name;
				var roomName = roomName.replace("{user}", member.displayName);

				if(roomName == ""){
					roomName = "Private Room [" + member.displayName + "]"
				}

				var overwrites_voice = [ { denied: ['CONNECT', 'VIEW_CHANNEL'], id: guild.defaultRole.id, type: "role" }, { allowed: ['CONNECT', 'VIEW_CHANNEL', 'MANAGE_CHANNELS', 'MANAGE_ROLES', 'MOVE_MEMBERS'], id: client.user.id } ];
				var overwrites_text = [{ denied: ['SEND_MESSAGES', 'VIEW_CHANNEL'], id: guild.defaultRole.id, type: "role" }, { allowed: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'MANAGE_CHANNELS', 'MANAGE_ROLES'], id: client.user.id }] 

				//Get parent permissions and stuff
				if(category != undefined){
					
					category.permissionOverwrites.array().forEach( ow => {

						overwrites_voice.push(ow);

					})

				}
				
				if(textCategory != undefined){

					textCategory.permissionOverwrites.array().forEach( ow => {

						overwrites_text.push(ow);

					})
				}

				// If we need to add bots, add bots.
				if(defaults.bots == true){
					guild.members.forEach( member => {
						if(member.user.bot == true){ 
							overwrites_voice.push({ allowed: ['CONNECT', 'VIEW_CHANNEL'], id: member.id });
							overwrites_text.push({ allowed: ['SEND_MESSAGES', 'VIEW_CHANNEL'], id: member.id });
						}
					})
				}

				var everyonePermsDenyV = [];
				var everyonePermsAllowV = [];
				var everyonePermsDenyT = [];
				var everyonePermsAllowT = [];

				if(defaults.ptt == true){
					everyonePermsDenyV.push('USE_VAD')
				}

				//we'll need to hide the channels
				if(defaults.visible == false){
					everyonePermsDenyV.push('VIEW_CHANNEL')
				}

				everyonePermsDenyV.push('CONNECT')
				everyonePermsDenyT.push('VIEW_CHANNEL')

				overwrites_voice.push( { denied: everyonePermsDenyV, id: guild.defaultRole.id, type: "role" } )
				overwrites_text.push( { denied: everyonePermsDenyT, id: guild.defaultRole.id, type: "role" } )
				


				if( config.roomsType == "BOTH" || config.roomsType == "VOICE" ){

					// We need to create a voice channel.
					guild.channels.create( roomName.slice(0, 32), { 
						reason: "Private Room Summoned", 
						type: "voice", 
						parent: category, 
						overwrites: overwrites_voice,

						//roomDefaults
						bitrate: defaults.bitrate*1000,
						userLimit: defaults.memberlimit

					} ).then( (channel)=>{

						//Update DB with Voice Channel.
						knex('private_rooms').where('roomID', roomInstance ).update( { 'VoiceChannel': channel.id, 'Revokable': 1 } ).then(function(response){ })

						//Add Room owner to room
						channel.updateOverwrite(member, { 'VIEW_CHANNEL': true, 'CONNECT': true })

						//Unlock room if needed.
						if(defaults.startUnlock == true){
							channel.updateOverwrite(guild.defaultRole.id, { 'VIEW_CHANNEL': true, 'CONNECT': true })
						}

						if(doMove == true){
							setTimeout( () =>{
								member.setVoiceChannel(channel)
							}, 100)
						}

					}).catch(ex => {
						bot.log(chalk.red('Unable to create voice channel'))
						console.log(ex);
					})
					
				}

				if( config.roomsType == "BOTH" || config.roomsType == "TEXT" ){

					// We need to create a text channel.
					guild.channels.create( bot.dashify(roomName).slice(0, 32), { 
						reason: "Private Room Summoned", 
						type: "text", 
						parent: textCategory,
						topic: bot.L(config, 'rooms', 'defaultTopic', member.displayName, moment().format('MMMM Do YYYY, h:mm:ss a'), config.prefix, config.prefix, config.prefix, config.prefix),
						overwrites: overwrites_text
					} ).then( (channel)=>{

						//Update DB with Voice Channel.
						knex('private_rooms').where('roomID', roomInstance ).update( { 'TextChannel': channel.id, 'Revokable': 1 } ).then(function(response){ })

						//Add Room owner to room
						channel.updateOverwrite(member, { 'VIEW_CHANNEL': true, 'SEND_MESSAGES': true, 'MANAGE_MESSAGES': true })

						//Unlock room if needed.
						if(defaults.startUnlock == true){
							channel.updateOverwrite(guild.defaultRole.id, { 'VIEW_CHANNEL': true, 'SEND_MESSAGES': true })
						}

						channel.send('', {
							"embed": {
							  "color": 16511898,
							  "author": {
								"name": "Welcome to your private channel!",
								"icon_url": "https://managerbot.me/static/manager-web3$1.0.0/src/components/site-layout/logo.png"
							  },
							  "fields": [
								{
								  "name": "Invite some people!",
								  "value": "Now that you have a room, Invite some friends with `" + config.prefix + "room invite @Friend`\nInstead of mentioning every single person you want to add, Try using [Special Mentions](https://managerbot.me/faq/8)"  
								},
								{
								  "name": "More Control?",
								  "value": "Use the `" + config.prefix + "room commands` command to list all available room commands!"
								},
								{
								  "name": "Done?",
								  "value": "If your room is empty, It will automatically be removed after a while. If you want to manually remove it you can with `" + config.prefix + "room revoke`\n\nIf you liked using this feature, Please consider upvoting the bot over at [Discord Bot List](https://discordbots.org/bot/345612130122334209)",
								  "inline": false
								}
							  ]
							}
						  })

					}).catch(ex => {
						bot.log(chalk.red('Unable to create text channel'))
						console.log(ex);
					})
				}

				var timeString = new Date().toISOString()

				// Ok Channels are made and everyone is locked out of it. This would be a good time to save it to the database.
				knex('private_rooms').where('owner', member.id ).insert({

					roomID: roomInstance,
					GuildID: guild.id,
					VoiceChannel: 'none',
					TextChannel: 'none',
					lastActive: timeString,
					Owner: member.id,

				}).then(function(data){

					//Data saved in DB.
					setTimeout( ()=> {
						knex('private_rooms').where('roomID', roomInstance ).update( { 'Revokable': 1 } ).then(function(response){ })
					},2000)

					bot.onEvent('roomCreated', { guild: guild, instance: roomInstance, author: member });

					if(canRespond){
						bot.reply(message, bot.L(config, 'rooms', 'summonedBoth'));
					}	

				}).catch(ex =>{

					// Something went wrong and we can't track the channels. Delete and exit.
					voice_channel.delete();
					text_channel.delete();

					bot.reply(message, bot.L(config, 'genericMessages', 'errorUnknown'));

				})

		});

	},

	/*


		=============================================================================================


	*/

	inactiveRoomCheck(){

		//fetch all rooms
		knex.select().from('private_rooms').then(function(data){

			//look trough all rooms
			data.forEach( current => {

				var nowDate = new Date();
				var lastActiveDate = new Date(current.lastActive);

				var now = moment(nowDate);
				var lastActive = moment(lastActiveDate)
				if(client.guilds.get(current.GuildID)){

					var guild = client.guilds.get(current.GuildID)

					if(!guild.available){
						// We have an outage! Panic!
						return;
					}
					
					// Lets check if the room actually exists!
					if(!client.channels.get(current.VoiceChannel) && current.VoiceChannel != "none"){
						//knex('private_rooms').where('roomID', current.RoomID ).update( { 'VoiceChannel': 'none' } ).then(function(response){ })
						return;
					}					
					// Lets check if the room actually exists!
					if(!client.channels.get(current.TextChannel) && current.TextChannel != "none"){
						//knex('private_rooms').where('roomID', current.RoomID ).update( { 'TextChannel': 'none' } ).then(function(response){ })
						return;
					}

					var member = guild.members.get(current.Owner)


					// Okay, At this point we're pretty certain the rooms are available and exist.
					// Time to check if they're being used and if not decide if they need to stick around.
					bot.getConfig(guild, '', (done, g, conf, pass)=>{

						if(!done){ return; }

						var config = conf.config;
						var expiresOn = lastActive.add(config.roomsInactiveTimer, 'seconds')
						var hasExpired = ( now > expiresOn )
						
						if(config.disabled == 1){ return; }

						// Making sure we have to actually check inactivity time.
						if(config.roomsInactiveTimer == -1 ){ return; }
						if(config.roomsInactiveTimer < 1 ){ config.roomsInactiveTimer = 30 }

						// Checking the voice channel.
						if(current.VoiceChannel != "none"){
							if(client.channels.get(current.VoiceChannel).members.filter( (mem)=>{
								if(mem.user.bot == true){ return false; }else{ return true; }
							}).array().length != 0){
								knex('private_rooms').where('roomID', current.roomID ).update('lastActive', nowDate.toISOString()).then(function(response){ })
								return;
							}
						}

						// Checking the text channel.
						if(current.TextChannel != "none"){

							if(client.channels.get(current.TextChannel)){
								
								var _message = client.channels.get(current.TextChannel).lastMessage
								if(_message != null){
									var messageTime = moment(_message.createdAt).add(config.roomsInactiveTimer, 'seconds');
									var expiresOn = lastActive
										
									if(messageTime > expiresOn ){
										knex('private_rooms').where('roomID', current.roomID ).update('lastActive', nowDate.toISOString()).then(function(response){ })
										return;
									}
								}

							}
						}

						if(hasExpired){

							if(current.VoiceChannel != "none"){

								var chan = guild.channels.get(current.VoiceChannel)
								if(typeof(chan) == "undefined"){ knex('private_rooms').where('roomID', current.roomID ).update('voiceChannel', 'none' ).then(function(response){ }) }

								chan.delete().then( ()=> {
									//Update DB with Voice Channel.
									knex('private_rooms').where('roomID', current.roomID ).update('voiceChannel', 'none' ).then(function(response){ })
								})
		
							}
							
							if(current.TextChannel != "none"){
		
								var chan = guild.channels.get(current.TextChannel)
								if(typeof(chan) == "undefined"){ knex('private_rooms').where('roomID', current.roomID ).update('textChannel', 'none' ).then(function(response){ }) }
								
								chan.delete().then( ()=> {
									//Update DB with Voice Channel.
									knex('private_rooms').where('roomID', current.roomID ).update('textChannel', 'none' ).then(function(response){ })
								})
		
							}
							
							bot.onEvent('roomDeleted', { guild: guild, instance: current.roomID, author: member, reason: "Automatic Deletion due to inactivity." });
							
						}


					});
				}
				

			})

		});

	},

	revokeRoom: function( member, guild, config, message = null ){

		if(config.disabled == 1){ return; }
		
		knex.select().from('private_rooms').where('owner', member.id ).then(function(data){

			//if room no exists yell at them
			if(data[0] == undefined){ if(message != null){ bot.reply(message, bot.L(config, 'rooms', 'noRoom')); return } }

			for (var i = 0; i < data.length; i++) {

				var item = data[i];

				if(data[0].VoiceChannel != "none"){

					var curChan = client.channels.get(item.VoiceChannel)
					if(typeof(curChan) == "undefined"){ knex('private_rooms').where('roomID', item.roomID ).update('voiceChannel', 'none' ).then(function(response){ }) }
					
					curChan.delete().then( ()=> {
						//Update DB with Voice Channel.
						knex('private_rooms').where('roomID', item.roomID ).update('voiceChannel', 'none' ).then(function(response){ })
					})

				}
				
				if(item.TextChannel != "none"){

					var curChan = client.channels.get(item.TextChannel)
					if(typeof(curChan) == "undefined"){ knex('private_rooms').where('roomID', item.roomID ).update('textChannel', 'none' ).then(function(response){ }) }
					
					curChan.delete().then( ()=> {
						//Update DB with Voice Channel.
						knex('private_rooms').where('roomID', item.roomID ).update('textChannel', 'none' ).then(function(response){ })
					})

				}

				bot.onEvent('roomDeleted', { guild: guild, instance: item.roomID, author: member });

			}
		});

	},
	
	/*roomSummonChannelCheck: function(){

		//fetch all guilds
		client.guilds.forEach((key, value) =>{

			var guild = client.guilds.get(value);

			bot.getConfig(guild, '', (done, g, data, message)=>{

				if(done){

					var config = data.config;
                    if(config.disabled == 1){ return; }

					if(config.roomsSummonChannel == "NONE"){ return; }

					var channel = guild.channels.get(config.roomsSummonChannel);
					if(typeof channel == "undefined"){ return; }

					channel.members.forEach((key, m) =>{

						var member = guild.members.get(m);
						if(channel.id == member.voiceChannelID){
							bot.modules['privateRooms'].summonRoom( guild, member, null, config)
						}

					})

				}

			})

		})
	},*/

	betterSummonCheck( event, data){

		// Extract vars :)
		var guild = data.guild;
		var user  = data.user;
		var member = guild.members.get(user.id);
		var channel = channel;

		bot.getConfig(guild, '', (done, g, ccc, message)=>{

			if(done){

				var config = ccc.config;
				if(config.disabled == 1){ return; }

				if(config.roomsSummonChannel == "NONE"){ return; }

				var channel = guild.channels.get(config.roomsSummonChannel);
				if(typeof channel == "undefined"){ return; }

				channel.members.forEach((key, m) =>{

					var member = guild.members.get(m);
					if(channel.id == member.voiceChannelID){
						bot.modules['privateRooms'].summonRoom( guild, member, null, config, true)
					}

				})

			}

		})

	},

	roomAdminReset( message, config ){



	}

}