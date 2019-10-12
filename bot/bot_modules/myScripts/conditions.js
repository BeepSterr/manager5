module.exports = [
	
	{
		name: "CondChannelMatch",
		friendlyname: "Match Channel",
		inputs: [ 'Channel' ],
		function: function( vars, input ){

			var item = bot.GetNamedItemFromStupidAssObject( vars, 'channel' )

			if ( item == input ){
				return true;
			}else{
				return false;
			}
		}
	}
	
]