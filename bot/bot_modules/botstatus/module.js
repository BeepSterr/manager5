module.exports = {
	
	initializeModule: function(mod){

		//set name
		this.module = mod;

        //subscribe to bot events
		//bot.subscribeEvent(this, 'guildCreate');
		//bot.subscribeEvent(this, 'guildDelete');
		//bot.subscribeEvent(this, 'ready');

	},

	onEvent: function(event, data){

		// prevent me from updating guild stats on my pc accidentally lol
		// remove this if u host on windows :)
		if(process.platform == "win32"){
			return;
		}

		var count = client.guilds.array().length
		var json = { server_count: count, shard_id: client.shard.id, shard_count: client.shard.count };
			
        var options = {
        	url: 'https://bots.discord.pw/api/bots/xxxx/stats',
        	method: 'POST',
        	headers: {
        		'Content-Type': 'application/json',
        		'Authorization': 'xxxx'
        	},
        	body: JSON.stringify(json)
        };

        request(options, function(err, res, body) {
        	if (res && (res.statusCode === 200 || res.statusCode === 201)) {
        		bot.log("bots.discord.pw returned " + res.statusCode);
        	}
        });
		   
           
        //discordbots.org
        var json = { server_count: count, shard_id: client.shard.id, shard_count: client.shard.count };

        var options = {
        	url: 'https://discordbots.org/api/bots/345612130122334209/stats',
        	method: 'POST',
        	headers: {
        		'Content-Type': 'application/json',
        		'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0NTYxMjEzMDEyMjMzNDIwOSIsImJvdCI6dHJ1ZSwiaWF0IjoxNTA3NTY2NDM5fQ.5qkDwsg8m1-fZHPtWgvjYX6tlDzZsZFNM_dui3BSOFk'
        	},
        	body: JSON.stringify(json)
        };
        
        request(options, function(err, res, body) {
        	if (res && (res.statusCode === 200 || res.statusCode === 201)) {
        		bot.log("discordbots.org returned " + res.statusCode);
        	}
		});  
		         
        // discordbotlist.com
        var json = { guilds: count };

        var options = {
        	url: 'https://discordbotlist.com/api/bots/345612130122334209/stats',
        	method: 'POST',
        	headers: {
        		'Content-Type': 'application/json',
        		'Authorization': 'b36ae254b73c374fe7df35c5a72475df5d49aa80c6f487edb714020bf8bead51'
        	},
        	body: JSON.stringify(json)
        };
        
        request(options, function(err, res, body) {
        	if (res && (res.statusCode === 200 || res.statusCode === 201)) {
        		bot.log("discordbots.org returned " + res.statusCode);
        	}
        });

	}

}