module.exports = {

	initializeModule: function(mod){

		//set name
		this.module = mod;

        //subscribe to bot events
		bot.subscribeEvent(this, 'ready');
		bot.subscribeEvent(this, 'guildCreate');

		//Config Func
		bot.cache.config = {};
		bot.getConfig = function(guild, pass, cb){
			try{

				var g 	= 	guild.id;
				var t 	= 	Math.floor(Date.now() / 1000);
				var cfg	= 	bot.cfg;

				if(bot.cache.config[g] != undefined){

					if(bot.cache.config[g].expires > t){
						cb(true, g, bot.cache.config[g], pass);
						return;
					}
				}

				knex.select().from(cfg.manager.cfgtable).where('guild', g ).then(function(data){

					bot.cache.config[g] = {
						"config": data[0],
						"expires": t+300
					}

					try{

						//if(bot.cache.config[g].config.levels.startsWith('"')){
							bot.cache.config[g].config.levels = JSON.parse(data[0].levels);
							bot.cache.config[g].config.autoMod = JSON.parse(data[0].autoMod);
							bot.cache.config[g].config.mods = JSON.parse(data[0].mods);
							bot.cache.config[g].config.admins = JSON.parse(data[0].admins);
						/*}else{
							bot.cache.config[g].config.levels = JSON.parse('"' + data[0].levels + '"');
							bot.cache.config[g].config.autoMod = JSON.parse('"' + data[0].autoMod + '"');
							bot.cache.config[g].config.mods = JSON.parse('"' + data[0].mods + '"');
							bot.cache.config[g].config.admins = JSON.parse('"' + data[0].admins + '"');
						}*/

						//const util = require('util')
						//console.log(util.inspect(bot.cache.config[g].config, {showHidden: false, depth: null}))
						
					}catch(ex){

					}

					cb(true, g, bot.cache.config[g], pass);

				}).catch((ex)=>{
					bot.logError(ex);
					bot.log(chalk.red('getConfig returned an error! (fetchFromDBError)'));
					cb(false, g, undefined, pass);
				});

			}catch(ex){

				//bot.log(chalk.red('ConfigFunction returned an error!'));
			}
		}
		
		bot.getRank = function( guild, member, config ){

			if(member == null){ return 1; }
			
			// Bot Dev
			if(member.id == "71167334798065664") { return 6; } 	// nioxed's ID
			if(member.id == client.user.id){ return 5;} 		//bot is admin itself lol
			
			// Guild Owner
			if(member.id == guild.ownerID) { return 4; }
			
			// Admin
			for (i = 0; i < config.admins.length; i++) { 
				if(member.roles.get(config.admins[i])) { return 3; }		
			}

			// Moderator
			for (i = 0; i < config.mods.length; i++) { 
				if(member.roles.get(config.mods[i])) { return 2; }		
			}
			
			// Muted
			if(member.roles.has('name', 'Muted')){ return 0; }

			// Member
			return 1;
			
		}
		
		bot.ranks = [
			"Muted",		//0
			"Member",		//1
			"Moderator",	//2
			"Admin",		//3
			"Server Owner",	//4
			"Bot Admin",	//5
			"Bot Owner"		//6
		];

		bot.where = [
			"Server Only",		//0
			"DM Only",			//1
			"Anywhere"			//2
		];

		setInterval( ()=>{
			knex('private_rooms').where( {'Revokable': '1', 'TextChannel': 'none', 'VoiceChannel': 'none'} ).del().then( data =>{
				//..
			});
		}, 1000)


		bot.roomPerm = function( config, option){
			
			var guildPermissions = JSON.parse(config.roomsPermissions)
			return guildPermissions[option];

		}

	},

	onEvent: function(event, data){

		if(event == "ready"){

			var clarr = client.guilds.array();

			clarr.forEach((item, key)=>{

				this.doUpdateConfig(item)

			})

			//Make sure a command comes from a server and not DM
			bot.addCommandCheck( function(message, cfg, result){

				if(message.channel.type == "text"){ result(true); }else{ result(false) }

			});

			//Define config loading function checkback
			bot.addCommandCheck( function(message, cfg, result){

				bot.getConfig(message.guild, message, (done, g, cee, pass)=>{

					var message = pass;
					var config = cee.config
					if(done == false){ result(false) };
					if(message.content.startsWith(config.prefix)){ result(true) }else{ result(false) }

				});

			});

		}

		if(event == "guildCreate"){
			this.doUpdateConfig(data);
		}

	},

	doUpdateConfig: function(guild){

		var loggingDefaultObject = '{"enabled":false,"default_channel":"","logItems":[{"event":"guildUpdate","enabled":false,"channel":"DEFAULT"},{"event":"guildMemberAdd","enabled":false,"channel":"DEFAULT"},{"event":"guildMemberRemove","enabled":false,"channel":"DEFAULT"},{"event":"guildBanAdd","enabled":false,"channel":"DEFAULT"},{"event":"guildBanRemove","enabled":false,"channel":"DEFAULT"},{"event":"messageUpdate","enabled":false,"channel":"DEFAULT"},{"event":"messageDelete","enabled":false,"channel":"DEFAULT"},{"event":"channelCreate","enabled":false,"channel":"DEFAULT"},{"event":"channelUpdate","enabled":false,"channel":"DEFAULT"},{"event":"channelDelete","enabled":false,"channel":"DEFAULT"},{"event":"emojiCreate","enabled":false,"channel":"DEFAULT"},{"event":"emojiUpdate","enabled":false,"channel":"DEFAULT"},{"event":"emojiDelete","enabled":false,"channel":"DEFAULT"},{"event":"roleCreate","enabled":false,"channel":"DEFAULT"},{"event":"roleDelete","enabled":false,"channel":"DEFAULT"},{"event":"roleUpdate","enabled":false,"channel":"DEFAULT"},{"event":"roomCreated","enabled":false,"channel":"DEFAULT"},{"event":"roomDeleted","enabled":false,"channel":"DEFAULT"}]}'
		var defaultEmptyArray = "[]"
		var roomsDefaults = '{"name":"Private Room [{user}]","memberlimit":"12","bitrate":"64","ptt":true,"embeds":"true","files":"true","nsfw":false,"unlocked":false,"bots":true,"visible":true}';
		var roomsPermissions = '{"name":true,"memberlimit":true,"bitrate":true,"ptt":true,"embeds":true,"files":true,"nsfw":false}';
		var levels = '{"enable":false,"notify":0,"rewards":[]}';
		var defaultModeration = '{"warns":{"enabled":false,"decayrate":1,"triggers":[]},"filters":{"invites":{"enabled":false,"excluded_channels":"[]","pct":0},"bad_links":{"enabled":true,"excluded_channels":"[]","pct":0},"all_caps":{"enabled":false,"excluded_channels":"[]","caps_pct":75,"pct":0},"list_boost":{"enabled":false},"mass_ping":{"enabled":false,"excluded_channels":"[]","max_pings":5,"pct":0},"ghost_ping":{"enabled":false,"excluded_channels":"[]","pct":0},"bad_words":{"enabled":false,"excluded_channels":"[]","list":"[]","pct":0}},"slowmode":"[]"}';

		knex.select().from(cfg.manager.cfgtable).where('guild', guild.id ).then(function(data){

			if(typeof(data[0]) != 'object'){

				knex(cfg.manager.cfgtable).where('guild', guild.id ).insert({
					
					guild: guild.id,

					//Default text values;
					logging: loggingDefaultObject,
					roomsWhitelist: defaultEmptyArray,
					roomsBlacklist: defaultEmptyArray,
					roomsBlacklist: defaultEmptyArray,
					roomsDefaults: roomsDefaults,
					roomsPermissions: roomsPermissions,
					levels: levels,
					mods: defaultEmptyArray,
					admins: defaultEmptyArray,
					disabledCommands: defaultEmptyArray,
					disabledFeatures: defaultEmptyArray,
					autoMod: defaultModeration
					

				}).then(function(data){

					var cat = {
						guild: guild.id,
						addDate: null,
						disabled: 0,
						prefix: "m!",
						lang: "en_US",
						disabledCommands: defaultEmptyArray,
						mods: defaultEmptyArray,
						admins: defaultEmptyArray,
						logging: loggingDefaultObject,
						autoMod: defaultEmptyArray,
						levels: levels,
						roomsEnabled: 0
					}

					var t 	= 	Math.floor(Date.now() / 1000);

					bot.cache.config[guild.id] = {
						"config": cat,
						"expires": t+10
					}

					try{

						bot.cache.config[guild.id] = undefined;

						setTimeout( ()=> {

							bot.getConfig(guild, '', (done, g, conf, pass)=>{

								// we gotta get an octagon
								
							});

						}, 100)

					}catch(ex){

					}

				});

			}

		});
	}

}