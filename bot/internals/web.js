var accesskey = "NM3_wcA#cef3";
function checkKey(req, res, next) {

    if(req.get('x-manager-auth') == accesskey){ 
        return next();
    }else{
        return next(); //res.json({ error: 403, details: "This connection is reserved for access via the panel only."});
    }

    

}

function returnResolve(resolve){

    var ans = [];

    for(var i=0; i < resolve.length; i++) {
        for(var a=0; a < resolve[i].length; a++) {
            ans.push(resolve[i][a])
        }
    }

    return ans;

}
function returnResolveUser(resolve){

    var ans = [];

    for(var i=0; i < resolve.length; i++) {
        if(resolve[i] != false){ ans.push( resolve[i] )} 
    }

    return ans;

}

app.get('/user/:id/getServersAdmin',checkKey,  function(req, res) {
    manager.broadcastEval("bot.fetchAdminGuilds('" + req.params.id + "'); ").then((resolve)=>{
        res.json(returnResolve(resolve));
    });
});

app.get('/user/:u/canEdit/:g',checkKey,  function(req, res) {
    manager.broadcastEval("bot.canEdit('" + req.params.u + "', '" + req.params.g + "'); ").then((resolve)=>{
        res.json(resolve);
    });
});


app.get('/user/:id/getServersAdmin',checkKey,  function(req, res) {
    manager.broadcastEval("bot.fetchAdminGuilds('" + req.params.id + "'); ").then((resolve)=>{
        console.log(chalk.magenta("WebAPI") + "  > Response " + resolve)
        res.json(returnResolve(resolve));
    });
});

app.get('/user/:u/canEdit/:g',checkKey,  function(req, res) {
    manager.broadcastEval("bot.canEdit('" + req.params.u + "', '" + req.params.g + "'); ").then((resolve)=>{
        res.json(resolve);
    });
});


app.get('/guild/:id/getChannels/:type',checkKey,  function(req, res) {
    manager.broadcastEval("bot.fetchChannels('" + req.params.id + "', '"+ req.params.type +"'); ").then((resolve)=>{
        res.json(returnResolve(resolve));
    });
});

app.get('/guild/:id/fetchAll',checkKey,  function(req, res) {
    manager.broadcastEval("bot.fetchAll('" + req.params.id + "'); ").then((resolve)=>{
        res.json(returnResolve(resolve));
    });
});

app.get('/guild/:id/fetchGuild',checkKey,  function(req, res) {
    manager.broadcastEval("bot.fetchGuild('" + req.params.id + "'); ").then((resolve)=>{
        res.json(returnResolve(resolve));
    });
});

app.get('/guild/:id/fetchMembers/:str',checkKey,  function(req, res) {
    manager.broadcastEval("bot.fetchMembers('" + req.params.id + "', '" + req.params.str + "'); ").then((resolve)=>{
        res.json(returnResolve(resolve));
    });
});

app.get('/guild/:id/reloadSettings/:caller',checkKey,  function(req, res) {
    manager.broadcastEval("bot.unsetCFG('" + req.params.id + "', '"+req.params.caller+"'); ").then((resolve)=>{
        res.json(returnResolve(resolve));
    });
});

app.get('/user/:id',checkKey,  function(req, res) {
    manager.broadcastEval("bot.fetchUser('" + req.params.id + "'); ").then((resolve)=>{
        res.json(returnResolveUser(resolve));
    });
});

app.get('/guild/:id/getRoles',checkKey,  function(req, res) {
    manager.broadcastEval("bot.fetchRoles('" + req.params.id + "'); ").then((resolve)=>{
        res.json(returnResolve(resolve));
    });
});
app.get('/data/commands',checkKey,  function(req, res) {
    manager.broadcastEval("bot.fetchCommands(); ").then((resolve)=>{
        res.json(returnResolve(resolve));
    });
});

app.get('/api/stats',  function(req, res) {
    
    manager.fetchClientValues('guilds.size').then(results => {
		
        var data =  results.reduce((prev, val) => prev + val, 0) 
		var sharding = [];
		
		manager.shards.array().forEach( shard => {
			sharding.push({
				id: shard.id,
				status: shard.ready
			})
		})
		
        res.json( { gcount: data, shards: sharding } );
    })

});

app.get('/credits/patreons',  function(req, res) {
    manager.broadcastEval("bot.fetchDonators(); ").then((resolve)=>{
        res.json(returnResolve(resolve));
    });
});

app.get('/credits/translators',  function(req, res) {
    manager.broadcastEval("bot.fetchTranslators(); ").then((resolve)=>{
        res.json(returnResolve(resolve));
    });
});

app.get('/guild/:id/purgeRooms',checkKey,  function(req, res) {

    manager.broadcastEval("bot.purgeRooms('" + req.params.id + "'); ").then((resolve)=>{
        res.json(returnResolve(resolve));
        console.log(chalk.magenta("WebAPI") + "  > Purged all rooms on server " + req.params.id)
    });
});

app.get('/internal/shutdown',  function(req, res) {

    manager.broadcastEval("bot.shutdown()").then((resolve)=>{
        res.json(true);
        console.log(chalk.magenta("WebAPI") + "  > Recieved shutdown signal!")
    });
});

//Open API Server
app.listen(4100, ()=>{
    console.log(chalk.magenta("WebAPI") + "  > Getting ready to handle dashboard requests.")
});