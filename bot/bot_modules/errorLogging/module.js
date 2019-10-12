module.exports = {

	initializeModule: function(mod){

		//set name
		this.module = mod;

        //subscribe to bot events
		bot.subscribeEvent(this, 'ready');
		bot.subscribeEvent(this, 'guildCreate');

		bot.logError = function(stack){

			fs.appendFile("./logs/shard"+client.shard.id+"-error.log", stack + "\n", function(err) {
				bot.log(chalk.red('Logged error instance to file: logs/shard' +client.shard.id+ '-errors.log'));
				console.log(stack);
			});

			fs.appendFile("./logs/errors.log" + "\n", stack, function(err) {
				//--
			});


		}


	},

	onEvent: function(event, data){

	}

}