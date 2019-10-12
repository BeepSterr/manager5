module.exports = {
	
	initializeModule: function(mod){

		//set name
		this.module = mod;
		//bot.subscribeEvent(this, 'Interval_1Second');

	},

	onEvent: function(event, data){

		//Lets fetch all our scheduled actions.
		knex.select().table('guild_planned_events').then( events => {

			//get current time
			var now = moment();

			if(events != undefined){

				events.forEach( item => {

					// get trigger time of event.
					var triggerOn = moment(item.at);

					if(now > triggerOn){

						bot.log('Scheduled event ' + item.scheduleID + ' has passed, Firing!')

						if( item.action == "removerole" ){

							var guild = client.guilds.get(item.guild);

							if(guild == undefined){ return; } //We don't are ready
							if(!guild.available){ return; } // We have an outage! Panic!

							var target = guild.members.get(item.target)
							var role   = guild.roles.find( (role)=>{ return role.name == item.context })

							target.roles.remove( role )
							
							knex('guild_planned_events').where('scheduleID', item.scheduleID).del().then( ()=>{
								bot.log('Event Complete')
							})

						}

					}else{
						// Event has yet to happen...
					}

				})

			}

		})

	}
	
}