module.exports = {

    trigger: "revoke",
    enabled: true,
    
    category: "Private Rooms",
    description: "Removes your Private Room",
    permissionLevel: 1,
	example: "revoke",
    
    where: 0,
    
    commandInitialization: function(){

    },

    triggerCommand: function (message, args, config){

        var channel = message.channel;
        var guild   = message.guild;
        var g       = guild;

         bot.modules['privateRooms'].revokeRoom( message.member, message.guild, config, message );
        
    }


}