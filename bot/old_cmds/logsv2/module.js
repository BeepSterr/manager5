module.exports = {
	
	initializeModule: function(mod){

		//set name
		this.module = mod;

		//Modules
		diff = require("shallow-diff");

        //subscribe to bot events
		//bot.subscribeEvent(this, 'ready');
		bot.subscribeEvent(this, 'channelCreate');
		bot.subscribeEvent(this, 'channelDelete');
		bot.subscribeEvent(this, 'channelUpdate');
		
		bot.subscribeEvent(this, 'emojiCreate');
		bot.subscribeEvent(this, 'emojiDelete');
		bot.subscribeEvent(this, 'emojiUpdate');

		bot.subscribeEvent(this, 'guildBanAdd');
		bot.subscribeEvent(this, 'guildBanRemove');

		bot.subscribeEvent(this, 'guildMemberAdd');
		bot.subscribeEvent(this, 'guildMemberRemove');
		bot.subscribeEvent(this, 'guildMemberUpdate');

		bot.subscribeEvent(this, 'message');
		bot.subscribeEvent(this, 'messageDelete');
		bot.subscribeEvent(this, 'messageUpdate');

		bot.subscribeEvent(this, 'roleCreate');
		bot.subscribeEvent(this, 'roleDelete');
		bot.subscribeEvent(this, 'roleUpdate');

		bot.subscribeEvent(this, 'guildUpdate');
		
		//Custom Events
		bot.subscribeEvent(this, 'roomCreated');
		bot.subscribeEvent(this, 'roomDeleted');
		bot.subscribeEvent(this, 'roomUpdated');
		bot.subscribeEvent(this, 'roomMemberUpdate');
		
		bot.subscribeEvent(this, 'configUpdate');
		bot.subscribeEvent(this, 'levelUp');
		bot.subscribeEvent(this, 'autoMod');

		bot.subscribeEvent(this, 'joinVoice');
		bot.subscribeEvent(this, 'leaveVoice');
		bot.subscribeEvent(this, 'moveVoice');

		bot.subscribeEvent(this, 'ready');
		
		
	},


	onEvent: function(event, data){

		var inviteUsed = undefined;

		// I'm very not glad about any of this.
		var guild = null;

		if(event == "channelCreate" || event == "channelDelete")
			guild = data.guild;

		if(event == "emojiCreate" || event == "emojiDelete")
			guild = data.guild;

		if(event == "emojiUpdate" || event == "channelUpdate" || event == "guildMemberUpdate" || event == "messageUpdate"){
			guild = data.old.guild;
		}

		if( event == "guildUpdate" )
			guild = data.old;

		if(event == "guildBanAdd" || event == "guildBanRemove")
			guild = data.evnt;

		if(event == "guildMemberAdd" || event == "guildMemberRemove")
			guild = data.guild;

		if(event == "message" || event == "messageDelete")
			guild = data.guild;

		if(event == "roleCreate" || event == "roleDelete")
			guild = data.guild;

		if(event == "roleUpdate")
			guild = data.old.guild;

		if(data.guild != undefined)
			guild = data.guild;

		if(data.neww != undefined){
			data.new = data.neww;
			data.neww = undefined;
		}


		this.logEvent(event, data, guild)

	},

	auditID: {
		"channelCreate" 		: 10,
		"channelDelete" 		: 12,
		"channelUpdate" 		: 11,
		"emojiCreate" 			: 60,
		"emojiDelete" 			: 62,
		"emojiUpdate" 			: 61,
		"guildBanRemove" 		: 23,
		"guildBanAdd" 			: 22,
		"guildUpdate" 			: 1,
		"roleCreate" 			: 30,
		"roleDelete" 			: 32,
		"guildMemberUpdate" 	: 25,
		"roleUpdate" 			: 31
	},

	logEvent: function(event, data, guild){

		var date 		= moment();


		if(this.auditID[event] != undefined){


			this.getAudit( guild, this.auditID[event], ( audit ) => {

				knex('weblog').insert({

					log: bot.snowflake.nextId(),
					guild: guild.id,
					type: event,
					event: JSON.stringify(data),
					audit: JSON.stringify(audit),
					executor: JSON.stringify(audit.executor),
					target: JSON.stringify(audit.target),
					extra: JSON.stringify(audit.extra),
					timestamp: date.unix(),
					reason: audit.reason

				}).then( data => {
					return;
				}).catch(ex => {
					//bot.log(ex.message)
				})
			})

		}else{

			var executor = null;
			var target = null;
			var extra = null;
			var reason = null;

			if(event == "guildMemberAdd" || event == "guildMemberRemove"){
				target = data.id;
			}

			if(event == "message"){
				extra = data.channel.id;
			}

			knex('weblog').insert({

				log: bot.snowflake.nextId(),
				guild: guild.id,
				type: event,
				event: JSON.stringify(data),
				audit: null,
				executor: executor,
				target: target,
				extra: extra,
				timestamp: date.unix(),
				reason: reason

			}).then( data => {
				return;
			}).catch(ex => {
				//bot.log(ex.message)
			})

		}

	},

	getAudit: function( guild, type, cb){

		guild.fetchAuditLogs({ type: type, limit: 1 }).then(auditlogs => {

			var entry = auditlogs.entries.first();

			if (entry == undefined){
				entry = {
					executor: {
						id: client.user.id,
						toString: function(){ return "Discord" }
					}
				}
			}

			var date = moment(entry.createdAt).add(10, 'seconds');
			var now = moment();
			if(date > now){
				cb( entry );

			}else{

				entry.executor = {
					id: client.user.id,
					toString: function(){ return "Discord" }
				}
				cb( entry );
			}
			
			
		}).catch(ex => {
			//No audit permissions.
			cb( false );
		})
	}
	
}