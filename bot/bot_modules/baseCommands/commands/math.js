module.exports = {

    trigger: "math",
    enabled: true,

    category: "Utility",
    description: "Quickly run maths inside discord, Supports setting and using of variables!",
    permissionLevel: 1,
		example: "math <equation>",
		
		where: 2,

    commandInitialization: function(){
		
		bot.addAlias(this, 'maths');
		bot.addAlias(this, 'calc');
		
		bot.math = require('mathjs');

    },

    triggerCommand: function (message, args, config){
		
		if(bot.cache.mems[message.author.id] == undefined){
			bot.cache.mems[message.author.id] = {};
		}
		
		var expression 	= message.cleanContent.replace( 'maths','');
		expression 		= expression.replace( 'math','');
		expression 		= expression.replace( 'calc','');

		try{
			message.channel.send(" = " + bot.math.eval(expression, bot.cache.mems[message.author.id]));
		}catch(ex){
			message.channel.send(" = " + ex.toString())
		}

    }


}