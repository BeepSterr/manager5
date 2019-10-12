module.exports = {
    
    trigger: "jpeg",
    enabled: true,
    
    category: "Image Manipulation",
    description: "Apply a jpeg quality filter",
    permissionLevel: 1,
	example: "jpeg",
    
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

                file.quality(1).write(id + ".jpg", ()=>{
                    message.channel.send( '',  { files: [id + ".jpg"] }).then((ree)=>{
                        response.delete();
                        fs.unlink("./" + id + ".jpg", ()=>{})
                        bot.cache.lastImage[message.author.id] = ree.attachments.first().url;
                    })
                })

            })
        })

    }

}