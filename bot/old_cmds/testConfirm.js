module.exports = {

    trigger: "testconfirm",
    enabled: true,

    category: "debug",
    description: "testing ass",
    permissionLevel: 1,
    example: "testconfirm",
    
    where: 0,

    commandInitialization: function(){

    },

    triggerCommand: function (message, args, config){

        var channel     = message.channel;
        var member      = message.member;
        var guild       = message.guild;

        var found   = bot.collectMembers(message.guild, bot.getArgs(message));     
		
		bot.confirmAction( channel, message.member, "Testing on **" + bot.formatMembers(found) + "**", config, ( code )=> {

            message.channel.send('got response code: ' + code)

        })

    }


}