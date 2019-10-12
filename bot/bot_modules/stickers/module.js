module.exports = {
	
	initializeModule: function(mod){

		chrono = require('chrono-node');	

		//set name
		this.module = mod;
		bot.subscribeEvent(this, 'message')

	
	},

	onEvent: function(event, data){

		//this is where registered events will be received
		if(event == 'message'){

			if(data.guild == undefined){ return; }

			bot.getConfig(data.guild, '', (done, g, conf, pass)=>{

				var config = conf.config;
				if(config.disabledFeatures.includes('stickers')){ return; }

				const regex = /;\S*/gm;
				var hasSent = false;

				while ((m = regex.exec(data.cleanContent)) !== null) {
					// This is necessary to avoid infinite loops with zero-width matches
					if (m.index === regex.lastIndex) {
						regex.lastIndex++;
					}
					
					// The result can be accessed through the `m`-variable.
					m.forEach((match, groupIndex) => {

						if(hasSent == true){ return; }
						hasSent = true;
						
						match = match.substring(1);

						knex.select().from('user_stickers').where( { author: data.member.id, code: match } ).then( stickers =>{

							if(stickers.length != 1){
								return;
							}else{

								var sticker = stickers[0];

								data.channel.send('', {
									"embed": {
									"title": sticker.code,
									"image": {
										"url": cfg.manager.stickerurl + "/" + sticker.sticker + ".png"
									}
									}
								})

							}

						})

					});
				}

			});
		}

	}
		
}