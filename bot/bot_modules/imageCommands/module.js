module.exports = {
	
	initializeModule: function(mod){

		bot.cache.lastImage = [];
		Jimp = require("jimp");

		//set name
		this.module = mod;
		bot.subscribeEvent(this, 'message');

		
	},

	onEvent: function(event, data){

		var message = data;

		if(message.author.bot){ return; }
		var author = message.author;

		if(message.attachments.first() != undefined){
			bot.cache.lastImage[message.author.id] = message.attachments.first().url;
			//bot.log(bot.cache.lastImage[message.author.id]);
		}

	}
	
}