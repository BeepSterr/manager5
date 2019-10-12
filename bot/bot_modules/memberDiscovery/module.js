module.exports = {

	initializeModule: function(mod){

		//set name
		this.module = mod;

		bot.snowflake = require('node-snowflake').Snowflake;

        //subscribe to bot events
		//bot.subscribeEvent(this, 'ready');

		bot.collectMembers = function( guild, items, returnrole = false ){

			var targets = []
			var filters = []

            items.forEach((arg)=>{

				if(arg != ""){



					if(arg.startsWith('-')){
						var filter = bot.getFilterMentions(guild, arg)
						if(filter){ filters.push(filter); }
					}else{

						var people = bot.findPerson(guild, arg, returnrole);
						targets = targets.concat(people);

					}

				}

			})
			
			var resp = bot.removeDuplicates(targets, 'id');
			var final = [];

			resp.forEach( item => {

				if(!filters.join(' ').includes(item.id)){
					final.push(item);
				}

			})

			return final;

		}
		
		bot.findPerson = function( guild, item, returnrole = false ){

			item = item.toLowerCase();

			//We should check if this is a -Special Mention- first.
			var sMentions = bot.getSpecialMentions(guild, item);
			if(sMentions){ return sMentions; }

			//Is it a direct mention?
			if( (item.startsWith('<@!') || item.startsWith('<@')) && item.endsWith('>')){

				var id = item.replace("<@!", "");
					id = id.replace("<@", "");
					id = id.replace(">", "");

				var guildMention = guild.members.get(id);
				if(guildMention){

					var guildReturn = [];
					guildReturn.push(guildMention)

					return guildReturn;

				}
			}

			//Is it a role request?
			if( item.startsWith('r:') ){

				var it = item.replace("r:", "");

				var guildRole = guild.roles.filter( val => val.name.toLowerCase().includes(it) ).array();
				if(guildRole.constructor === Array){
					
					if(returnrole){
						return guildRole
					}
	
					var roleMembers = [];
					guildRole.forEach((role)=>{
						var thisMembers = role.members.array();
						roleMembers = roleMembers.concat(thisMembers);
					});
	
					var roleMembersFiltered = bot.removeDuplicates(roleMembers, 'displayName');
					return roleMembersFiltered;
	
				}	
				
			}

			//Aight, So this isn't a special mention.. Lets try and figure out who they mean.
			//These arguments are created from a cleanContent instance.. So if its a mention it'll have @ infront of it, Lets get rid of it :)
			item = item.replace(/^,/, '');

			//Now lets see if we can find this member in the current guild.
			var guildMembers = guild.members.filter(val => val.displayName.toLowerCase() == item).array();
			if(guildMembers.constructor === Array){ if(guildMembers.length != 0){ return guildMembers; } }

			//Well then, A direct match wasn't found.. Lets try another one!
			var guildMemberInc = guild.members.filter( val => val.displayName.toLowerCase().includes(item) ).array();
			if(guildMemberInc.constructor === Array){ if(guildMemberInc.length != 0){  return guildMemberInc; } }

			//... Lets try username!
			var guildMemberUser = guild.members.filter( val => val.user.username.toLowerCase() == item ).array();
			if(guildMemberUser.constructor === Array){ if(guildMemberUser.length != 0){  return guildMemberUser; } }

			//... Lets try username, But this time in parts!
			var guildMemberUserM = guild.members.filter( val => val.user.username.toLowerCase().includes(item) ).array();
			if(guildMemberUserM.constructor === Array){ if(guildMemberUserM.length != 0){  return guildMemberUserM; } }


			//Ok so, We're not looking at a users name.. Maybe a role?
			//Is it a direct role mention?
			if( item.startsWith('<@&') && item.endsWith('>')){

				var id = item.replace("<@&", "");
				id = id.replace(">", "");

				var guildRole = guild.roles.get(id);
				if(guildRole){ return guildRole.members.array(); }
			}
			
			//....... WE could try and keep going but for now we'll give up here, And return an empty array.
			return [];
		}


		bot.getSpecialMentions = function(guild, item){

			//Here is where we check if a special mention was used.
			var check = item;

			/*
				Mention: +all
				Usage: Alternative for @everyone that doesn't ping.
			*/ if(check == "+all"){ return guild.members.filter( val => val.user.bot == false ).array(); }

			/*
				Mention: +bots
				Usage: Gets all bots
			*/ if(check == "+bots"){ return guild.members.filter( val => val.user.bot == true ).array(); }

			/*
				Mention: +online
				Usage: Alternative for @here that doesn't ping.
			*/ if(check == "+online"){ return guild.members.filter( val => val.user.presence.status != 'offline' ).array(); }


			/*
				Mention: +offline
				Usage: all people with the offline status
			*/ if(check == "+offline"){ return guild.members.filter( val => val.user.presence.status == 'offline' ).array(); }

			/*
				Mention: +random
				Usage: Get some random member
			*/ if(check == "+random"){ return [guild.members.random()] }

			/*
				Mention: +active
				Usage: Selects all members who sent a message recently.
			*/ 
			var d = new Date(); 
			
			if(check == "+active"){ return guild.members.filter( val => { 

				if(val.lastMessage != undefined){ 

					if(val.lastMessage.createdAt.getTime() >  d.getTime() - 300000){ 
						return true;
					}else{ 
						return false; 
					} 

				}else{
					return false;
				}

			}).array()};
			
			/*
				Mention: +status:online
				Usage: Get all people with the online state.
			*/ if(check == "+status:online"){ return guild.members.filter( val => val.user.presence.status == 'online' ).array(); }
			

			/*
				Mention: +status:away
				Usage: Get all people with the away state.
			*/ if(check == "+status:away"){ return guild.members.filter( val => val.user.presence.status == 'idle' ).array(); }


			/*
				Mention: +status:dnd
				Usage: Get all people with the dnd state.
			*/ if(check == "+status:dnd"){ return guild.members.filter( val => val.user.presence.status == 'dnd' ).array(); }


			/*
				Mention: +ingame
				Usage: Get all people who are playing a game
			*/ if(check == "+ingame"){ return guild.members.filter( val => val.user.presence.activity != null ).array(); }

			/*
				Mention: +invc
				Usage: Get all people who are in a voice channel
			*/ if(check == "+invc"){ return guild.members.filter( val => val.voiceChannelID != null ).array(); }

			/*
				Mention: +owner
				Usage: Get some random member
			*/ if(check == "+owner"){ return [guild.owner] }


			//No special mention matched, so return false so we can move on.
			return false;

		}

		bot.getFilterMentions = function(guild, item){

			//Here is where we check if a special mention was used.
			var check = item;

			/*
				Mention: -all
				Usage: Alternative for @everyone that doesn't ping.
			*/ if(check == "-all"){ return guild.members.filter( val => val.user.bot == false ).array(); }

			/*
				Mention: -bots
				Usage: Gets all bots
			*/ if(check == "-bots"){ return guild.members.filter( val => val.user.bot == true ).array(); }

			/*
				Mention: -online
				Usage: Alternative for @here that doesn't ping.
			*/ if(check == "-online"){ return guild.members.filter( val => val.user.presence.status != 'offline' ).array(); }


			/*
				Mention: -offline
				Usage: all people with the offline status
			*/ if(check == "-offline"){ return guild.members.filter( val => val.user.presence.status == 'offline' ).array(); }

			/*
				Mention: -random
				Usage: Get some random member
			*/ if(check == "-random"){ return [guild.members.random()] }

			/*
				Mention: -active
				Usage: Selects all members who sent a message recently.
			*/ 
			var d = new Date(); 
			
			if(check == "-active"){ return guild.members.filter( val => { 

				if(val.lastMessage != undefined){ 

					if(val.lastMessage.createdAt.getTime() >  d.getTime() - 300000){ 
						return true;
					}else{ 
						return false; 
					} 

				}else{
					return false;
				}

			}).array()};
			
			/*
				Mention: -status:online
				Usage: Get all people with the online state.
			*/ if(check == "-status:online"){ return guild.members.filter( val => val.user.presence.status == 'online' ).array(); }
			

			/*
				Mention: -status:away
				Usage: Get all people with the away state.
			*/ if(check == "-status:away"){ return guild.members.filter( val => val.user.presence.status == 'idle' ).array(); }


			/*
				Mention: -status:dnd
				Usage: Get all people with the dnd state.
			*/ if(check == "-status:dnd"){ return guild.members.filter( val => val.user.presence.status == 'dnd' ).array(); }


			/*
				Mention: -ingame
				Usage: Get all people who are playing a game
			*/ if(check == "-ingame"){ return guild.members.filter( val => val.user.presence.activity != null ).array(); }

			/*
				Mention: -invc
				Usage: Get all people who are in a voice channel
			*/ if(check == "-invc"){ return guild.members.filter( val => val.voiceChannelID != null ).array(); }

			/*
				Mention: -owner
				Usage: Get some random member
			*/ if(check == "-owner"){ return [guild.owner] }
		}


		bot.formatMembers = function( memArray = []){

			var result = "";

			if(memArray.length == 0){ return "Nobody" }
			else if(memArray.length < 20){ return memArray.join(' ') }
			else{ return memArray.length + " Members" }

		}

		

	},

	onEvent: function(event, data){

	
	}

}