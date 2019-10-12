module.exports = {
	
	initializeModule: function(mod){

		ipReg = require('ip-port-regex/lib/node7')
		SourceQuery = require('sourcequery');

		//set name
		this.module = mod;
		bot.subscribeEvent(this, 'message');

	
	},

	onEvent: function(event, data){

		//this is where registered events will be received
		if(event == 'message'){

			bot.getConfig(data.guild, '', (done, g, conf, pass)=>{

				var config = conf.config;
				if(config.disabledFeatures.includes('embedsP')){ return; }


				if(data.cleanContent.includes('steam://connect/')){

					var constring = data.cleanContent.replace('steam://connect/', '')
					var condetails = constring.match(ipReg())

					if(condetails != null){


						var server = condetails[0];
						var ip	   = server.split(':')[0]
						var port   = server.split(':')[1]

						var sq = new SourceQuery(1000); // 1000ms timeout
						sq.open(ip, port);

						sq.getInfo(function(err, info){

							if(!err){

								var game = "tf2"

								if(info.folder == "tf"){ game = "tf2" }
								if(info.folder == "garrysmod"){ game = "garrysmod" }
								if(info.folder == "csgo"){ game = "csgo" }

								data.channel.send('', { "embed": {

									"title": info.name,
									"description": "There are **" + info.players + "** out of **" + info.maxplayers + "** playing on **" + info.map + "**.",
									"url": cfg.manager.weburl + "/api/steam/" + ip + ":" + port,    
									"thumbnail": {
										"url": "https://image.gametracker.com/images/maps/160x120/"+game+"/"+info.map+".jpg"
									},    
									"footer": {
									"text": info.keywords
									},
									
								}})
			
							}


						});
					}
				}

			});
		}

	}
	
}