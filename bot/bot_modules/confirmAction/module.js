module.exports = {

	initializeModule: function(mod){

		//set name
		this.module = mod;

        //subscribe to bot events
		//bot.subscribeEvent(this, 'ready');


		bot.confirmAction = function( channel, target, description, config, callback){

			/*
				responsecode:
					0 - Confirmed & Complete
					1 - Denied by user
					2 - Timed Out

			*/

			var guild = channel.guild
			var timeout = 30 * 1000 // 30 second timeout
			var canEmbed = channel.permissionsFor( guild.me ).has('EMBED_LINKS')
			var title = "Confirmation Required"

			var message = ""
			var messageOptions = {};

			var responded = false;

			if(canEmbed == false){
				message = ":warning: **" + title + "**\n" + description;
			}else{
				messageOptions = {
					"embed": {
					  "title": "<:record:474996451873783818> Confirmation Required",
					  "description": description,
					  "color": 16312092,
					  "footer": {
						"text": "Cancels automatically in 30 seconds. Only " + target.user.tag + " can confirm."
					  },    
					  "thumbnail": {
						"url": "https://awoo.download/zA8pYs.png"
					  }
					}
				  }
			}

			channel.send( message, messageOptions ).then( confirmDialog => {

				confirmDialog.react('👌').then( reaction => {
					confirmDialog.react('⛔')
				})
				

				//so later on we can edit the content to the commands output.
				confirmDialog.setMessage = function( content ){

					confirmDialog.edit('', {
						"embed": {
						  "title": ":pencil: Results",
						  "description": content,
						  "color": 8311585
						}
					})

				}

				var filter = (reaction, user) => (reaction.emoji.name === '👌' || reaction.emoji.name === '⛔') && user.id === target.id
				var react = confirmDialog.createReactionCollector(filter, { max: 2, time: timeout})
				react.on('collect', r => {

					if(responded == false){ 

						responded = true;

						if(r.emoji.name === '👌'){ 

							confirmDialog.edit('', {
								"embed": {
								  "title": ":ok_hand: Action Confirmed",
								  "color": 8311585
								}
							})

							confirmDialog.reactions.removeAll()
							callback( 0, confirmDialog );

						}else if(r.emoji.name === '⛔'){
							
							confirmDialog.edit('', {
								"embed": {
								"title": "⛔ Action Canceled",
								"description": target.user.tag + " clicked cancel.",
								"color": 13632027
								}
							})

							confirmDialog.reactions.removeAll()
							callback( 1, confirmDialog );

						}

					}
					
				})

				react.on('end', collected => {

					if(responded == false){

						responded = true;

							
						confirmDialog.edit('', {
							"embed": {
							"title": "⛔ Action Canceled",
							"description": "30 Seconds have passed.",
							"color": 13632027
							}
						})

						confirmDialog.reactions.removeAll()
						callback( 2, confirmDialog );

					}
					
				});


			})

			
			

		}

	},

	onEvent: function(event, data){

	
	}

}