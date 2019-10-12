module.exports = {
	
	initializeModule: function(mod){

		//set name
		this.module = mod;
		bot.subscribeEvent(this, 'message');
		bot.subscribeEvent(this, 'ready');

		bot.getMemberData = function ( member, guild, callback ){

			if(member.user.bot == true){ callback(false, undefined) }

			knex.select().from('guild_member_data').where('identifier', String(guild.id) + String(member.id) ).then(function(data){

				if(typeof(data[0]) != 'object'){

					//We need to generate this members dataset.
					bot.createMemberData( member, guild, (success, dataset)=>{
						//
					})

				}

				callback( true, data[0] );

			}).catch( ex => {
				console.log(ex);
				callback( false, ex );
			});
			
		}

		bot.createMemberData = function( member, guild, callback ){
			
			//We're assuming the profile doesn't exist here as this is not meant to be called outside getMemberData.
			knex('guild_member_data').insert({

				member: member.id,
				guild: guild.id,
				identifier: String(guild.id) + String(member.id)

			}).then( data => {
				callback( false, data )
			}).catch(ex => {
				callback( false, ex );
			})

		}



		bot.getUserProfile = function ( user, callback ){

			var t 	= 	Math.floor(Date.now() / 1000);

			// Here we get the users profile, Shared between servers.
			if(user.bot == true){ callback(false, undefined); return; }

			if(bot.cache.userProfiles[user.id] != undefined){

				if(bot.cache.userProfiles[user.id].expires > t){
					callback(true, bot.cache.userProfiles[user.id].profile);
					return;
				}
			}

			knex.select().from('user_profiles').where('user', String(user.id) ).then(function(data){

				if(typeof(data[0]) != 'object'){

					//We need to generate this members dataset.
					bot.createUserData( user, (success, dataset)=>{
						callback(true, dataset);
						return;
					})

				}else{

					data[0].notifySettings = JSON.parse(data[0].notifySettings)

					bot.cache.userProfiles[user.id] = {
						"profile": data[0],
						"expires": t+30
					}
	
					//knex('user_profiles')
					//.where('user', String(user.id))
					//.update({
					//	known_name: user.tag.replace(/[^a-zA-Z0-9 ]/g, '')
					//}).then( ()=> {
					//	///
					//})
	
					callback( true, data[0] );
					
				}


			}).catch( ex => {
				console.log(ex);
				callback( false, ex );
			});
			
		}

		bot.createUserData = function( user, callback ){

			var defaults = {				
				user: user.id,
				known_name: user.tag.replace(/[^a-zA-Z0-9 ]/g, ''),
				profile_background: 'default',
				bio: '',
				notifySettings: '["room", "ghostping"]',
				currency: 0
			}

			//We're assuming the profile doesn't exist here as this is not meant to be called outside getUserProfile.
			knex('user_profiles').insert(defaults).then( data => {
				callback( false, defaults )
			}).catch(ex => {
				callback( false, ex );
			})

		}

	},

	onEvent: function(event, data){

		if(event == "message"){
			bot.getUserProfile( data.author, ()=>{ return; })
		}

	}
	
}