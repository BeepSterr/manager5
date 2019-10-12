try{

    cfg = require('./config.json');
    AutoUpdater = require('auto-updater');
    schedule = require('node-schedule');

}catch(ex){

    console.error(chalk.red('FATAL ERROR:'));
    console.error(chalk.red(' Cannot load config.json'));
    process.exit();

}

// LOAD MODULES
try{

    //temporary require
    chalk               = require('chalk');
	request 			= require('request');

    //Discord.js Base
    Discord             = require("discord.js");
    bodyParser          = require('body-parser')

    //Web API
    express             = require('express')
    app                 = express()
    schedule            = require('node-schedule');

    //Own Packages
    var options = {
        repo        : "DiscordManager/manager-lang",
        branch      : "master",
        packageFile : "package.json",
        localPath   : "./lang"
        
    }

    updater             = require('github-update')(options)

	var knex = require('knex')({
		client: 'mysql',
		connection: {
			host : 		cfg.mysql.hostname,
			user : 		cfg.mysql.username,
			password : 	cfg.mysql.password,
			database : 	cfg.mysql.database
		}
    });

}catch(ex){

    console.error(ex);

    console.error('\x1b[31m' + 'FATAL ERROR:');
    console.error(' Cannot load required bot modules.');
    console.error(' Try running "npm install" and try again.\x1b[0m');
    process.exit();
}


console.log(chalk.cyan("Sharder") + " > " + "Manager Sharding Controller V2.1");
console.log(chalk.cyan("Sharder") + " > " + 'Using discord.js ' + Discord.version);

var stdin = process.openStdin();

schedule.scheduleJob('0 0 * * *', () => { 
    // Auto reboot at midnight
    console.log(chalk.cyan("Sharder") + " > " + "Rebooting all shards!");
    manager.broadcastEval("bot.shutdown();");
})

stdin.addListener("data", function(d) {
    
    var command = d.toString().trim()

    if(command == "reboot"){
        console.log(chalk.cyan("Sharder") + " > " + "Rebooting all shards!");
        manager.broadcastEval("bot.shutdown();");
    }

    if(command == "exit"){

        manager.respawn = true;

        console.log(chalk.cyan("Sharder") + " > " + "Preparing to EXIT.");
        manager.broadcastEval("bot.exit();");
        console.log(chalk.cyan("Sharder") + " > " + "Bot exiting in 10 seconds.");

        setTimeout( ()=> {
            console.log(chalk.cyan("Sharder") + " > " + "Bye!");
            process.exit();
        }, 11000)
        
    }

  });

  require('./internals/web')
  require('./internals/music')

//Check for lang updates
function checkLangUpdate( callb ){

    updater.check( ( error, upToDate ) => {

        //if(error){ throw error; }
    
        if(upToDate){
    
            console.log(chalk.green("Updater") + " > " + 'Localization OK');
            callb( true, false )
        }else{
    
            console.log(chalk.green("Updater") + " > " + 'Localization OLD');
            updater.update( (success, error) => {
                if(!success){ throw error; };
                
                console.log(chalk.green("Updater") + " > " + 'Localization REFRESHED');
                callb( true, true )
            })
    
        }
    
    })

}

function StartApp(){

    manager = new Discord.ShardingManager('./bot.js', {
        totalShards: cfg.discord.shards,
        respawn: true,
        token: cfg.discord.token
    });    

    manager.on('shardCreate', shard => {

        console.log(chalk.cyan("Sharder") + " > " + "Launching shard process (" + shard.id + ")");
        
        shard.on('message', message => {
        
            if(message.type == "log/default"){ console.log(chalk.yellow("Shard " + shard.id)+" > " + message.message); }
        
            if(message.type == "action/reboot"){ manager.broadcastEval("bot.terminating = true; setTimeout(() => { process.exit(); }, 10000)"); }
        
        });
        
    });
        
    
    manager.spawn();

}

checkLangUpdate( (complete, didupdate)=> {
    StartApp();
})

 process.on('SIGTERM', () => {
    console.log('Got SIGTERM. Graceful shutdown start', new Date().toISOString())
    manager.respawn = true;
  })

process.on('SIGTERM', () => {

    if(process.platform == "win32"){
        process.exit();
        return;
    }

    manager.broadcastEval("bot.shutdown();");
    manager.respawn = true;
});
process.on('SIGINT', () => {

    if(process.platform == "win32"){
        process.exit();
        return;
    }

    manager.broadcastEval("bot.shutdown();");
    manager.respawn = true;
});