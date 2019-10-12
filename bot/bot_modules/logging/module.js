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
			
			if(event != "messageUpdate"){ 
				data.new = data.neww;
			};

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


		// Now we finally know the guild.. Lets get the config.
		bot.getConfig(guild, '', (done, g, conf, pass)=>{
			if(!done){ return; }

			var config  = conf.config;
			var logSettings = JSON.parse(config.logging);

			if(config.disabled == 1){ return; }

			if(logSettings.enabled == 0){ return; }

			logSettings.logItems.forEach( logItem =>{

				if(event == logItem.event){

					var targetChannel = logSettings.default_channel;

					if(logItem.channel != "DEFAULT"){
						targetChannel = logItem.channel;
					}

					if(logItem.enabled == true){
						
						// Log it.
						this.getWebhook( event, data, config, logItem, targetChannel );
						//bot.log( event + " triggered in " + guild.name + " (" + guild.id + ")" );

					}
					return;

				}

			})




		});

	},

	logColors: {

		// Default style
		default: 	bot.cvert('#2A2A2A'),

		// Added Styles
		create: 	bot.cvert('#77ff68'),
		edit: 		bot.cvert('#ffed68'),
		delete: 	bot.cvert('#ff8668'),

		notif: 		bot.cvert('#68edff'),
		mod: 		bot.cvert('#cc68ff'),

		white: 		bot.cvert('#ffffff'),
		msDelete:	bot.cvert('#f9c3c0')

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

	getWebhook: function(event, data, config, logItem, targetChannel){

		// get important data now.
		var channel 	= client.channels.get(targetChannel) 


		// we need to fetch the webhooks for the channel.
		if(channel == undefined){ return; }
		if(channel.type != "text") { return; }
		
		channel.fetchWebhooks()
			.then(hooks => {

				var hooks = hooks.array();
				var hookToUse = null;

				for (i = 0; i < hooks.length; i++) { 

					var hook = hooks[i];

					if(hook.owner.id == client.user.id){
						hookToUse = hook;
					}

				}

				if(hookToUse == null){

					channel.createWebhook("Manager Logging", { avatar: "https://cdn.discordapp.com/attachments/410174551687954452/411098954072195093/avatar.png", reason: "Preparing manager for logging" } )
					.then( (hook) => {

						bot.log('Created a webhook for channel ' + channel.name)

						var hookedClient = new Discord.WebhookClient(hook.id, hook.token);
						this.logEvent(event, data, config, logItem, hookedClient, channel.guild)

					}).catch( ex => {
						console.log("was denied webhook access.")
					})
				}else{

					var hook = hookToUse
					var hookedClient = new Discord.WebhookClient(hook.id, hook.token);
					this.logEvent(event, data, config, logItem, hookedClient, channel.guild)

				}

			})
			.catch((e)=>{ return; });

	},

	logEvent: function(event, data, config, logItem, channel, guild){

		var date 		= moment();
		var fields 		= [];
		var send 		= false;

		if(event == "guildUpdate"){

			var fields = this.diffFieldBuilder( data.old, data.neww, config, logItem);
			
			this.getAudit( guild, this.auditID[event], ( audit => {

				if(audit == false){ return; }
				channel.send('',{"embed": {
					"title":bot.L(config, 'logging', event ) ,
					"description": bot.L(config, 'logging', 'guildUpdateDesc', this.logAdvancedName(audit.executor) ),
					"color": this.logColors.edit,
					"timestamp": date.format(),
					"fields": fields
					
		}})}) )}

		if(event == "channelCreate"){

			this.getAudit( guild, this.auditID[event], ( audit => {

				//Don't log own stuff.
				if(this.logAdvancedName(audit.executor).id == client.user.id){ return; }
				if(audit.executor.bot == true){ return; }


				if(audit == false){ return; }
				channel.send('',{"embed": {
					"title":bot.L(config, 'logging', event ) ,
					"description": bot.L(config, 'logging', 'logGenericCreate', this.logAdvancedName(audit.executor), data.toString() ),
					"color": this.logColors.create,
					"timestamp": date.format(),
					"fields": []
					
		}})}) )}

		if(event == "channelUpdate"){

			var fields = this.diffFieldBuilder( data.old, data.neww, config, logItem);

			if(fields == false){
				return;
			}
			
			this.getAudit( guild, this.auditID[event], ( audit => {

				//Don't log own stuff.
				if(this.logAdvancedName(audit.executor).id == client.user.id){ return; }
				if(audit.executor.bot == true){ return; }

				if(audit == false){ return; }
				channel.send('',{"embed": {
					"title":bot.L(config, 'logging', event ) ,
					"description": bot.L(config, 'logging', 'logGenericUpdate', this.logAdvancedName(audit.executor), data.old.toString() ),
					"color": this.logColors.edit,
					"timestamp": date.format(),
					"fields": fields
					
		}})}) )}

		if(event == "channelDelete"){

			this.getAudit( guild, this.auditID[event], ( audit => {

				//Don't log own stuff.
				if(this.logAdvancedName(audit.executor).id == client.user.id){ return; }
				if(audit.executor.bot == true){ return; }

				if(audit == false){ return; }
				channel.send('',{"embed": {
					"title":bot.L(config, 'logging', event ) ,
					"description": bot.L(config, 'logging', 'logGenericDelete', this.logAdvancedName(audit.executor), data.toString() + " ( " + data.name + " )" ),
					"color": this.logColors.delete,
					"timestamp": date.format(),
					"fields": []
					
		}})}) )}

		if(event == "guildBanAdd"){

			this.getAudit( guild, this.auditID[event], ( audit => {

				if(audit == false){ return; }
				channel.send('',{"embed": {
					"title":bot.L(config, 'logging', event ) ,
					"description": bot.L(config, 'logging', 'logUserBanned', this.logAdvancedName(audit.executor), audit.target ),
					"color": this.logColors.delete,
					"timestamp": date.format(),
					"fields": []
					
		}})}) )}

		if(event == "guildBanRemove"){

			this.getAudit( guild, this.auditID[event], ( audit => {

				if(audit == false){ return; }
				channel.send('',{"embed": {
					"title":bot.L(config, 'logging', event ) ,
					"description": bot.L(config, 'logging', 'logUserUnbanned', this.logAdvancedName(audit.executor), audit.target ),
					"color": this.logColors.delete,
					"timestamp": date.format(),
					"fields": []
					
		}})}) )}
		if(event == "messageUpdate"){

			//Discard any embed related updates (Links posted getting an embed count as an edit.)
			if(event == "messageUpdate"){ if(data.old.content == data.neww.content){ return; } }
			if(data.old.author.bot == true){ return; }
			
			channel.send('',{"embed": {
				"title":bot.L(config, 'logging', event ) ,
				"description": bot.L(config, 'logging', 'logMessageEdited', this.logAdvancedName(data.old.author), data.old.channel, "https://discordapp.com/channels/"+data.old.guild.id+"/"+data.old.channel.id+"/"+data.old.id),
				"color": this.logColors.white,
				"timestamp": date.format(),
				"fields": [
					{ "name": bot.L(config, 'logging', 'old' ), "value": data.old.content.substr(0, 1024), "inline": true},
					{ "name": bot.L(config, 'logging', 'new' ), "value": data.neww.content.substr(0, 1024), "inline": true}
				]
				
		}}) }
		
		if(event == "messageDelete"){

				if(data.author.bot == true){ return; }

				channel.send('',{"embed": {
					"title":bot.L(config, 'logging', event ) ,
					"description": bot.L(config, 'logging', 'logMessageDeleted', this.logAdvancedName(data.author), data.channel ),
					"color": this.logColors.msDelete,
					"timestamp": date.format(),
					"fields": [
						{ "name": bot.L(config, 'logging', event ), "value": data.content.substr(0, 1000)}
					]
					
		}}) }
		
		if(event == "guildMemberAdd"){


					channel.send('',{"embed": {
						"title":bot.L(config, 'logging', event ) ,
						"description": bot.L(config, 'logging', 'logJoin', this.logAdvancedName(data.user), data.guild.name ) ,
						"color": this.logColors.create,
						"timestamp": date.format(),
						"fields": []
					}})

		}
		
		if(event == "guildMemberRemove"){

			this.getAudit( guild, 20, ( audit => {

				if(audit.executor.toString() == "Discord"){
					channel.send('',{"embed": {
						"title":bot.L(config, 'logging', event ) ,
						"description": bot.L(config, 'logging', 'logLeave', this.logAdvancedName(data.user), data.guild.name ) ,
						"color": this.logColors.notif,
						"timestamp": date.format(),
						"fields": []
					}})
						
				}else{
					channel.send('',{"embed": {
						"title":bot.L(config, 'logging', event ) ,
						"description": bot.L(config, 'logging', 'logUserKicked', this.logAdvancedName(audit.executor), this.logAdvancedName(data.user) ) ,
						"color": this.logColors.mod,
						"timestamp": date.format(),
						"fields": []
					}})
				}

			}))

		}

		if(event == "emojiCreate"){

			this.getAudit( guild, this.auditID[event], ( audit => {

				// Don't log bot edits.
				if(audit.executor.bot == true){ return; }

				if(audit == false){ return; }
				channel.send('',{"embed": {
					"title":bot.L(config, 'logging', event ) ,
					"description": bot.L(config, 'logging', 'logGenericCreate', this.logAdvancedName(audit.executor), data.toString() ),
					"color": this.logColors.create,
					"timestamp": date.format(),
					"fields": []
					
		}})}) )}

		if(event == "emojiUpdate"){

			var fields = this.diffFieldBuilder( data.old, data.neww, config, logItem);
			
			this.getAudit( guild, this.auditID[event], ( audit => {
				
				// Don't log bot edits.
				if(audit.executor.bot == true){ return; }
				if(audit == false){ return; }

				channel.send('',{"embed": {
					"title":bot.L(config, 'logging', event ) ,
					"description": bot.L(config, 'logging', 'logGenericUpdate', this.logAdvancedName(audit.executor), data.old.toString() ),
					"color": this.logColors.edit,
					"timestamp": date.format(),
					"fields": fields
					
		}})}) )}

		if(event == "emojiDelete"){

			this.getAudit( guild, this.auditID[event], ( audit => {	
							
				// Don't log bot edits.
				if(audit.executor.bot == true){ return; }
				if(audit == false){ return; }

				if(audit == false){ return; }
				channel.send('',{"embed": {
					"title":bot.L(config, 'logging', event ) ,
					"description": bot.L(config, 'logging', 'logGenericDelete', this.logAdvancedName(audit.executor), data.toString() + " ( " + data.name + " )" ),
					"color": this.logColors.delete,
					"timestamp": date.format(),
					"fields": []
					
		}})}) )}

		if(event == "guildMemberUpdate"){
			
			var oldmember	= data.old;
			var newmember	= data.neww;

			var fields = this.diffFieldBuilder( data.old, data.neww, config, logItem);

			if(oldmember.roles.array().toString() 	!= newmember.roles.array().toString()	){ domsg2 = true; fields.push( { "name": "Roles Changed", "value": "Old:\n" + oldmember.roles.array() + "\nNew:\n" + newmember.roles.array() }) }

			this.getAudit( guild, this.auditID[event], ( audit ) => {
				this.getAudit( guild, 24, ( audite ) => {
							
					// Don't log bot edits.
					if(audit == false){ return; }
					if(audit.executor.bot == true){ return; }

					if(this.logAdvancedName(audit.executor).toString() == "Discord" && audite.executor.toString() != "Discord"){
						
						channel.send('',{"embed": {
							"title":bot.L(config, 'logging', event ) ,
							"description": bot.L(config, 'logging', 'logUpdateSelf', audite.executor ),
							"color": this.logColors.edit,
							"timestamp": date.format(),
							"fields": fields
							
						}})

					}else{

						channel.send('',{"embed": {
							"title":bot.L(config, 'logging', event ) ,
							"description": bot.L(config, 'logging', 'logUpdate', data.old, this.logAdvancedName(audit.executor) ),
							"color": this.logColors.mod,
							"timestamp": date.format(),
							"fields": fields
							
						}})

					}


				})
			})
		}

		if(event == "roleCreate"){

			this.getAudit( guild, this.auditID[event], ( audit => {
		
				// Don't log bot edits.
				if(audit == false){ return; }
				if(audit.executor.bot == true){ return; }

				channel.send('',{"embed": {
					"title":bot.L(config, 'logging', event ) ,
					"description": bot.L(config, 'logging', 'logGenericCreate', this.logAdvancedName(audit.executor), data.toString() ),
					"color": this.logColors.create,
					"timestamp": date.format(),
					"fields": []
					
		}})}) )}

		if(event == "roleUpdate"){

			var fields = this.diffFieldBuilder( data.old, data.neww, config, logItem);

			if(fields == false){
				return;
			}

			this.getAudit( guild, this.auditID[event], ( audit => {
		
				// Don't log bot edits.
				if(audit == false){ return; }
				if(audit.executor.bot == true){ return; }

				channel.send('',{"embed": {
					"title":bot.L(config, 'logging', event ) ,
					"description": bot.L(config, 'logging', 'logGenericUpdate', this.logAdvancedName(audit.executor), data.old.toString() ),
					"color": this.logColors.edit,
					"timestamp": date.format(),
					"fields": fields
					
		}})}) )}

		if(event == "roleDelete"){

			this.getAudit( guild, this.auditID[event], ( audit => {
		
				// Don't log bot edits.
				if(audit == false){ return; }
				if(audit.executor.bot == true){ return; }

				channel.send('',{"embed": {
					"title":bot.L(config, 'logging', event ) ,
					"description": bot.L(config, 'logging', 'logGenericDelete', this.logAdvancedName(audit.executor), data.toString() + " ( " + data.name + " )" ),
					"color": this.logColors.delete,
					"timestamp": date.format(),
					"fields": []
					
		}})}) )}


		if(event == "roomCreated"){
			channel.send('',{"embed": {
				"title":bot.L(config, 'logging', 'roomSummon' ) ,
				"description": "<@" + data.author.id + ">",
				"color": this.logColors.create,
				"timestamp": date.format(),
				"fields": []
					
		}}) }

		if(event == "roomDeleted"){

			var reason = bot.L(config, 'logging', 'roomRevokeReason'+data.reason )

			channel.send('',{"embed": {
				"title":bot.L(config, 'logging', 'roomRevoke' ) ,
				"description": "<@" + data.author.id + ">",
				"color": this.logColors.delete,
				"timestamp": date.format(),
				"fields": []
					
		}}) }

		if(event == "roomUpdated"){

			if(data.action == "OptionSet"){

				channel.send('',{"embed": {
					"title":bot.L(config, 'logging', 'roomUpdate' ) ,
					"description": bot.L(config, 'logging', 'RoomUpdatedOptionSet', data.context, data.value, data.owner ),
					"color": this.logColors.edit,
					"timestamp": date.format(),
					"fields": []
				}})

			}else{

				channel.send('',{"embed": {
					"title":bot.L(config, 'logging', 'roomUpdate' ) ,
					"description": bot.L(config, 'logging', 'RoomUpdated' + data.action, data.context, data.owner ),
					"color": this.logColors.edit,
					"timestamp": date.format(),
					"fields": []
				}})

			}
		}

		if(event == "levelUp"){

			channel.send('',{"embed": {
				"title": "Level Up!",
				"description": "<@" + data.member + "> is now level " + data.level,
				"color": this.logColors.notif,
				"timestamp": date.format(),
				"fields": []
					
		}}) }

		if(event == "configUpdate"){
			
			var user = client.users.get(data.user);

			channel.send('',{"embed": {
				"title": "Config Reloaded",
				"description": this.logAdvancedName(user) + " changed manager's settings via the dashboard.",
				"color": this.logColors.edit,
				"timestamp": date.format(),
				"fields": []
					
		}}) }

		if(event == "autoMod"){

			if(data.type == "Ghost Ping"){

				channel.send('',{"embed": {
					"title": "autoMod Violation",
					"description": "<@" + data.member + "> was caught by **autoMod**",
					"color": this.logColors.mod,
					"timestamp": date.format(),
					"fields": [
						{
							"name": "Reason",
							"value": data.type
						}
					]
						
				}}) 

			}else{
				channel.send('',{"embed": {
					"title": "autoMod Violation",
					"description": "<@" + data.member + "> had their "+data.context+" removed by **autoMod**",
					"color": this.logColors.mod,
					"timestamp": date.format(),
					"fields": [
						{
							"name": "Reason",
							"value": data.type
						}
					]
						
				}}) 

			}

		}

		
		if(event == "joinVoice"){

			channel.send('',{"embed": {
				"title":bot.L(config, 'logging', event ) ,
				"description": bot.L(config, 'logging', 'logJoinVC', this.logAdvancedName(data.user), data.channel.name ) ,
				"color": this.logColors.notif,
				"timestamp": date.format(),
				"fields": []
		}})
	}

	if(event == "leaveVoice"){

		channel.send('',{"embed": {
			"title":bot.L(config, 'logging', event ) ,
			"description": bot.L(config, 'logging', 'logLeaveVC', this.logAdvancedName(data.user), data.channel.name ) ,
			"color": this.logColors.notif,
			"timestamp": date.format(),
			"fields": []
		}})
	}
	if(event == "moveVoice"){

		channel.send('',{"embed": {
			"title":bot.L(config, 'logging', event ) ,
			"description": bot.L(config, 'logging', 'logMoveVC', this.logAdvancedName(data.user), data.channel.name ) ,
			"color": this.logColors.notif,
			"timestamp": date.format(),
			"fields": []
		}})
	}

	//Destroy webhook client.
	setTimeout( ()=> {
		channel.destroy()
	},1000)

	},

	diffFieldBuilder: function( obj1, obj2, config, logItem){

		var objDiff = diff(obj1, obj2).updated;
		var resultFields = [];

		//Remove bugged / Unwanted differences
		objDiff.remove('features');
		objDiff.remove('embedEnabled');
		objDiff.remove('rawPosition');
		objDiff.remove('permissions');
		objDiff.remove('_roles');
		objDiff.remove('lastMessageID');

		objDiff.forEach( diffItem => {

			if(diffItem == "permissionOverwrites"){ return false }

			var _field = { 
				"name": diffItem, //bot.HighFirst(.replace(/([A-Z]+)/g, " $1")), 
				"value": bot.L(config, 'logging', 'old' ) + ": `" + obj1[diffItem] + "`\n" + bot.L(config, 'logging', 'new' ) + ": `" + obj2[diffItem] + "`" }

			resultFields.push(_field);

		})

		return resultFields;
		

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
	},


	logAdvancedName: function(user){

		try{

			var username = user.username;
			var tag	     = user.tag;
			var mention  = user.toString();
	
			return mention + ' `' + tag + '`'

		}catch(ex){
			return user;
		}


	}
	
}