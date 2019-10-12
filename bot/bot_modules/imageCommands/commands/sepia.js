module.exports = {
    
    trigger: "sepia",
    enabled: true,
    
    category: "Image Manipulation",
    description: "Add a sepia filter on the image",
    permissionLevel: 1,
	example: "sepia",
    
    where: 2,
    
    commandInitialization: function(){

        //initialize me daddy

    },

    triggerCommand: function (message, args, config){

       var image    = bot.cache.lastImage[message.author.id]; 
       var id       = bot.snowflake.nextId();

       if(image == undefined){ message.channel.send(bot.L(config, 'imageCommands', 'noImage' )); return; }
       if(message.channel.type != "dm"){ if(!message.channel.permissionsFor(message.guild.me).has('ATTACH_FILES')) { message.channel.send( bot.L(config, 'genericMessages', 'errorBotPermissionS', 'Attach Files') ); return; } }
       message.channel.send( bot.L(config, 'imageCommands', 'processingImage') ).then( response =>{

            Jimp.read(image, function (err, file) {
                if (err){ message.channel.send( bot.L(config, 'shared', 'errorGeneric')  ) };

                file.sepia().write(id + ".png", ()=>{
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