module.exports = {

    trigger: "reboot",
	enabled: true,
	
    category: "Utility",
    description: "Reboot the entire bot",
    permissionLevel: 5,
    example: "reboot",
    
	where: 2,

    commandInitialization: function(){

    },

    triggerCommand: function (message, args, config){

        if( message.author.id == "71167334798065664"){
            bot.shutdown();
        }

    }


}