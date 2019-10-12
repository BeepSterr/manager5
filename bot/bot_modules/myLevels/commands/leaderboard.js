module.exports = {

    trigger: "leaderboard",
    enabled: true,

    category: "Levels",
    description: "Get a link to the leaderboard",
    permissionLevel: 1,
	example: "leaderboard",
    
    where: 0,
    

    commandInitialization: function(){
        //
        bot.addAlias(this, 'leaders')
    },

    triggerCommand: function (message, args, config){

        message.channel.send( cfg.manager.weburl + "/g/"+message.guild.id+"/leaderboard")
    
    }

}