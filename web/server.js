Object.size = function(obj) {
  var size = 0, key;
  for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

require('marko/node-require').install();
require('marko/express'); //enable res.marko


var express     = require('express');
var bodyParser  = require('body-parser')
var session     = require('express-session')
var passport    = require('passport')
var Strategy    = require('passport-discord').Strategy
var fileUpload  = require('express-fileupload');
var Jimp        = require('jimp');
var slowDown    = require("express-slow-down");

var request 	  = require('snekfetch');
var chalk       = require('chalk');
var moment      = require('moment');
var readChunk   = require('read-chunk');
var imageType   = require('image-type');

var internalIP 	= require('internal-ip');
var os          = require('os');

var fs          = require('fs');

var showdown  = require('showdown');

var snowflake = require('node-snowflake').Snowflake;
snowflake.init({worker_id : 0, data_center_id : 2, sequence : 0});

try{
    
  cfg = require('./config.json');

  knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 		cfg.mysql.hostname,
      user : 		cfg.mysql.username,
      password : 	cfg.mysql.password,
      database : 	cfg.mysql.database
    },
    pool: { min: 1, max: 50 }
  });
  
}catch(ex){
  
  console.error(chalk.red('FATAL ERROR:'));
  console.error(chalk.red(' Cannot load config.json'));
  process.exit();
  
}

var wdir = './src/';
var app = express();
var port = 8080;

var accesskey     = cfg.auth.internalKey;
var isProduction  = process.env.NODE_ENV === 'production';

// GOOGLE DATA STORAGE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
Storage = require('@google-cloud/storage');

// Creates a client
const storage = new Storage({
  projectId: 'xxxx',
  keyFilename: './gauth.json'
});

function uploadFile(filename) {

  const bucketName = 'stickers.managerbot.me';

  // Uploads a local file to the bucket
  storage
    .bucket(bucketName)
    .upload(filename, {
      // Support for HTTP requests made with `Accept-Encoding: gzip`
      gzip: true,
      metadata: {
        // Enable long-lived HTTP caching headers
        // Use only if the contents of the file will never change
        // (If the contents will change, use cacheControl: 'no-cache')
        cacheControl: 'public, max-age=31536000',
      },
    })
    .then(() => {
      console.log(`${filename} uploaded to ${bucketName}.`);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  // [END storage_upload_file]
}

function deleteFile(bucketName, filename) {

  const bucketName = 'stickers.managerbot.me';

  // Deletes the file from the bucket
  storage
    .bucket(bucketName)
    .file(filename)
    .delete()
    .then(() => {
      console.log(`gs://${bucketName}/${filename} deleted.`);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  // [END storage_delete_file]
}


// Configure lasso to control how JS/CSS/etc. is delivered to the browser
require('lasso').configure({
    plugins: [
        'lasso-marko' // Allow Marko templates to be compiled and transported to the browser
    ],
    outputDir: __dirname + '/static', // Place all generated JS/CSS/etc. files into the "static" dir
    bundlingEnabled: isProduction, // Only enable bundling in production
    minify: isProduction, // Only minify JS and CSS code in production
    fingerprintsEnabled: isProduction, // Only add fingerprints to URLs in production
});

app.use(require('lasso/middleware').serveStatic());
app.use('/content/', express.static('content'))
app.use(fileUpload({
  limits: { fileSize: 1 * 1024 * 1024, abortOnLimit: false, safeFileNames: true },
}));

// Session stuff

var scopes = ['identify', 'guilds']

passport.use(new Strategy({
    clientID: cfg.auth.clientID,
    clientSecret: cfg.auth.clientSecret,
    callbackURL: cfg.auth.callbackURL,
    scopes: scopes
}, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
        return done(null, profile);
    });
}));

app.use(session({
    secret: cfg.auth.clientID,
    resave: false,    
    cookie : { maxAge: 1000* 60 * 60 *24 * 365 },
    saveUninitialized: false
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(passport.initialize());
app.use(passport.session());

var lastPage = function (req, res, next) {

  if (req.isAuthenticated()) return next();
  if( req.url.startsWith('/i/') || req.url.startsWith('/api/') || req.url.startsWith('/auth') ){ return next(); }

  req.session.lastPage = req.url;
  next();

}
app.use(lastPage)

function hasAdmin( user, guild, cb ){

  request.get('http://localhost:4100/user/'+user+'/canEdit/' + guild)
  .set('x-manager-auth', accesskey)
  .then(r => {
    if(r.body.includes(true)){

      cb(true, '200', r.body);

    }else{

     // Temporarily skip authentication because testing
     //cb(true, '200', r.body);

     cb(false, '403', "You currently do not have sufficient privileges to view that resource..");

    }
  }).catch(ex => {

    cb(false, '500-0', "Something something, generic error? It's not working the way you want it to.");

  });

}

function reloadBotConfig( guild, caller, cb ){

  request.get('http://localhost:4100/guild/'+guild+'/reloadSettings/'+ caller ).then(r => {

    cb(true, null);

  }).catch(ex => {
    
    cb(false, ex);
    
  })

}
function getServer( guild, cb ){

  request.get('http://localhost:4100/guild/'+guild+'/fetchAll')
  .set('x-manager-auth', accesskey)
  .then(r => {

    cb(true, '200', r.body);

  }).catch(ex => {
    
    cb(false, '500-1', "Something went wrong while loading that resource.");
    
  })

}

function getCommands( cb ){

  request.get( 'http://localhost:4100/data/commands' )
  .set('x-manager-auth', accesskey)
  .then(r => {

    cb(true, '200', r.body);

  }).catch(ex => {
    
    cb(false, '500', "Error while fetching list of commands.");
    
  })

}

function getUser( user, cb ){

  request.get( 'http://localhost:4100/user/'+user )
  .set('x-manager-auth', accesskey)
  .then(r => {

    cb(true, '200', r.body);

  }).catch(ex => {
    
    cb(false, '500-1', "This discord user could not be found.");
    
  })

}

function getServerLimited( guild, cb ){

  request.get('http://localhost:4100/guild/'+guild+'/fetchGuild')
  .set('x-manager-auth', accesskey)
  .then(r => {

    cb(true, '200', r.body);

  }).catch(ex => {
    
    cb(false, '500-1', "Something went wrong while loading that resource.");
    
  })

}

function getServerConfig( guild, cb ){

  knex.select().from('guild_settings').where('guild', guild ).then(function(data){

   cb(data[0]);

  })

}

var loIP = internalIP.v4.sync();
if(loIP == null){
  loIP = os.networkInterfaces()['ens4'][0].address;
}

knex('web_data').update( { value: loIP } ).where('option', '=', 'ip').then( ()=>{
  console.log('Updated')
})


function getServerAnalytics( guild, cb){
  
  knex.select().from('guild_events').where('guild', guild).then(function(data){

    var messages  = [];
    var members   = [];
    var joins     = [];
    var leaves    = [];

    if(data == undefined){ cb(false); return; }

    data.forEach( event => {

      if( event.eventType == "MESSAGE_SENT"){

        messages.push( {
          channel: event.context,
          timestamp: event.timestamp
        })

        members.push({
          member: event.target,
          timestamp: event.timestamp
        })

      }

      if( event.eventType == "MEMBER_JOIN"){

        joins.push(
          {
            timestamp: event.timestamp,
            count: event.context
          }
        )

      }

      if( event.eventType == "MEMBER_LEAVE"){

        leaves.push(
          {
            timestamp: event.timestamp,
            count: event.context
          }
        )

      }

    })

    var analytics = { message: messages, members: members, j: joins, l: leaves }
    cb(analytics); 


  })

}

// LOGGING
app.get('/*',function(req,res,next){
  console.log( chalk.blue('['+moment().format('hh:mm:ss')+'] ') + chalk.yellow(req.ip) + ' | ' + chalk.green(req.method) + ' '+ chalk.magenta(req.url) )
  next();
});

// MAIN NAVIGATION

app.get('/', function(req, res) {res.marko(require(wdir + 'index.marko'), { }); });
app.get('/index.html', function(req, res) {res.marko(require(wdir + 'index.marko'), { }); });
app.get('/features', function(req, res) { res.marko(require(wdir + 'routes/features/index.marko'), {}); });
app.get('/timeline', function(req, res) { res.marko(require(wdir + 'routes/timeline/index.marko'), {}); });
app.get('/credits', function(req, res) { res.marko(require(wdir + 'routes/credits/index.marko'), {}); });

app.get('/commands', function(req, res) { 

  getCommands( (success, code, body) => {

    if(!success){ res.marko(require(wdir + 'routes/errorpage/index.marko'), { title: code, message: body }) }

    //we have a valid profile.
    res.marko(require(wdir + 'routes/commands/index.marko'), {
      commands: body[0]
     }); 

  })
});

app.get('/faq', function(req, res) {

  knex('faq_posts').select().where('pinned', 0).then(function(d){

    knex('faq_posts').select().where('pinned', 1).then(function(p){
   
      res.marko(require(wdir + 'routes/faq/index.marko'), {
        faqs: d,
        faqs_pinned: p
      }); 

    }).catch(ex => {
      console.log(ex);
      res.marko(require(wdir + 'routes/errorpage/index.marko'), { title: 'Oops!', message: "This page failed to load properly, Please try again later." })
    });
    
  }).catch(ex => {
    console.log(ex);
    res.marko(require(wdir + 'routes/errorpage/index.marko'), { title: 'Oops!', message: "This page failed to load properly, Please try again later." })
  });

});
app.get('/faq/:id', function(req, res) { 

  knex('faq_posts').select().where('id', req.params.id).then(function(d){

    var converter = new showdown.Converter();
    converter.setOption('simplifiedAutoLink', true);
    converter.setOption('tables', true);
    converter.setOption('tasklists', true);
    converter.setOption('simpleLineBreaks', true);
    converter.setOption('emoji', true);

    d[0].content = converter.makeHtml(d[0].content);
   
    res.marko(require(wdir + 'routes/faq/item/index.marko'), {
      faq: d[0]
    }); 

  }).catch(ex => {
    res.redirect('/faq');
  });


  
});

// REDIRECTS

app.get('/support', function(req, res) {
  res.redirect('https://discord.gg/HQHMMFr')
});

app.get('/error', function(req, res) {

  res.marko(require(wdir + 'routes/errorpage/index.marko'), {
    title: "000 - Generic Error",
    message: "Something went wrong, No error description was provided."
  });

});

app.get('/invite', function(req, res) {
  res.redirect("INVITE GOES HERE :) :)")
});

app.get('/setup', function(req, res) {
  res.redirect('/g/' + req.query.guild_id)
});

app.get('/g/:id', function(req, res) {
  res.redirect('/g/' + req.params.id + '/overview');
});

app.get('/g/:id/overview', function(req, res) {

  var user = "0"
  var guild = req.params.id
  if(req.isAuthenticated()){
    user = req.user.id
  }

  hasAdmin( user, guild, function ( complete, code, content ){

    if(!complete){
      res.marko(require(wdir + 'routes/errorpage/index.marko'), {
        title: code,
        message: content
      });

      return;
    }

    // We have admin.
    getServer( guild, function( complete, code, content){

      if(!complete){
        res.marko(require(wdir + 'routes/errorpage/index.marko'), {
          title: "Cannot fetch server.",
          message: "This server is not registered with Manager"
        });
        return;
      }

      getServerConfig( guild, (config)=>{

        res.marko(require(wdir + 'routes/dash/overview/index.marko'), {
          guild: content[0],
          settings: config,
          user: req.user
        });

      })

    });

  });
});

// General Settings
app.get('/g/:id/server/view', function(req, res) {
  displayProtectedPage( 'routes/dash/overview/server/index.marko', req, res )
});

app.get('/g/:id/server/edit', function(req, res) {
  displayProtectedPage( 'routes/dash/overview/server_edit/index.marko', req, res )
});

// Private Rooms
app.get('/g/:id/rooms/edit', function(req, res) {
  displayProtectedPage( 'routes/dash/overview/rooms_edit/index.marko', req, res )
});

app.get('/g/:id/rooms/overview', function(req, res) {
  displayProtectedPage( 'routes/dash/overview/rooms_overview/index.marko', req, res )
});

// Logging
app.get('/g/:id/logs/edit', function(req, res) {
  displayProtectedPage( 'routes/dash/overview/logs/index.marko', req, res )
});

// Leveling
app.get('/g/:id/levels/edit', function(req, res) {
  displayProtectedPage( 'routes/dash/overview/leveling/index.marko', req, res )
});
// Leaderboard
app.get('/g/:id/levels/edit', function(req, res) {
  displayProtectedPage( 'routes/dash/overview/leveling/index.marko', req, res )
});
app.get('/g/:id/leaderboard', function(req, res) {

  getServer( req.params.id, (isOk, error, content)=>{

    if(!isOk){ res.marko(require(wdir + 'routes/errorpage/index.marko'), { title: error, message: content }) }

    var guild = content[0];

    var guildPass = {
      name: guild.name,
      icon: guild.icon,
      id: guild.id
    }

    //get leaders
    knex('guild_member_data').select().where('guild', guild.id).orderBy('xpTotal', 'desc').limit(50).then(function(board){
      var rank = 1;
      board.forEach( member => {

        // Get rid of stuff we won't need.
        delete member.awayMessage
        delete member.xpPool
        delete member.xpCurrent
        delete member.identifier
        delete member.guild

        member.name = "..."

        member.rank = rank;
        rank++;

      })

      res.marko(require(wdir + 'routes/dash/overview/leveling/leaderboard/index.marko'), {
        guild: guildPass,
        leaders: board
      });
    })



  });




});

// AutoMod
app.get('/g/:id/automod/edit', function(req, res) {
  displayProtectedPage( 'routes/dash/overview/automod/index.marko', req, res )
});

app.get('/g/:id/analize', function(req, res) {

    var user = "0"
    var guild = req.params.id
    if(req.isAuthenticated()){
      user = req.user.id
    }
  
    hasAdmin( user, guild, function ( complete, code, content ){
      if(!complete){
        res.marko(require(wdir + 'routes/errorpage/index.marko'), {
          title: code,
          message: content
        });
  
        return;
      }
  
      // We have admin.
      getServer( guild, function( complete, code, content){
  
        getServerConfig( guild, (config)=>{  
          getServerAnalytics( guild, (analytics)=>{
    
            res.marko(require(wdir + 'routes/dash/overview/analytics/index.marko'), {
              guild: content[0],
              settings: config,
              analytics: analytics,
              user: req.user
            });
    
          })  
        })
  
      });
  
    });

});

function displayProtectedPage( file, req, res ){
  
  var user = "0"
  var guild = req.params.id
  if(req.isAuthenticated()){
    user = req.user.id
  }

  hasAdmin( user, guild, function ( complete, code, content ){
    if(!complete){
      res.marko(require(wdir + 'routes/errorpage/index.marko'), {
        title: code,
        message: content
      });

      return;
    }


    // We have admin.
    getServer( guild, function( complete, code, content){

      getServerConfig( guild, (config)=>{

        res.marko(require(wdir + file), {
          guild: content[0],
          settings: config,
          user: req.user
        });

      })

    });
  });

}

app.get('/user/:id', function(req, res) {

  var user = req.params.id
  getUser(user, (success, code, body) => {

    if(body.length == 0){ res.marko(require(wdir + 'routes/errorpage/index.marko'), { title: 'Invalid User', message: 'No-one is home to answer the door.' }); return; }
    if(!success){ res.marko(require(wdir + 'routes/errorpage/index.marko'), { title: code, message: body }); return; }

    var user = "0"
    if(req.isAuthenticated()){
      user = req.user.id
    }

    var you = false;
    if(user == req.params.id){
      you = true;
    }

    //we have a valid profile.
    knex.select().from('user_stickers').where('author', req.params.id ).then(function(stickers){

      //we have a valid profile.
      knex.select().from('user_profiles').where('user', req.params.id ).then(function(profile){

        if(you == false){
          profile[0].notifySettings = undefined
        }

        if(profile[0] == undefined){
          res.marko(require(wdir + 'routes/errorpage/index.marko'), { title: 'No Profile', message: 'This person has never been in a server with Manager!' })
        }

        res.marko(require(wdir + 'routes/profile/index.marko'), {
          user: body[0],
          you: you,
          profile: profile[0],
          stickers: stickers
        }); 

      }).catch(ex => {
        res.marko(require(wdir + 'routes/errorpage/index.marko'), { title: 'No Profile', message: 'This person has never been in a server with Manager!' })
      });
      
    }).catch(ex => {
      res.marko(require(wdir + 'routes/errorpage/index.marko'), { title: 'Profile Error', message: 'Error fetching profile.' })
    });

  })
});


// API

  // ACCOUNT BAR
  app.get('/i/userBar', function(req, res) {
    // Fetch the users guilds

    var userid = "0"
    if(req.isAuthenticated()){
      userid = req.user.id
    }
    
    request.get('http://localhost:4100/user/'+userid+'/getServersAdmin')
    .set('x-manager-auth', accesskey)
    .then(r => {
      res.marko(require(wdir + 'components/userbar/index.marko'), {
        isAuth: req.isAuthenticated(),
        user: req.user,
        guilds: r.body
      }); 
    }).catch(ex => {

      /*res.marko(require(wdir + 'routes/errorpage/index.marko'), {
        title: "500 - Internal Error",
        message: "Something went wrong while attempting to communicate with the server."
      });*/

    })

  });

  //Authentication Routes
  app.get('/auth', passport.authenticate('discord', { scope: scopes }), function(req, res) {});
  app.get('/auth/verify', 
    passport.authenticate('discord', { failureRedirect: '/error' }), 
    (err, req, res, next) => { // custom error handler to catch any errors, such as TokenError
      if (err.name === 'TokenError') {
        res.marko(require(wdir + 'routes/errorpage/index.marko'), { title: 'Token Error', message: 'token machine broke' })
      } else {
       res.marko(require(wdir + 'routes/errorpage/index.marko'), { title: 'Unknown Error', message: 'Something Something, It Didn\'t work and we have no clue why.' })
      }
    },
    function(req, res) { res.redirect(req.session.lastPage || "/")});
  app.get('/logout', function(req, res) { req.logout(); res.redirect('/'); });

  
app.listen(port, '0.0.0.0', function() {
    
  console.log('Server started! Try it out:\nhttp://localhost:' + port + '/');

  if (process.send) {
      process.send('online');
  }

});

/*
############################
API
############################
*/

app.get('/api/stats', function(req, res) {
  
  knex('stats').select('*').where('sae', 1 ).then(function(data){

    request.get('http://localhost:4100/api/stats')
    .set('x-manager-auth', accesskey)
    .then(r => {
  
        res.json({ db: data, bot: r.body})

    })

  }).catch((ex)=>{
    res.json({error:"nodb", retry: true})
  });

});

app.get('/api/statsExpanded', function(req, res) {
  
  knex('stats').select('*').where('sae', 1 ).then(function(data){

    request.get('http://localhost:4100/api/statsExpanded')
    .set('x-manager-auth', accesskey)
    .then(r => {
  
        res.json({ db: data, bot: r.body})

    })

  }).catch((ex)=>{
    res.json({error:"nodb", retry: true})
  });

});

app.get('/api/color/:hex', function(req, res) {
  
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send('<svg xmlns="http://www.w3.org/2000/svg" style="border-radius: 25%;" width="100" height="100"><rect fill="#'+req.params.hex+'" x="0" y="0" width="100" height="100"></rect></svg>')

});



/*
############################
CONFIG SAVING
############################
*/

app.post('/api/guild/:id/submitChanges/logging', function(req, res) {

  var user = "0"
  var guild = req.params.id
  if(req.isAuthenticated()){
    user = req.user.id
  }

  hasAdmin( user, guild, function ( complete, code, content ){

    if(!complete){

      res.json({
          completed: false,
          error: 403-1,
          message: "You don't have access to this resource."
      })

      return;
    }

    // We have admin.
    getServer( guild, function( complete, code, content){

      if(!complete){

          res.json({
              completed: false,
              error: 503,
              message: "Cannot get the server details."
          })
          return;
        }

      knex('guild_settings').where('guild', guild ).update({
        logging:                  JSON.stringify(req.body)
      }).then(function(data){
        res.json( {completed: true, error: undefined, message: "Changes Saved!" } )
      }).catch((ex)=>{
        console.log(chalk.red(ex))
        res.json( {completed: true, error: "503-1", message: "Unable to save changes!" } )
      });

    });
    
    reloadBotConfig( guild, user, (c,a)=>{  } )

  });
});


app.post('/api/guild/:id/submitChanges/rooms', function(req, res) {

  var user = "0"
  var guild = req.params.id
  if(req.isAuthenticated()){
    user = req.user.id
  }

  hasAdmin( user, guild, function ( complete, code, content ){

    if(!complete){

      res.json({
          completed: false,
          error: 403-1,
          message: "You don't have access to this resource."
      })

      return;
    }

    // We have admin.
    getServer( guild, function( complete, code, content){
      if(!complete){

          res.json({
              completed: false,
              error: 503,
              message: "Cannot get the server details."
          })
    
          return;
        }

      var roomDefaults = {
        name: String(req.body.room_defaults_name),
        memberlimit: Number(req.body.room_defaults_member_limit),
        bitrate: Number(req.body.room_defaults_bitrate),
        ptt: Boolean(req.body.room_defaults_ptt),
        embeds: Boolean(req.body.room_defaults_links),
        files: Boolean(req.body.room_defaults_files),
        nsfw: Boolean(req.body.room_defaults_nsfw),
        startUnlock: Boolean(req.body.room_defaults_unlock),

        bots: Boolean(req.body.roomsBots),
        visible: Boolean(req.body.roomsVisiblity)

      }

      var roomPermissions = {
        name: Boolean(req.body.rooms_perms_name),
        allowLock: Boolean(req.body.rooms_perms_unlock),
        memberlimit: Boolean(req.body.rooms_perms_members),
        bitrate: Boolean(req.body.rooms_perms_bitrate),
        ptt: Boolean(req.body.rooms_perms_ptt),
        speaker: Boolean(req.body.rooms_perms_speaker),
        embeds: Boolean(req.body.rooms_perms_embed),
        files: Boolean(req.body.rooms_perms_files),
        nsfw: Boolean(req.body.rooms_perms_nsfw)
      }

      var settingsObject = {
        roomsEnabled: req.body.enable,
        roomsWhitelist: req.body.roomsWhitelist,
        roomsBlacklist: req.body.roomsBlacklist,
        roomsDefaults: JSON.stringify(roomDefaults),
        roomsPermissions: JSON.stringify(roomPermissions),
        roomsCategory: req.body.category_voice,
        roomsCategoryText: req.body.category_text,
        roomsSummonChannel: req.body.roomsSummonChannel,
        roomsInactiveTimer: req.body.roomsInactiveTimer,
        roomsType: req.body.roomsType
      }

      if( settingsObject.roomsSummonChannel == null){ settingsObject.roomsSummonChannel = "NONE"; }

      knex('guild_settings').where('guild', guild ).update(settingsObject).then(function(data){
        res.json( {completed: true, error: undefined, message: "Changes Saved!" } )
      }).catch((ex)=>{
        console.log(chalk.red(ex))
        res.json( {completed: true, error: "503-1", message: "Unable to save changes!" } )
      });

    });

    reloadBotConfig( guild, user, (c,a)=>{ } )

  });
});

app.post('/api/guild/:id/submitChanges/server', function(req, res) {

  var user = "0"
  var guild = req.params.id
  if(req.isAuthenticated()){
    user = req.user.id
  }

  hasAdmin( user, guild, function ( complete, code, content ){

    if(!complete){

      res.json({
          completed: false,
          error: 403-1,
          message: "You don't have access to this resource."
      })

      return;
    }

    // We have admin.
    getServer( guild, function( complete, code, content){

      if(!complete){

          res.json({
              completed: false,
              error: 503,
              message: "Cannot get the server details."
          })
          return;
        }

      var disabledFeatures = [];
      if(Boolean(req.body.stickers) == false){ disabledFeatures.push('stickers') }
      if(Boolean(req.body.embeds) == false){ disabledFeatures.push('embedsP') }

      var updateValues = {
        disabledCommands:     String(req.body.blockedCommands),
        mods:                 String(req.body.mods),
        admins:               String(req.body.admins),
        disabled:             Boolean(req.body.disabled),
        prefix:               String(req.body.prefix),
        lang:                 String(req.body.lang),
        disabledFeatures:     String(JSON.stringify(disabledFeatures))
      }

      knex('guild_settings').where('guild', guild ).update( updateValues ).then(function(data){
        res.json( {completed: true, error: undefined, message: "Changes Saved!" } )
      }).catch((ex)=>{
        console.log(chalk.red(ex))
        res.json( {completed: true, error: "503-1", message: "Unable to save changes!" } )
      });

    });
    
    reloadBotConfig( guild, user, (c,a)=>{ } )

  });
});

app.post('/api/guild/:id/submitChanges/autoMod', function(req, res) {

  var user = "0"
  var guild = req.params.id
  if(req.isAuthenticated()){
    user = req.user.id
  }

  hasAdmin( user, guild, function ( complete, code, content ){

    if(!complete){

      res.json({
          completed: false,
          error: 403-1,
          message: "You don't have access to this resource."
      })

      return;
    }

    // We have admin.
    getServer( guild, function( complete, code, content){

      if(!complete){

          res.json({
              completed: false,
              error: 503,
              message: "Cannot get the server details."
          })
          return;
        }


      var i = req.body

      var dataObject = {
        "warns": {
          "enabled": false,
          "decayrate": 1,
          "triggers": []
        },
        "filters": {
          "invites": {
            "enabled": Boolean(i.invites.enabled),
            "excluded_channels": i.invites.ech,
            "pct": 0
          },
          "bad_links": {
            "enabled": Boolean(i.badlinks.enabled),
            "excluded_channels": i.badlinks.ech,
            "pct": 0
          },
          "all_caps": {
            "enabled": Boolean(i.caps.enabled),
            "excluded_channels": i.caps.ech,
            "caps_pct": 75,
            "pct": 0
          },
          "list_boost": {
            "enabled": Boolean(i.listBoost.enabled)
          },
          "mass_ping": {
            "enabled": Boolean(i.mentions.enabled),
            "excluded_channels": i.mentions.ech,
            "max_pings": 5,
            "pct": 0
          },
          "ghost_ping": {
            "enabled": Boolean(i.gmentions.enabled),
            "excluded_channels": i.gmentions.ech,
            "pct": 0
          },
          "bad_words": {
            "enabled": Boolean(i.words.enabled),
            "excluded_channels": i.words.ech,
            "list": i.words.words,
            "pct": 0
          }
        }
      }

      

      var updateValues = {
        autoMod:     JSON.stringify(dataObject)
      }

      knex('guild_settings').where('guild', guild ).update( updateValues ).then(function(data){
        res.json( {completed: true, error: undefined, message: "Changes Saved!" } )
      }).catch((ex)=>{
        console.log(chalk.red(ex))
        res.json( {completed: true, error: "503-1", message: "Unable to save changes!" } )
      });

    });
    
    reloadBotConfig( guild, user, (c,a)=>{ } )

  });
});

app.post('/api/guild/:id/submitChanges/levels', function(req, res) {

  var user = "0"
  var guild = req.params.id
  if(req.isAuthenticated()){
    user = req.user.id
  }

  hasAdmin( user, guild, function ( complete, code, content ){

    if(!complete){

      res.json({
          completed: false,
          error: 403-1,
          message: "You don't have access to this resource."
      })

      return;
    }

    // We have admin.
    getServer( guild, function( complete, code, content){

      if(!complete){

          res.json({
              completed: false,
              error: 503,
              message: "Cannot get the server details."
          })
          return;
        }


      req.body.levels.enable = req.body.ranksEnabled;
      req.body.levels.notify = Number(req.body.LevelUpNotify);

      var updateValues = {
        levels:    JSON.stringify(req.body.levels)
      }

      if(req.body.levels.rewards.length > 20){
        res.json( {completed: true, error: "403-1", message: "Cannot have more than 20 rewards." } )
        return;
      }


      knex('guild_settings').where('guild', guild ).update( updateValues ).then(function(data){
        res.json( {completed: true, error: undefined, message: "Changes Saved!" } )
      }).catch((ex)=>{
        console.log(chalk.red(ex))
        res.json( {completed: true, error: "503-1", message: "Unable to save changes!" } )
      });

    });
    
    reloadBotConfig( guild, user, (c,a)=>{ } )

  });
});

// PROFILE SAVING
app.post('/api/user/saveProfile', function(req, res) {

  var user = "0"
  if(req.isAuthenticated()){
    user = req.user.id
  }else{
    res.json( { success: false, error: 'Not Authenticated.' } )
  }

  var notifySettings = [];
  
  if(req.body.room != false){ notifySettings.push('room') }
  if(req.body.ghostping != false){ notifySettings.push('ghostping') }
  if(req.body.joinleaves != false){ notifySettings.push('joinleaves') }

  knex('user_profiles').where('user', user ).update({

    notifySettings:       JSON.stringify(notifySettings),
    bio:                  req.body.bio

  }).then(function(data){
    res.json( {completed: true, error: undefined, message: "Changes Saved!" } )
  }).catch((ex)=>{
    console.log(chalk.red(ex))
    res.json( {completed: true, error: "cannot-save", message: "Unable to save changes!" } )
  });

});
/*
setInterval( ()=>{

  //Every 5 Minutes refill the XP pool by X amount
  var X = 15;

  knex.select().from('guild_member_data').then(function(data){

    data.forEach( ( profile )=> {

      if(profile.xpPool < 500){

          var newPool = profile.xpPool + X;
          if(newPool > 500){ newPool = 500 } //Limiting the pool to 750 xp pts.

          knex('guild_member_data').where('identifier', profile.identifier ).update({
            xpPool: newPool
          }).then( d => {
            
          })

      }

    })

  });

},60000)

setInterval( ()=>{

  knex.select().from('guild_events').orderBy('timestamp', 'asc').limit(100).then(function(data){

    data.forEach( item => {

      if( moment(item.timestamp).add(7, 'days').isBefore( moment() ) ){
        console.log( 'Deleting old guild_events entry: ' + item.eventID )
  
        knex('guild_events').where('eventID', item.eventID).del().then(()=>{
          //
        })
  
      }

    })



  })


},10000)
*/

/*#########################################

 STICKER STUFF

*/

app.post('/api/stickers/add', function(req, res) {

  if(!req.isAuthenticated()){
    return res.status(400).send('You need to be logged in to add stickers');
  }

  knex.select().from('user_profiles').where('user', req.user.id ).then(function(data){

    if(data[0].ban_content == 1){
      return res.status(403).send('You are not allowed to create stickers.');
    }

    knex.select().from('user_stickers').where('author', req.user.id ).then(function(data){

      if(data.length >= 10){
        return res.status(400).send('You have reached your sticker cap.');
      }


      if (!req.files)
        return res.status(400).send('No sticker was uploaded');
    
      var file        = req.files.stickerFile;
      var stickerID   = snowflake.nextId();
      var code        = req.body.stickerCode

      //Check for image
      console.log(file.mimetype)
      if (file.mimetype == "image/png" || file.mimetype == "image/jpeg"){}else{ return res.status(400).send('Uploaded file must be PNG or JPEG, Anything else is EVIL.'); }
      

      //check for filesize
      if (file.truncated == true)
          return res.status(400).send('Uploaded file is too big.');

      if ( code == "")
        return res.status(400).send('You need to supply a code to call the sticker with.');

      if ( code.length > 15)
        return res.status(400).send('Sticker codes can not be longer than 15 characters.');

      for (i = 0; i < data.length; i++) { 
        if( code == data[i].code && data[i].author == req.user.id ){
          return res.status(400).send('Sticker Code is already in use');
        }
      }

      if ( !/^[a-z0-9]+$/i.test( code ) )
        return res.status(400).send('Sticker Code must be alphanumeric [a-Z][0-9]');


      file.mv(__dirname + '/content/stickers/' + stickerID + '.png', function(err) {

        if (err)
          return res.status(500).send(err);


          // Now lets check the content-type to prevent max from uploading any more DLL's.
          var fileBuffer = readChunk.sync(__dirname + '/content/stickers/' + stickerID + '.png', 0, 12);
          var fileTyping = imageType(fileBuffer)
          
          if(fileTyping != null){

            var ext = fileTyping.ext

            if(ext == "png" || ext == "jpg" || ext == "jpeg"){

              Jimp.read(__dirname + '/content/stickers/' + stickerID + '.png', (err, img) => {
                if (err) throw err;
                img
                    .resize(512, 512) // resize
                    .write(__dirname + '/content/stickers/' + stickerID + '.png'); // save
  
                    uploadFile(__dirname + '/content/stickers/' + stickerID + '.png')
  
              })
              
              knex('user_stickers').insert({
  
                sticker: stickerID,
                code: code,
                author: req.user.id
      
              }).then( d => {
                setTimeout( ()=>{ res.status(200).send('OK'); },1000);
              }).catch( ex => {
                console.log(ex);
                res.status(500).send('Something went wrong, Try again in a bit.');
              }) 
  
            }else{
  
              // Content Type incorrect.
              res.status(500).send('The file you uploaded is not a valid image.');
  
            }

          }else{  

            // Content Type what.
            res.status(500).send('The file you uploaded is not a valid image.');

          }

      });  
    });
  });
});

app.get('/api/stickers/delete/:id', function(req, res) { 

  if(!req.isAuthenticated()){
    return res.status(400).send('No auth session.')
  }

  knex('user_stickers').where( { author: req.user.id, sticker: req.params.id} ).del().then(function(data){

    if(data == 1){

      deleteFile(req.params.id + '.png');

    }else{
      res.json('false')
    }
    


    

  }).catch(ex => {

    res.json('false')

  });

});

const fetchMemberLimits = slowDown({
  windowMs: 2 * 60 * 1000, // 2 minutes
  delayAfter: 5, // allow 1 requests to go at full-speed, then...
  delayMs: 200 // 6th request has a 100ms delay, 7th has a 200ms delay, 8th gets 300ms, etc.
});

app.get('/api/guild/:id/fetchMembers/:str', fetchMemberLimits, function(req, res) {
  
  request.get('http://localhost:4100/guild/'+ req.params.id + '/fetchMembers/' + req.params.str)
  .set('x-manager-auth', accesskey)
  .then(r => {
    res.json(r.body)
  }).catch((ex)=>{
      console.log(ex)
      res.json('oops')
  });



});

app.get('/api/credits/patreons', function(req, res) {
  
  request.get('http://localhost:4100/credits/patreons')
  .set('x-manager-auth', accesskey)
  .then(r => {
    res.json(r.body)
  }).catch((ex)=>{
      console.log(ex)
      res.json('oops')
  });

});
app.get('/api/credits/translators', function(req, res) {
  
  request.get('http://localhost:4100/credits/translators')
  .set('x-manager-auth', accesskey)
  .then(r => {
    res.json(r.body)
  }).catch((ex)=>{
      console.log(ex)
      res.json('oops')
  });

});

app.get('/api/steam/:con', function(req, res) {
  
  res.redirect('steam://connect/' + req.params.con)

});



  //                 //
 //    ADMIN AREA   //
//                 //

function getAdmin( req, res, cab ){
    
  var user = "0"
  if(req.isAuthenticated()){
    user = req.user.id
  }else{
    res.marko(require(wdir + 'routes/errorpage/index.marko'), { title: 'Authentication Required.', message: 'Log in to access this area.' });
    return;
  }
  
  getUser(user, (success, code, body) => {

    if(body.length == 0){ res.marko(require(wdir + 'routes/errorpage/index.marko'), { title: 'Invalid User', message: 'No-one is home to answer the door.' }); return; }
    if(!success){ res.marko(require(wdir + 'routes/errorpage/index.marko'), { title: code, message: body }); return; }

      //we have a valid profile.
      knex.select().from('user_profiles').where('user', user ).then(function(profile){

        profile = profile[0];
        if(profile.is_admin != 1){
          res.marko(require(wdir + 'routes/errorpage/index.marko'), { title: 'No Access', message: 'Nothing for you here, Move along.' });
          return;        
        }

        cab(body[0], profile);

      }).catch(ex => {
        console.log(ex);
        res.marko(require(wdir + 'routes/errorpage/index.marko'), { title: 'Oops', message: 'Something went wrong while communicating.. Hello?' })
      });

  })
}

app.get('/acp', function(req, res) {
  res.redirect('/acp/overview')
});

app.get('/api/acp/searchUser', function(req, res) {

  var searchTerm = req.query.term;

  if(searchTerm == undefined || searchTerm == ""){
    res.send('"[]"').end();
    return;
  }

  getAdmin(req, res, (b, p)=>{ 

      // We have admin.
      knex.select().from('user_profiles').where( 'user', searchTerm ).orWhere( 'known_name', 'like', '%'+searchTerm+'%' ).then(function(profile){

        res.json(JSON.stringify(profile));

      }).catch(ex => {
        console.log(ex);
        res.marko(require(wdir + 'routes/errorpage/index.marko'), { title: 'Oops', message: 'Something went wrong while communicating.. Hello?' })
      });

  }); 

});

app.get('/acp/overview', function(req, res) {

  getAdmin(req, res, (b, p)=>{ res.marko(require(wdir + 'routes/admin_cp/index.marko'), {
      user: b,
      profile: p
  })}); 

});

app.get('/acp/user', function(req, res) {

  getAdmin(req, res, (b, p)=>{ res.marko(require(wdir + 'routes/admin_cp/users/index.marko'), {
      user: b,
      profile: p
  })}); 

});

app.get('/acp/user/:id', function(req, res) {

  getAdmin(req, res, (b, p)=>{

    var profil = req.params.id
    getUser(profil, (success, code, body) => {

      if(body.length == 0){ res.marko(require(wdir + 'routes/errorpage/index.marko'), { title: 'Invalid User', message: 'No-one is home to answer the door.' }); return; }
      if(!success){ res.marko(require(wdir + 'routes/errorpage/index.marko'), { title: code, message: body }); return; }

      //we have a valid profile.
      knex.select().from('user_profiles').where('user', req.params.id ).then(function(target){

        if(target[0] == undefined){
          res.marko(require(wdir + 'routes/errorpage/index.marko'), { title: 'No Profile', message: 'This person has never been in a server with Manager!' })
        }


        console.log(target[0])
        res.marko(require(wdir + 'routes/admin_cp/users/user/index.marko'), {
          user: b,
          profile: p,
          target: target[0],
          target_user: body[0]
        }); 

      }).catch(ex => {
        res.marko(require(wdir + 'routes/errorpage/index.marko'), { title: 'No Profile', message: 'This person has never been in a server with Manager!' })
      });

    }); 

  })

});

app.get('/acp/faq', function(req, res) {

  getAdmin(req, res, (b, p)=>{ 
   
    knex.select().from('faq_posts').then(function(faq){

      res.marko(require(wdir + 'routes/admin_cp/faq/index.marko'), {
        user: b,
        profile: p,
        faq: faq
      })

    });

  }); 

});

app.get('/acp/faq/edit/:id', function(req, res) {

  var id = req.params.id;

  getAdmin(req, res, (b, p)=>{ 
   
    knex.select().from('faq_posts').where('id', id).then(function(faq){

      res.marko(require(wdir + 'routes/admin_cp/faq/edit/index.marko'), {
        user: b,
        profile: p,
        faq: faq[0]
      })

    });

  }); 

});
app.get('/acp/faq/new', function(req, res) {

  getAdmin(req, res, (b, p)=>{ 

    res.marko(require(wdir + 'routes/admin_cp/faq/new/index.marko'), {
      user: b,
      profile: p
    })

  }); 

});

app.get('/api/acp/user/ban/:id', function(req, res) {

  getAdmin(req, res, (b, p)=>{ 

      // We have admin.
      knex('user_profiles').update({ 'ban_content': 1 }).where( 'user', req.params.id ).limit(1).then(function(profile){
        res.redirect('/acp/user/' + req.params.id )

      }).catch(ex => {
        console.log(ex);
        res.json(JSON.stringify(false));
      });

  }); 

});

app.get('/api/acp/user/clears/:id', function(req, res) {

  getAdmin(req, res, (b, p)=>{ 

      // We have admin.
      knex('user_stickers').where('author', req.params.id).del().then(function(profile){
        res.redirect('/acp/user/' + req.params.id )

      }).catch(ex => {
        console.log(ex);
        res.json(JSON.stringify(false));
      });

  }); 

});

app.get('/api/acp/user/clearb/:id', function(req, res) {

  getAdmin(req, res, (b, p)=>{ 

      // We have admin.
      knex('user_profiles').update({ 'bio': 'Bio was deleted by Manager staff.' }).where( 'user', req.params.id ).limit(1).then(function(profile){
        res.redirect('/acp/user/' + req.params.id )

      }).catch(ex => {
        console.log(ex);
        res.json(JSON.stringify(false));
      });

  }); 

});

app.get('/api/acp/user/unban/:id', function(req, res) {

  getAdmin(req, res, (b, p)=>{ 

      // We have admin.
      knex('user_profiles').update({ 'ban_content': 0 }).where( 'user', req.params.id ).limit(1).then(function(profile){
        res.redirect('/acp/user/' + req.params.id )

      }).catch(ex => {
        console.log(ex);
        res.json(JSON.stringify(false));
      });

  }); 

});

app.post('/api/acp/faq/update/:id', function(req, res) {

  var searchTerm = req.params.id;

  getAdmin(req, res, (b, p)=>{ 


      // We have admin.
      knex('faq_posts').update({ 'title': req.body.pTitle, 'desc': req.body.pDesc, 'content': req.body.pContent }).where( 'id', req.params.id ).limit(1).then(function(d){
        res.redirect('/acp/faq/')

      }).catch(ex => {
        console.log(ex);
        res.json(JSON.stringify(false));
      });

  }); 

});

app.post('/api/acp/faq/create', function(req, res) {

  getAdmin(req, res, (b, p)=>{ 


      // We have admin.
      knex('faq_posts').insert({ 'title': req.body.pTitle, 'desc': req.body.pDesc, 'content': req.body.pContent }).then(function(d){
        res.redirect('/acp/faq/')

      }).catch(ex => {
        console.log(ex);
        res.json(JSON.stringify(false));
      });

  }); 

});

app.get('/api/acp/faq/delete/:id', function(req, res) {

  var searchTerm = req.params.id;

  getAdmin(req, res, (b, p)=>{ 


      // We have admin.
      knex('faq_posts').where( 'id', req.params.id ).del().then(function(d){
        res.redirect('/acp/faq/')

      }).catch(ex => {
        console.log(ex);
        res.json(JSON.stringify(false));
      });

  }); 

});
