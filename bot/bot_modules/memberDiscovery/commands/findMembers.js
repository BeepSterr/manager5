module.exports = {

    trigger: "find",
    enabled: true,

    category: "debug",
    description: "This command can be used to test Managers Special Mentions",
    permissionLevel: 1,
	example: "find <members>",
    
    where: 0,
    
    /*
        "Muted",		//0
        "Member",		//1
        "Moderator",	//2
        "Admin",		//3
        "Server Owner",	//4
        "Bot Developer"	//5
    */

    commandInitialization: function(){

        bot.removeDuplicates = function(e,r){for(var n={},o=0,t=e.length;t>o;o++)n[e[o][r]]||(n[e[o][r]]=e[o]);var u=[];for(var c in n)u.push(n[c]);return u}

    },

    triggerCommand: function (message, args, config){
		
		bot.log(message.content);
		bot.log(message.type);

        var args = bot.getArgs(message, config);
        var found = bot.collectMembers(message.guild, args);
			
		var arr = [];
		found.forEach( item => {
			arr.push(item.displayName);
		});

        var matches = arr.join(', ')
		

        if(found.length >= 20){
            bot.uploadText(found, (done, url)=>{
                if(done){   bot.reply(message, bot.L(config, 'shared', 'matchResponseBig', found.length, url)) }
                else{       bot.reply(message, bot.L(config, 'shared', 'matchResponseBig', found.length, '`Failed to upload..`'))}
                
            })
        }else{
            bot.reply(message, matches)
        }

    }


}