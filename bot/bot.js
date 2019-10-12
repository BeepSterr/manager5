// LOAD MODULES
try{
    
    //Discord.js Base
    Discord     = require("discord.js");
    client      = new Discord.Client( {
		messageCacheMaxSize: 100,
		disableEveryone: true,
		disabledEvents: ['TYPING_START']
	} );
    
    //all of the yes
    chalk       = require('chalk');
    fs          = require('fs');
    request     = require('request');
    mysql       = require('mysql');
    path        = require('path')
    store       = require('persistent-localstore')( { filePath: './temp/temp-data' + client.shard.id + '.json' } );

    cmds = {};
    langs = {};
    modules = {};
    bot = {};
    bot.status = "Starting";
    bot.cache = {};
    bot.cache.config=[];
    bot.cache.userProfiles=[];
    bot.mutedProfiles=[];
    bot.cache.invites=[];
    bot.cache.mems=[];
    bot.stats = { uptime: 0, commandsExecuted: 0}
    bot.selfbot = false;
    bot.terminating = false;

    bot.initialized = false;

    util = require('util');
    bot.dashify = require('dashify');

    bot.cvert = function( hex ) {

        return parseInt(hex.replace('#', '0x'))
    }

    moment = require('moment');
    snowflake = require('node-snowflake').Snowflake;
    stripAnsi = require('strip-ansi');

    sanitizeHtml = require('sanitize-html');

    var startTime = moment()

    snowflake.init({worker_id : client.shard.id, data_center_id : 1, sequence : 0});


    lastest_log = fs.createWriteStream('./logs/shard'+client.shard.id+'-latest.log', { flags: 'w' });
    //persistent_log = fs.createWriteStream('./logs/shard'+client.shard.id+'-'+startTime.format('DD-MM-YYYY_HH-MM-SS')+'.log', { flags: 'w' });


}catch(ex){
    
    console.error(ex);
    
    console.error('\x1b[31m' + 'FATAL ERROR:');
    console.error(' Cannot load required bot modules.');
    console.error(' Try running "npm install" and try again.\x1b[0m');
    process.exit();
}

try{
    
    cfg = require('./config.json');

	knex = require('knex')({
		client: 'mysql',
		connection: {
			host : 		cfg.mysql.hostname,
			user : 		cfg.mysql.username,
			password : 	cfg.mysql.password,
			database : 	cfg.mysql.database
        },
        pool: { min: 2, max: 15 }
    });
    
}catch(ex){
    
    console.error(chalk.red('FATAL ERROR:'));
    console.error(chalk.red(' Cannot load config.json'));
    process.exit();
    
}

bot.log = function(text) {

    // Append to logfile
    lastest_log.write(stripAnsi(util.format(text)) + '\n');
    //persistent_log.write(stripAnsi(util.format(text)) + '\n');

    client.shard.send({type:"log/default", message: text })
}

bot.paniclog = function(type, text){

    if(type == "error"){
        client.shard.send({type:"dlog/error", message: text, author: null })
        return;
    }

    if(type == "feedback"){
        client.shard.send({type:"dlog/feedback", message: text, author: null })
        return;
    }

}
bot.formattime = function(input){ return input };
bot.setStatus = function(text) {

    client.shard.send({
        type:"status/update", 
        guilds: client.guilds.array().length, 
        channels: client.channels.array().length, 
        members: client.users.array().length, 
        cmds: bot.stats.commandsExecuted, 
        uptime: bot.formattime(bot.stats.uptime),
        status: text 
    })

    bot.status = text;
}
bot.setStatus("Starting...");

bot.message = function(type, message){
    if(type == 'in'){ client.shard.send({type:"log/incmsg", message: message.cleanContent }) }
}

bot.log('SHARD ' + client.shard.id + ' INITIALIZING');
// bot.getClient = function(){ return client }

bot.eventListeners = {}
bot.subscribeEvent = function(mod, event){
    if(bot.eventListeners[event] == undefined){
        bot.eventListeners[event] = [];
    }

    bot.eventListeners[event].push(mod.module);

};

bot.onEvent = function(event, data){

    
    if(event != '*'){
        bot.onEvent('*', data);
    }

    if(bot.eventListeners[event] == undefined){
        bot.eventListeners[event] = [];
    }

    bot.eventListeners[event].forEach(listener =>{
        modules[listener].onEvent(event, data);
    })

};

bot.L = function(config, section, value, data = null, data2 = null, data3 = null, data4 = null, data5 = null, data6 = null, data7 = null){

    var usecfg = config

    if(langs[config.lang] == undefined){ usecfg.lang = 'en_US' }
	
	if(langs[config.lang][section] == undefined){
        result = "Error! This string has not been properly translated, Please report this issue."
    }

    var result = langs[usecfg.lang][section][value]

    if(result == undefined){ 
        result = langs['en_US'][section][value] 
    }
	
    var langstring = result.replace("{$1}", data);
    langstring = langstring.replace("{$2}", data2);
    langstring = langstring.replace("{$3}", data3);
    langstring = langstring.replace("{$4}", data4);
    langstring = langstring.replace("{$5}", data5);
    langstring = langstring.replace("{$6}", data6);
    langstring = langstring.replace("{$7}", data7);

    langstring = langstring.replace(":manager_loading:", '<a:manager_loading:409298228954136577>');
    langstring = langstring.replace(":manager:", '<:manager:409296257643970561>');

    return langstring;

}

bot.commandChecks = [];
bot.addCommandCheck = function(func){

    if(func == undefined){
        bot.log(chalk.orange('Adding command check failed, No function supplied!'))
        return;
    }

    bot.commandChecks.push(func);

};

bot.handleCommandChecks = function(message, cfg, cb){

	//create copy of checks to work with.
    var checks = bot.commandChecks;
    var i = 0;

	var doLoop = function(checkFailed, i){
        if(checkFailed == true){ cb(false, message, cfg); return; }
		if(i == checks.length){ cb(true, message, cfg); return; }

        try{
            checks[i](message, cfg, (result)=>{
                checkFailed = !result;
                i++
                doLoop(checkFailed, i);
            })
        }catch(ex){
            cb(false, message, cfg); return;
        }


	}

	doLoop(false, i);

};

bot.aliases = [];
bot.addAlias = function(command, alias){

    bot.aliases[alias] = command.trigger;
    //bot.log('Alias "'+alias+'" for command "' + command.trigger + '" added')

};

bot.reply = function(message, content, embed = {}){ message.channel.send(content, embed); }


//load all language files
bot.loadLang = function(){

    //Empty out our guild.langs
    bot.langlist = [];

	fs.readdir(__dirname + '/lang/Language', (err, files) => {
		files.forEach(file => {
			try{

				tempJS  = fs.readFileSync(__dirname + '/lang/Language/' + file);
				temp    = JSON.parse(tempJS);

				if(temp.lang_version == cfg.discord.lang_ver){
                    langs[temp.lang_short] = temp
                   
                    // Add language to the list.
                    bot.langlist.push({
                        id: temp.lang_short,
						name: temp.lang_name
                    })
                    
				}else{
					bot.log(chalk.red('Skipped Language ' + file + " (Incorrect Version)"));
				}


			}catch(ex){
				bot.log(chalk.red('Language ' + file + " failed: ") + ex);
			}
		});
	})
}

bot.loadLang();

// Config & Node-Modules loaded
// Lets start identifying bot modules.
var botModules = p => fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory()) //thx @pravdomil
var modulesInit = botModules(__dirname + '/bot_modules/');

modulesInit.forEach(mod =>{

    //module 'mod' is about to be loaded.
    modules[mod] = require(__dirname + '/bot_modules/' + mod + '/module.js');
    modules[mod].initializeModule(mod);

    //now lets get the commands from said module
    fs.readdir(__dirname + '/bot_modules/' + mod + '/commands/', (err, files) => {
        files.forEach(file => {
            try{

                if(file != ".gitignore"){

                    temp = require(__dirname + '/bot_modules/' + mod + '/commands/' + file);
                    cmds[temp.trigger] = temp
                    cmds[temp.trigger].module = mod;
                    cmds[temp.trigger].commandInitialization(temp.trigger);
                                    
                }
                
            }catch(ex){
                bot.log(chalk.red('Loading Command ' + temp + " failed: ") + ex);
                console.log(ex);
            }



        });
    })

})

bot.modules = modules;
bot.commands = cmds;

bot.onEvent('prelogin', null);

// if someone reads this please dont yell at me for this i didn't know better ok?
client.on('message',                            evnt            => { bot.onEvent('message', evnt);});
client.on('messageDelete',                      evnt            => { bot.onEvent('messageDelete', evnt);});
client.on('messageUpdate',                      (evnt, newm)            => { bot.onEvent('messageUpdate', {old: evnt, neww: newm});});

client.on('presenceUpdate',                     (evnt, newm)            => { bot.onEvent('presenceUpdate', {evnt, newm});});
client.on('userUpdate',                      	(evnt, newm)            => { bot.onEvent('userUpdate', {evnt, newm});});
client.on('warn',                      			evnt            => { bot.onEvent('warn', evnt);});

client.on('channelCreate',                      evnt            => { bot.onEvent('channelCreate', evnt);});
client.on('channelDelete',                      evnt            => { bot.onEvent('channelDelete', evnt);});
client.on('channelPinsUpdate',                  (channel, time)    => { bot.onEvent('channelPinsUpdate', {channel, time});});
client.on('channelUpdate',                      (old, neww)     => { bot.onEvent('channelUpdate', {old, neww});});

client.on('clientUserGuildSettingsUpdate',      evnt            => { bot.onEvent('clientUserGuildSettingsUpdate', evnt);});
client.on('clientUserSettingsUpdate',           evnt            => { bot.onEvent('clientUserSettingsUpdate', evnt);});

client.on('emojiCreate',                        evnt            => { bot.onEvent('emojiCreate', evnt);});
client.on('emojiDelete',                        evnt            => { bot.onEvent('emojiDelete', evnt);});
client.on('emojiUpdate',                        (old, neww)     => { bot.onEvent('emojiUpdate', {old: old, neww: neww});});

client.on('roleCreate',                         evnt            => { bot.onEvent('roleCreate', evnt);});
client.on('roleDelete',                         evnt            => { bot.onEvent('roleDelete', evnt);});
client.on('roleUpdate',                         (old, neww)      => { bot.onEvent('roleUpdate', {old: old, neww: neww});});

client.on('messageReactionAdd',                 (msg, usr)      => { bot.onEvent('messageReactionAdd', {msg, usr});});
client.on('messageReactionRemove',              (msg, usr)      => { bot.onEvent('messageReactionRemove', {msg, usr});});
client.on('messageReactionRemoveAll',           (msg, usr)      => { bot.onEvent('messageReactionRemoveAll', {msg, usr});});

client.on('error',                              evnt            => { bot.onEvent('error', evnt);});
client.on('disconnect',                         evnt            => { bot.onEvent('disconnect', evnt);});
client.on('ready',                              ()              => { bot.onEvent('ready', null); });

client.on('guildBanAdd',                        (evnt, user)    => { bot.onEvent('guildBanAdd', {evnt, user});});
client.on('guildBanRemove',                     (evnt, user)    => { bot.onEvent('guildBanRemove', {evnt, user});});

client.on('guildMemberAdd',                     evnt   			=> { bot.onEvent('guildMemberAdd', evnt);});
client.on('guildMemberRemove',                  evnt   			=> { bot.onEvent('guildMemberRemove', evnt);});
client.on('guildMemberUpdate',                  (old, neww)   	=> { bot.onEvent('guildMemberUpdate', {old, neww});});

client.on('guildCreate',                        (evnt)          => { bot.onEvent('guildCreate', evnt);});
client.on('guildDelete',                        (evnt)          => { bot.onEvent('guildDelete', evnt);});
client.on('guildUpdate',                        (old, neww)     => { bot.onEvent('guildUpdate', {old, neww});});
client.on('voiceStateUpdate',                   (old, neww)     => { bot.onEvent('voiceStateUpdate', {old, neww});});

//dm command processing
client.on('message', msg => {

    if(msg.channel.type != 'dm'){ return; }

    msg.cmds = cmds;

    //Handle command checks
	bot.handleCommandChecks(msg, cfg, (checkResult, message, cfg)=>{

        var config = {
            prefix: 'm!',
            lang: 'en_US',
            disabledCommands: []
        }

        var prefix      = config.prefix;

        //remove prefix from string because arguments
        message.content = message.content.replace(prefix, '');
        message.cleanContent = message.cleanContent.replace(prefix, '');

        //create arguments (Invalid)
        message.arguments = bot.getArgs(message, config, []);
        message.command = message.arguments[0];

        //check if command exists
        if(typeof message.cmds[message.arguments[0]] == 'object'){

            try{

                //Make sure only DM & Shared commands run.
                if(cmds[message.arguments[0]].where == 0){
                    return false; // Exit the command processor because this command is DM only.
                }

                //create arguments (Valid)
                message.args = bot.getArgs(message, config, [message.arguments[0]]);

                //Direct Command
                message.trigger = message.arguments[0];
                cmds[message.arguments[0]].triggerCommand(message, message.args, config);
                bot.log('Executed command ' + message.arguments[0] + ' for user ' + message.author.tag);
                bot.stats.commandsExecuted++;

                knex('stats').where('sae', 1 ).update({
                    commands: knex.raw('commands + 1'),
                }).then( d => { })

                return;
                    
            }catch(ex){

                bot.log(chalk.red('DMCommandExecution returned an error!'));
                message.channel.send(bot.L(config, 'genericMessages', 'errorUnknown'))
                bot.logError(ex.stack);
                
            }

        }

        //check if alias exists
        if(typeof bot.aliases[message.arguments[0]] == 'string'){

            //run alias
            try{

                //Make sure only DM & Shared commands run.
                if(cmds[bot.aliases[message.arguments[0]]].where == 0 ){
                    return false; // Exit the command processor because this command is DM only.
                }

                //create arguments (Valid)
                message.args = bot.getArgs(message, config, [message.arguments[0]]);
                
                message.trigger = message.arguments[0];
                cmds[bot.aliases[message.arguments[0]]].triggerCommand(message, message.args, config);
                bot.log('Executed aliased command ' + message.arguments[0] + ' for user ' + message.author.tag);
                bot.stats.commandsExecuted++;

                knex('stats').where('sae', 1 ).update({
                    commands: knex.raw('commands + 1'),
                }).then( d => { })

                return;
                    
            }catch(ex){

                bot.log(chalk.red('DMAliasExecution returned an error!'));
                message.channel.send(bot.L(config, 'genericMessages', 'errorUnknown'))
                bot.logError(ex.stack);

            }

        }

    }); 

});

//server command processing
client.on('message', msg => {

    if( msg.channel.type != 'text' ){ return; }
    if( !msg.channel.permissionsFor( msg.guild.me ).has('SEND_MESSAGES') ){ return; }

    msg.cmds = cmds;

    //Handle command checks
	bot.handleCommandChecks(msg, cfg, (checkResult, message, cfg)=>{
        try{
                var cmds = message.cmds

                if(message.channel.type == "text"){
                    var g    = message.guild.id
                }else{
                    var g    = message.channel.id
                }

                if(!checkResult){ return; }

                bot.getConfig(message.guild, '', (done, g, conf, pass)=>{
                    
                    var config  = conf.config

                    if(config.disabled == 1){ return; }

                    if(bot.terminating == true){

                        // Bot is shutting down, Better no do anything new right now.
                        message.channel.send(bot.L(config, 'genericMessages', 'errorBotUnavailable'))
                        return;

                    }

                    //get prefix
                    var prefix      = config.prefix;

                    //remove prefix from string because arguments
                    message.content = message.content.replace(prefix, '');
                    message.cleanContent = message.cleanContent.replace(prefix, '');

                    //create arguments (Invalid)
                    message.arguments = bot.getArgs(message, config, []);
                    message.command = message.arguments[0];

                    //load the banned command list
                    var bcmds 	      = JSON.parse(config.disabledCommands)
                
                    //check if command exists
                    if(typeof message.cmds[message.arguments[0]] == 'object'){

                        try{
                            
                            if(bcmds.includes(message.arguments[0])){
                                return false; // Exit the command processor because this command was blocked via config.
                            }

                            //Make sure only Server & Shared commands run.
                            if( cmds[message.arguments[0]].where == 1 ){
                                return false; // Exit the command processor because this command is DM only.
                            }
                            //create arguments (Valid)
                            message.args = bot.getArgs(message, config, [message.arguments[0]]);

                            //Direct Command
                            message.trigger = message.arguments[0];
                            cmds[message.arguments[0]].triggerCommand(message, message.args, config);
                            bot.log('Executed command ' + message.arguments[0] + ' for user ' + message.author.tag);
                            bot.stats.commandsExecuted++;

                            knex('stats').where('sae', 1 ).update({
                                commands: knex.raw('commands + 1'),
                            }).then( d => { })

                            return;
                                
                        }catch(ex){

                            bot.log(chalk.red('CommandExecution returned an error!'));
                            message.channel.send(bot.L(config, 'genericMessages', 'errorUnknown'))
                            bot.logError(ex.stack);
                            
                        }

                    }
                    
                    //check if alias exists
                    if(typeof bot.aliases[message.arguments[0]] == 'string'){

                        //run alias
                        try{

                            if(bcmds.includes(bot.aliases[message.arguments[0]])){
                                return false; // Exit the command processor because this command was blocked via config.
                            }

                            //Make sure only Server & Shared commands run.
                            if(cmds[bot.aliases[message.arguments[0]]].where == 1 ){
                                return false; // Exit the command processor because this command is DM only.
                            }


                            //create arguments (Valid)
                            message.args = bot.getArgs(message, config, [message.arguments[0]]);
                            
                            message.trigger = message.arguments[0];
                            cmds[bot.aliases[message.arguments[0]]].triggerCommand(message, message.args, config);
                            bot.log('Executed aliased command ' + message.arguments[0] + ' for user ' + message.author.tag);
                            bot.stats.commandsExecuted++;

                            knex('stats').where('sae', 1 ).update({
                                commands: knex.raw('commands + 1'),
                            }).then( d => { })

                            return;
                                
                        }catch(ex){

                            bot.log(chalk.red('AliasExecution returned an error!'));
                            message.channel.send(bot.L(config, 'genericMessages', 'errorUnknown'))
                            bot.logError(ex.stack);

                        }

                    }

                });

        }catch(ex){

            bot.log(chalk.red('CommandResolver returned an error!'));
            bot.logError(ex.stack);

        }

	})


});
process.on('uncaughtException', function(error) {

    bot.log(chalk.red("Shard going down due to an error!"));
    bot.log(chalk.red(error.message));
    bot.logError(error.stack);

    setTimeout(()=>{
        process.exit(1);
    },1000)

});

bot.formattime = function(time){
    if(time < 60){
        return time + " Seconds"
    }

    if(time < 3600){
        return Math.round(time/60) + " Minutes"
    }

    return Math.round(time/60/60) + " Hours"
}

bot.getString = function( l, a){

    if(l == "verificationLevel"){
        if(a == 0){ return "None"; }
        else if(a == 1){ return "Low"; }
        else if(a == 2){ return "Medium"; }
        else if(a == 3){ return "High ((╯°□°）╯︵ ┻━┻)"; }
        else if(a == 4){ return "Extreme (┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻)"; }
        else { return "Unknown verificationLevel ("+ a +")" }
    }

    if(l == "contentFilter"){
        if(a == 0){ return "Don't scan any messages."; }
        else if(a == 1){ return "Scan Messages from members without a role."; }
        else if(a == 2){ return "Scan messages sent by all members."; }
        else { return "Unknown contentFilter ("+ a +")" }
    }

}

setInterval(()=>{
    bot.stats.uptime++;
    bot.setStatus(bot.status);
},1000)

bot.getChannel = function(input, guild){

	var ch = guild.channels.find( (item)=> { try{ return item.name.toLowerCase() === input.toLowerCase() }catch(ex){ return null }});
	if( ch != null && typeof ch != undefined) { return ch }


    var ch = guild.channels.get(input);
    if(typeof ch != null && typeof ch != undefined){ return ch; }

    return input;

}
knex('guild_settings').select().then( data =>{
    bot.log('OK Connected to MySQL')
}).catch(err => {
    bot.log(chalk.red('NOTOK Connecting to MySQL failed!!!'));
    bot.shutdown();
});

bot.HighFirst = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

setTimeout( ()=>{
    client.options.disabledEvents = ['TYPING_START']
    client.login(cfg.discord.token);
}, 1000)


setInterval( ()=>{
    bot.onEvent('Interval_1Second', null);
},1000)

setInterval( ()=>{
    bot.onEvent('Interval_10Seconds', null);
},10000)

setInterval( ()=>{
    bot.onEvent('Interval_30Seconds', null);
},30000)

setInterval( ()=>{
    bot.onEvent('Interval_1Minute', null);
},60000)

setInterval( ()=>{
    bot.onEvent('Interval_5Minutes', null);
},60000*5)

setInterval( ()=>{
    bot.onEvent('Interval_10Minutes', null);
},60000*10)

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

bot.escapeHtml = function(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }

 Array.prototype.diff = function (arr) {

    // Merge the arrays
    var mergedArr = this.concat(arr);

    // Get the elements which are unique in the array
    // Return the diff array
    return mergedArr.filter(function (e) {
        // Check if the element is appearing only once
        return mergedArr.indexOf(e) === mergedArr.lastIndexOf(e);
    });
}

bot.updateInvites = function( guild, cb ){

    var data = [];
    
    guild.fetchInvites().then( invites => {

        var invitedata = invites.array();

         for (i = 0; i < invitedata.length; i++) { 

            data.push({
                code: invitedata[i].code,
                author: invitedata[i].inviter.id,
                 uses: invitedata[i].uses
            })
            
        }

        cb(data);

    }).catch(ex => {
        cb(false, ex);
    })

}

process.on('unhandledRejection', (reason, p) => {
    bot.log(chalk.red( 'Promise Error: ' + reason ))
});

client.on('warn', info => {
    bot.log( 'WARN: ' + info )
});

client.on('error', info => {
    bot.log( 'ERROR: ' + info )
});
