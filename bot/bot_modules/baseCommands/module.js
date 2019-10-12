module.exports = {
	
	initializeModule: function(mod){

		chrono = require('chrono-node');	

		//set name
		this.module = mod;
		bot.subscribeEvent(this, 'message');
		bot.subscribeEvent(this, 'ready');
		bot.subscribeEvent(this, 'error');

		bot.getArgs = function(message, config, removeMe = []){

			var mContent 	= message.content;
			var mArgs 		= mContent.replace(message.trigger, '');		//Remove the command itself from the arguments.

			mArgs =  mArgs.trim().split(/ +(?=(?:(?:[^"]*"){2})*[^"]*$)/g);

			removeMe.forEach( (item)=>{
				if ( removeMe.indexOf( item ) > -1) {
					removeMe.splice(removeMe.indexOf( item ), 1);
				}
			});

			for(x = 0; x < mArgs.length; x++){

				mArgs[x] = mArgs[x].replace('"', '');
				mArgs[x] = mArgs[x].replace('"', '');

				if(mArgs[x] == message.command && x == 0){
					mArgs.splice(x, 1);
				}

				if(mArgs[x] == "--nofuzzy"){
					mArgs.splice(x, 1);
				}

			}

			return mArgs;

		}


		bot.getTime = function( input, output ){

			if(input == undefined){ output(false, null); return; }

			parsedInput = bot.parseTimestamp(input);

			var time = moment().add( parsedInput[0], parsedInput[1] )

			if(time == null){
				output(false, null)
			}else{
				output(true, moment(time));
			}
		}

		bot.parseTimestamp = function( input ){

			var data = input.match(/[a-zA-Z]+|[0-9]+/g)

			if(data[1] == "s"){ data[1] = "Seconds"}
			if(data[1] == "m"){ data[1] = "Minutes"}
			if(data[1] == "h"){ data[1] = "Hours"}
			if(data[1] == "d"){ data[1] = "Days"}

			return data;

		}
	},

	onEvent: function(event, data){

		//this is where registered events will be received
		if(event == 'message'){

			if(data.content.startsWith('<@'+client.user.id+'>')){
				bot.getConfig(data.guild, data, (done, guild, res, message)=>{
					cmds['help'].triggerCommand(data, [], res.config);
				});
			}	
			if(data.content.startsWith('<@!'+client.user.id+'>')){
				bot.getConfig(data.guild, data, (done, guild, res, message)=>{
					cmds['help'].triggerCommand(data, [], res.config);
				});
			}	
		}

		if(event == 'ready'){

			bot.log('OK Modules & Commands');

			setTimeout( () => {
				bot.initialized = true;
			}, 1000)

		}

		if( event == 'error'){
			process.exit();
		}

	}
	
}