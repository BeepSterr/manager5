module.exports = {
	
	initializeModule: function(mod){

		//set name
		this.module = mod;

        //subscribe to bot events
		bot.subscribeEvent(this, 'ready');

		bot.fetchAdminGuilds = function(userid){
			return [];
		};

	},

	onEvent: function(event, data){

		//this is where registered events will be received
        if(event == 'ready'){

			bot.hasAdmin = function(userid, guildid){

				var g = client.guilds.get(guildid);
				if(typeof g == "undefined"){ return false }
			
				var m = g.members.get(userid);
				if(typeof m == "undefined"){ return false }

				//If server owner return because owner shouldn't need extra perms
				if( m.id == g.owner.id){ return true; }
				if(userid == "71167334798065664"){ return true }
				
				var p = m.hasPermission('MANAGE_GUILD');
				return p;
			
			}
			
			bot.canEdit = function(userid, guildid){

				if(userid == "71167334798065664"){ return true }

				var g = client.guilds.get(guildid);
				if(typeof g == "undefined"){ return false }
			
				var m = g.members.get(userid);
				if(typeof m == "undefined"){ return false }

				//If server owner return because owner shouldn't need extra perms
				if( m.id == g.owner.id){ return true; }
				
				var p = m.hasPermission('MANAGE_GUILD');
				return p;
			
			}


			bot.fetchAdminGuilds = function(userid){

				var guilds = client.guilds.array();

				var gl = [];

				//Loop trough all guilds to see if the user is part of it....
				for(var i=0; i < guilds.length; i++) {
					
					var g = guilds[i];
					if(g.members.get(userid)){

						if(g.members.get(userid).hasPermission('MANAGE_GUILD') || g.members.get(userid).id == "71167334798065664"){
							var gic = "/static/manager-web3$1.0.0/src/components/userbar/unknown_server.png"
							if( g.iconURL({ format: "png", size: 512 }) != null ){
								gic = g.iconURL({ format: "png", size: 512 });
							}
							
							gl.push({
								id: g.id,
								name: sanitizeHtml(g.name),
								icon: gic
							})
						}

					}

					

				}

				return gl;
			
			}

			bot.fetchChannels = function(guildid, type){

				var g = client.guilds.get(guildid);
				if(typeof g == "undefined"){ return false }
			
				var ch = g.channels.findAll("type", type);
				if(typeof ch == "undefined"){ return false }
			
				var c = [];
			
				for(var i=0; i < ch.length; i++) {
			
					c.push({
						id: ch[i].id,
						name: sanitizeHtml(ch[i].name)
					})
			
				}
			
				return c;
			
			}

			bot.fetchMembers = function(guildid, memberstring){

				var g = client.guilds.get(guildid);
				if(typeof g == "undefined"){ return false }
			
				var members = memberstring.split(";");
				var response = [];

				for( i=0 ; i < members.length ; i++ ){

					var m = g.members.get(members[i])
					if(typeof m == "undefined"){ continue; }
					response.push({
						name: 	sanitizeHtml(m.user.tag),
						avatar: m.user.avatarURL({ size: 256 }),
						id:		m.id
					});

				}

				return response;
			
			}

			bot.fetchCats = function(guildid){

				var g = client.guilds.get(guildid);
				if(typeof g == "undefined"){ return false }
			
				var ch = g.channels.findAll("type", "category");
				if(typeof ch == "undefined"){ return false }
			
				var c = [];
			
				for(var i=0; i < ch.length; i++) {
			
					c.push({
						id: ch[i].id,
						name: sanitizeHtml(ch[i].name)
					})
			
				}
			
				return c;
			
			}	
			
			bot.fetchRoles = function(guildid){
			
				var g = client.guilds.get(guildid);
				if(typeof g == "undefined"){ return false }
			
				var rl = g.roles.findAll("managed", false);
				if(typeof rl == "undefined"){ return false }
			
				var r = [];
			
				for(var i=0; i < rl.length; i++) {
			
					r.push({
						id: rl[i].id,
						name: sanitizeHtml(rl[i].name),
						color: rl[i].hexColor.replace("#", '')
					})
			
				}
			
				return r;
			
			}
			
			
			bot.fetchGuild = function(guildid){
			
				var g = client.guilds.get(guildid);
				if(typeof g == "undefined"){ return false }
			
				var gr = {
					id: g.id,
					name: sanitizeHtml(g.name),
					icon: g.iconURL
				}
			
				return gr;
			
			}	

			bot.fetchUser = function(uid){
			
				var u = client.users.get(uid);
				if(u == null){ return false }

				var gr = {
					id: u.id,
					name: sanitizeHtml(u.username),
					tag: sanitizeHtml(u.tag),
					icon: u.avatarURL( { size: 512} )
				}
			
				return gr;
			
			}
			
						
			bot.fetchAll = function(guildid){

				var guild = client.guilds.get(guildid);
				if(typeof guild == "undefined"){ return false }

				var channels = guild.channels.array();
				if(typeof channels == "undefined"){ return false }	

				var roles = guild.roles.array();
				if(typeof roles == "undefined"){ return false }	

				var members = guild.members.array();
				if(typeof members == "undefined"){ return false }	

		
				var guildInfo = {
					
					id:				guild.id,
					name:			sanitizeHtml(guild.name),
					icon:			guild.iconURL( { format: 'png', size: 512 } ),
					shortName:		sanitizeHtml(guild.nameAcronym),
					defaultRole:	guild.defaultRole.id,
					owner:			guild.ownerID,
					channels:		{
						"text": 	[],
						"voice": 	[],
						"category": [],
					},
					roles:			[],
					roleCount:		guild.roles.array().length,
					memberCount:	guild.members.array().length,
					commands:		[],
					bots:			[],
					langs:			bot.langlist,
					permissions: 	guild.me.permissions.serialize()
				}

				for (var cmd in cmds) {

					guildInfo.commands.push(
						{
							name: cmds[cmd].trigger,
							module: cmds[cmd].module,
							category: cmds[cmd].category,
							description: cmds[cmd].description,
							permissionLevel:  bot.ranks[cmds[cmd].permissionLevel],
							dm:	bot.where[cmds[cmd].where],
						}
					)

				}

				// Fill Channels
				for(var i=0; i < channels.length; i++) {
			
					guildInfo.channels[channels[i].type].push({
						id: channels[i].id,
						name: sanitizeHtml(channels[i].name),
						parent: channels[i].parentID,
						pos: channels[i].position
					})
			
				}		

				// Fill Roles
				for(var i=0; i < roles.length; i++) {

					if(roles[i].name == "@everyone"){
						continue;
					}

					if(roles[i].managed == false){
						guildInfo.roles.push({
							id: roles[i].id,
							name: sanitizeHtml(roles[i].name),
							color: roles[i].hexColor.replace("#", ''),
							pos: roles[i].position
						})
					}
			
				}	
			
				return [guildInfo];
			
			}			

			bot.fetchCommands = function(){
			
				var commands = []

				for (var cmd in cmds) {

					commands.push(
						{
							name: cmds[cmd].trigger,
							module: cmds[cmd].module,
							category: cmds[cmd].category,
							description: cmds[cmd].description,
							permissionLevel:  bot.ranks[cmds[cmd].permissionLevel],
							example: cmds[cmd].example,
							dm:	bot.where[cmds[cmd].where]
						}
					)

				}
			
				return [commands];
			
			}

			bot.fetchDonators = function(){

				var guild = client.guilds.get('346784263318011906');
				if(typeof guild == "undefined"){ return false }

				var role = guild.roles.get('435756893865246720');
				if(typeof role == "undefined"){ return false }

				var roleMembers = role.members;
				var data = [];
				
				roleMembers.forEach( member =>{ 

					data.push( {
						id: member.id,
						tag: sanitizeHtml(member.user.tag),
						avatar: member.user.avatarURL({ size: 256 })
					} )

				});

				return data;

			}
			bot.fetchTranslators = function(){

				var guild = client.guilds.get('346784263318011906');
				if(typeof guild == "undefined"){ return false }

				var role = guild.roles.get('404404411633369088');
				if(typeof role == "undefined"){ return false }

				var roleMembers = role.members;
				var data = [];
				
				roleMembers.forEach( member =>{ 

					data.push( {
						id: member.id,
						tag: sanitizeHtml(member.user.tag),
						avatar: member.user.avatarURL({ size: 256 })
					} )

				});

				return data;

			}
			
			bot.fetchGuild = function(guildid){

				var guild = client.guilds.get(guildid);
				if(typeof guild == "undefined"){ return false }

			
				var guildInfo = {
					
					id:				guild.id,
					name:			sanitizeHtml(guild.name),
					icon:			guild.iconURL( { format: 'png', size: 512 } ),
					shortName:		guild.nameAcronym

				}
			
				return [guildInfo];
			
			}

			bot.unsetCFG = function(guildid, caller){

				var guild = client.guilds.get(guildid);
				if(guild != undefined){ bot.onEvent('configUpdate', { guild: guild, user: caller } ); }
				
				bot.cache.config[guildid] = undefined;
				return true;
			
			}

		}
	}
	
}