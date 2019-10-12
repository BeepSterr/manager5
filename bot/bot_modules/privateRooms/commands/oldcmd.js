module.exports = {

    trigger: "add",
    enabled: true,
    
    category: "Private Rooms",
    description: "Old Command.",
    permissionLevel: 1,
	example: "add / remove / block",
    
    where: 0,
    
    commandInitialization: function(){

        //alias
        bot.addAlias(this, 'remove');
        bot.addAlias(this, 'block');
        bot.addAlias(this, 'add');

        bot.removeDuplicates = function(e,r){for(var n={},o=0,t=e.length;t>o;o++)n[e[o][r]]||(n[e[o][r]]=e[o]);var u=[];for(var c in n)u.push(n[c]);return u}

    },

    triggerCommand: function (message, args, config){

        message.channel.send("This command has been removed, Try the new `" + config.prefix + "room`")
        
    }


}