module.exports = {
    
    trigger: "posterize",
    enabled: true,
        
    category: "Image Manipulation",
    description: "Apply posterization",
    permissionLevel: 1,
	example: "posterize [amount]",
    
    where: 2,
    
    //module: "name", (this gets automatically set when its loaded, its only here for reference. This is used when you disable a module.)

    commandInitialization: function(){

        //initialize me daddy

    },

    triggerCommand: function (message, args, config){

       var image    = bot.cache.lastImage[message.author.id]; 
       var id       = bot.snowflake.nextId();

       var intensity = 5;

       if(!isNaN(args[1]))
           intensity = Number(args[1]);


       if(intensity > 50)
           intensity = 50

       if(intensity < 2)
           intensity = 2

       if(image == undefined){ message.channel.send(bot.L(config, 'imageCommands', 'noImage' )); return; }
       if(message.channel.type != "dm"){ if(!message.channel.permissionsFor(message.guild.me).has('ATTACH_FILES')) { message.channel.send( bot.L(config, 'genericMessages', 'errorBotPermissionS', 'Attach Files') ); return; } }
       message.channel.send( bot.L(config, 'imageCommands', 'processingImage') ).then( response =>{

            Jimp.read(image, function (err, file) {
                if (err){ message.channel.send( bot.L(config, 'shared', 'errorGeneric')  ) };

                file.posterize(intensity).write(id + ".png", ()=>{
                    message.channel.send( '',  { files: [id + ".png"] }).then((ree)=>{
                        response.delete();
                        fs.unlink("./" + id + ".png", ()=>{})
                        bot.cache.lastImage[message.author.id] = ree.attachments.first().url;
                    })
                })

            })
        })

    }

}