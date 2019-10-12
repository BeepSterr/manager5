module.exports = {

    trigger: "summon",
    enabled: true,
    
    category: "Private Rooms",
    description: "Create your private room.",
    permissionLevel: 1,
    example: 'summon',
    
    where: 0,
    
    commandInitialization: function(){

        //alias
        bot.addAlias(this, 'create');
        
    },

    triggerCommand: function (message, args, config){

        var channel = message.channel;
        var guild   = message.guild;
        var g       = guild;

        bot.modules['privateRooms'].summonRoom( message.guild, message.member, message, config)

    }

}