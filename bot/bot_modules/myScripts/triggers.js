module.exports = [
	
	{
		name: "Interval_1Minute",
		friendlyname: "1 Minute Interval",
		function: function( data ){
			return { conditions: [], variables: [] };
		}
	},
	{
		name: "guildMemberAdd",
		friendlyname: "New Member",
		function: function( data ){
			return { conditions: ['CondMemberAge'], variables: [
				{ var: "Member", data: data, pattern: "{member}"},
			] };
		}
	},
	{
		name: "message",
		friendlyname: "Message Sent",
		function: function( data ){
			return { conditions: ['CondChannelMatch', 'CondMemberMatch', 'CondStringMatch', 'CondStringStartsWith'], variables: [
				{ var: "Member", data: data.member, pattern: "{member}"},
				{ var: "Content", data: data.cleanContent, pattern: "{message}"},
				{ var: "Channel", data: data.cleanContent, pattern: "{channel}"},
			] };
		}
	},
	
]