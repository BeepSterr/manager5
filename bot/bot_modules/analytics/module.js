module.exports = {
	
	initializeModule: function(mod){

		//set name
		this.module = mod;
		bot.subscribeEvent(this, 'message');				// MESSAGE analytic
		bot.subscribeEvent(this, 'guildMemberUpdate');		// NICKNAME analytic
		bot.subscribeEvent(this, 'guildMemberAdd');			// JOIN analytic
		bot.subscribeEvent(this, 'guildMemberRemove');		// LEAVE analytic

		
	},

	onEvent: function(event, data){
	    
	    /*
		try{

			var dolog = false;
			var target = "NONE";
			var context = "";

			if(event != 'guildMemberUpdate'){
				var guild = data.guild;
			}else{
				var guild = data.neww.guild;
			}

			bot.getConfig(guild, '', (done, g, cee, message)=>{

				if(!done){ return; }
				var config = cee.config;
				
				if(true){
				
					if(event == "message"){
						
						var message  	= data;
						var guild    	= message.guild;

						var type 		= "MESSAGE_SENT";
						var context  	= data.channel.id
						var target  	= data.author.id;

						var dolog	 	= true;
							
					}
					
					if(event == "guildMemberAdd"){
						
						var member  	= data;
						var guild    	= member.guild;
							
						var type 		= "MEMBER_JOIN";
						var target  	= member.id
						var context  	= guild.members.array().length;

						var dolog	 	= true;
							
					}
								
					if(event == "guildMemberRemove"){
						
						var member  	= data;
						var guild    	= member.guild;
							
						var type 		= "MEMBER_LEAVE";
						var target  	= member.id
						var context  	= guild.members.array().length;
							
						var dolog	 	= true;
							
					}
					
					if(event == "guildMemberUpdate"){
							
						var old			= data.old;
						var now			= data.neww;
			
						if(old.displayName != now.displayName){

							var guild    	= old.guild;
							
							var type 		= "NICKNAME";
							var target  	= now.id
							var context  	= now.displayName;

							var dolog	 	= true;
							
						}
					}

					if(dolog){
						knex('guild_events').insert({

							guild:			guild.id,
							eventType: 		type,
							target:			target,
							context:		String(context).replace(/[^a-zA-Z0-9 ]/g, '')

						}).then((data)=>{
							//--
						}).catch(ex => {
							bot.logError(ex);
						});
					}	

				}

			});
						
		}catch(ex){
            //message.channel.send(bot.L(config, 'genericMessages', 'errorUnknown'))
            bot.logError(ex)
        }	*/
	}
	
}