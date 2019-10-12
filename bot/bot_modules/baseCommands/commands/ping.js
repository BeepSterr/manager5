module.exports = {

    trigger: "ping",
	enabled: true,
	
    category: "Utility",
    description: "Test response time for manager.",
    permissionLevel: 1,
    example: "ping",
    
	where: 2,

    commandInitialization: function(){

			bot.addAlias(this, 'test');

    },

    triggerCommand: function (message, args, config){

        message.channel.send('Pong! ( ' + client.ping + "ms )")

    }


}