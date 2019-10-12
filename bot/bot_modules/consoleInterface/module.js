module.exports = {

	initializeModule: function(mod){

		//set name
		this.module = mod;

        //subscribe to bot events
		bot.subscribeEvent(this, 'ready');

		bot.shutdown = function(){

			if(process.platform == "win32"){
				process.exit();
				return;
			}

			if(client.shard.id == 0 && bot.terminating == false){
				client.user.setPresence( { status: 'dnd', activity: { name: 'Rebooting', type: 'PLAYING' } })
			}

			bot.log(chalk.red('!!! BOT SHUTDOWN PREPARING'))
			bot.terminating = true;


			setTimeout(()=>{

				setTimeout( ()=> {

					bot.log(chalk.red('!!! Exiting'))
					client.user.setPresence( { status: 'dnd', activity: { name: 'Rebooting', type: 'PLAYING' } })

					process.exit();

				},1000)

			},20000)

		}

		bot.exit = function(){

			bot.log(chalk.red('Received a exit signal. Allowing 10 seconds for actions to finish.'))
			bot.terminating = true;

			client.user.setPresence( { status: 'dnd', activity: { name: 'Rebooting', type: 'PLAYING' } })


			setTimeout(()=>{
				bot.log(chalk.red('Exiting.'))
				process.exit();
			},10000)
		}

		process.on('SIGTERM', () => {
			bot.shutdown();
		});
		process.on('SIGINT', () => {
			bot.shutdown();
		});

	},

	onEvent: function(event, data){

		if(event == "ready"){

			bot.status = "Online";
			bot.log('OK Connected to Discord as ' + client.user.tag);

			client.user.setPresence( { status: 'online', activity: { name: 'Commands & Mentions', type: 'WATCHING' } })

		}

		if(!client.user.bot){
			bot.selfbot = true;
			bot.log(chalk.yellow('This token belongs to a user account, Activating selfbot mode.'))
		}

		bot.cfg = cfg;


		bot.addCommandCheck( function(message, cfg, result){	
			
			//Prevent selfbots from doing the not smart.
			if(bot.selfbot == true && message.author !== client.user){ result(false); }
			result(true);

		});

		bot.addCommandCheck( function(message, cfg, result){

			// Make sure the message is not from a bot.
			if ( message.author.bot ){ result(false);  }
			result(true);

		});
	}

}