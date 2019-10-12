module.exports = {
	
	initializeModule: function(mod){

		//set name
		this.module = mod;
		bot.subscribeEvent(this, 'message');
		bot.subscribeEvent(this, 'ready');

		bot.grantXP	= function( member, guild, xp, override = false ){

			//lets give them a little heads up they just leveled up.
			bot.getConfig(guild, '', (done, g, c, pass)=>{

				if(!done) return;
				var config = c.config;

				if(override == false){
					if(config.levels.enable == false){ return; } // Leveling is disabled!
				}


				knex('guild_member_data').where('identifier', String(guild.id) + String(member.id) ).update({
					xpCurrent: knex.raw('xpCurrent + ' + xp),
					xpPool: knex.raw('xpPool - ' + xp),
					xpTotal: knex.raw('xpTotal + ' + xp),
				}).then( d => {
					
					//We'll check levelup now.
					bot.checkLevelUp( member, guild );

			  	})

			});

		}

		bot.checkLevelUp = function( member, guild ){

			bot.getMemberData( member, guild, (s, profile) =>{

				if(!s) return;

				var xpRequired = bot.getXpForLevel( profile.level )
				
				if(profile.xpCurrent > xpRequired){

					// its :tada: time
					bot.log( member.displayName + " leveled up!")
					knex('guild_member_data').where('identifier', String(guild.id) + String(member.id) ).update({
						level: knex.raw('level + 1'),
						xpCurrent: 0
					}).then( ()=>{

						//lol
						profile.level++

						//lets give them a little heads up they just leveled up.
						bot.getConfig(guild, '', (done, g, c, pass)=>{

							if(!done) return;

							var config = c.config;

							bot.onEvent('levelUp', { guild: guild, member: member, level: profile.level } );
			
							if(config.levels.notify == 0){ return; } // No notification
							if(config.levels.notify == 1){ member.lastMessage.react('🎉') } // Emoji notification
							if(config.levels.notify == 2){ member.lastMessage.channel.send( member.user.tag + " is now level " + (profile.level) ) } // Emoji notification

							// WE should assign any roles for the new level
							config.levels.rewards.forEach ( reward => {

								//if level is high enough, give role
								if(reward.level <= profile.level){
									if(reward.rewardType == "role"){
										member.roles.add( reward.reward );
									}
								}

							})
			
						})

					 })

				}

			})

		}

		bot.getXpForLevel = function( level ){

			if(level > 80){ level = 80 }
			return Math.ceil(500 + (( 1 * level/5) * level)*5)

		}

		bot.progressBar = function( percentage ){

			if(percentage >  99){  return '████████████████████'; }
			if(percentage >= 95){  return '███████████████████░'; }
			if(percentage >= 90){  return '██████████████████░░'; }
			if(percentage >= 85){  return '█████████████████░░░'; }
			if(percentage >= 80){  return '████████████████░░░░'; }
			if(percentage >= 75){  return '███████████████░░░░░'; }
			if(percentage >= 70){  return '██████████████░░░░░░'; }
			if(percentage >= 65){  return '█████████████░░░░░░░'; }
			if(percentage >= 60){  return '████████████░░░░░░░░'; }
			if(percentage >= 55){  return '███████████░░░░░░░░░'; }
			if(percentage >= 50){  return '██████████░░░░░░░░░░'; }
			if(percentage >= 45){  return '█████████░░░░░░░░░░░'; }
			if(percentage >= 40){  return '████████░░░░░░░░░░░░'; }
			if(percentage >= 35){  return '███████░░░░░░░░░░░░░'; }
			if(percentage >= 30){  return '██████░░░░░░░░░░░░░░'; }
			if(percentage >= 25){  return '█████░░░░░░░░░░░░░░░'; }
			if(percentage >= 20){  return '████░░░░░░░░░░░░░░░░'; }
			if(percentage >= 15){  return '███░░░░░░░░░░░░░░░░░'; }
			if(percentage >= 10){  return '██░░░░░░░░░░░░░░░░░░'; }
			if(percentage >= 5){   return '█░░░░░░░░░░░░░░░░░░░'; }
			
			
			return '░░░░░░░░░░░░░░░░░░░░';

		}

	},

	onEvent: function(event, data){

		//this is where registered events will be received
		if(event == 'message'){

			bot.getConfig(data.guild, '', (done, g, c, pass)=>{

				var config = c.config;

				if(!done) return;
				if(config.disabled == 1){ return; }

				//disable bots
				if(data.author == null) return;
				if(data.author.bot == true) return;

				if(data.cleanContent.startsWith(config.prefix)) return;

				// Fetch the senders profile
				bot.getMemberData( data.member, data.guild, (success, profile) => {

					if(profile == undefined){ return; }
					
					
					//We have the profile.
					var xpEarned = data.cleanContent.length * 1
					if(xpEarned > 25) xpEarned = 25;
					if(xpEarned > profile.xpPool) xpEarned = profile.xpPool;

					bot.grantXP( data.member, data.guild, xpEarned );

				})

			})
			
		}

		if(event == 'ready'){


		}

	}
	
}