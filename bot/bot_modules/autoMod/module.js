module.exports = {
	
	initializeModule: function(mod){

		//set name
		this.module = mod;
		bot.subscribeEvent(this, 'message');
		bot.subscribeEvent(this, 'messageDelete');
		bot.subscribeEvent(this, 'messageUpdate');
		bot.subscribeEvent(this, 'guildMemberUpdate');
		bot.subscribeEvent(this, 'autoMod');

		this.autoMod = require('./autoMod.js')

		geturls = require('get-urls');
		safeBrowsing = require('safe-browse-url-lookup')({ apiKey: cfg.keys.safeBrowsing });

	},

	onEvent: function(event, data){

		this.autoMod.doIt(event, data, bot, client);

	}
	
}