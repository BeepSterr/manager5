module.exports = {
	
	initializeModule: function(mod){

		//set name
		this.module = mod;
		bot.subscribeEvent(this, 'voiceStateUpdate');

		bot.notificationNames = []
		bot.notificationNames["room"] = 		"Private Room Updates"
		bot.notificationNames["ghostping"] = 	"Ghost Pings"
		bot.notificationNames["joinleave"] = 	"Join/Leaves for Voice Channels."

		bot.emitNotification = function( user, notificationChannel, notificationData){

			if(bot.mutedProfiles.includes(user.id)){

				//The user has muted all notifications for now.
				return false;
				
			}

			bot.getUserProfile(user, (s, userProfile)=>{

				if(s == false){ return false; }

				if( !userProfile.notifySettings.includes( notificationChannel) ){

					//The user is not subscribed to this notification.
					return false;
					
				}

				// We can send the notification now.
				user.send(notificationData)


			})

		}


	},

	onEvent: function(event, data){

		var old = data.old;
		var current = data.neww;

		if(old.voiceChannelID != current.voiceChannelID){

			if(current.voiceChannelID != null && old.voiceChannelID != null){

				var vChannel = client.channels.get(current.voiceChannelID)
				var oChannel = client.channels.get(old.voiceChannelID)

				if(vChannel != undefined && oChannel != undefined){

					bot.onEvent('moveVoice', { guild: current.guild, user: current.user, channel: vChannel, oldChannel: oChannel } );
				
					vChannel.members.array().forEach( member => {
	
						if(member.id == current.id){ return; } // Skip user themselves
						bot.emitNotification( member.user, 'joinleaves', bot.L({ lang: 'en_US' }, 'notifications', 'voiceMemberMoveHere', old.user.tag))
	
					})
					
				}


			}else{

				if(current.voiceChannelID != null){

					var vChannel = client.channels.get(current.voiceChannelID)

					if(vChannel != undefined){

						bot.onEvent('joinVoice', { guild: current.guild, user: current.user, channel: vChannel } );

						vChannel.members.array().forEach( member => {
	
							if(member.id == current.id){ return; } // Skip user themselves
							bot.emitNotification( member.user, 'joinleaves', bot.L({ lang: 'en_US' }, 'notifications', 'voiceMemberJoin', old.user.tag))
	
						})

					}


				}

				if(old.voiceChannelID != null){

					var vChannel = client.channels.get(old.voiceChannelID)
					if(vChannel != undefined){

						bot.onEvent('leaveVoice', { guild: old.guild, user: old.user, channel: vChannel } );

						vChannel.members.array().forEach( member => {
	
							if(member.id == old.id){ return; } // Skip user themselves
							bot.emitNotification( member.user, 'joinleaves', bot.L({ lang: 'en_US' }, 'notifications', 'voiceMemberLeave', old.user.tag))
	
						})

					}


				}
				
			}


		}

	}
	
}