module.exports = {
	
	initializeModule: function(mod){

		//set name
		this.module = mod;
		bot.subscribeEvent(this, 'Interval_1Second');


		bot.GetNamedItemFromStupidAssObject = function( object, name ){

			object.forEach( item => {

				if( item.name == name ){ return item; }

			})
		}


		bot.ScriptLib = {
			triggers: [],
			conditions: [],
			actions: []
		}

		bot.ScriptLib.triggers 		= require('./triggers.js')
		bot.ScriptLib.conditions 	= require('./conditions.js')
		bot.ScriptLib.actions 		= require('./actions.js')

	},

	onEvent: function(event, data){
		
	}
	
}