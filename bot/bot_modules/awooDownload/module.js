module.exports = {
	
	initializeModule: function(mod){
		
		/* 
		
			Hey reader, So. This little mess here
			was from when i had a custom uploading server
			for files bigger than discord could handle.
			
			I Have no clue if this is still in use in the actual thing
			so have fun trying to replace it.
			
		*/

		//set name
		this.module = mod;

		bot.uploadFile = function( file, callback, ex = "png" ){
			
			var id = bot.snowflake.nextId();
			fs.writeFile(
				"/mnt/bigstorage/Nioxed/awoodownload/public/" + id + "." + ex,
				file,
				function (err) {
					if(err){ callback(false); return; }
					var url = "https://awoo.download/" + id + "." + ex;
					callback(true, url)
				}
			);
		}

		bot.uploadPath = function(){
			return "/mnt/bigstorage/Nioxed/awoodownload/public/";
		}

		bot.uploadText = function( file, callback ){
			
			var arr = [];
			file.forEach( item => {
				arr.push(item.displayName);
			});

			var id = bot.snowflake.nextId();
			fs.writeFile(
				"/mnt/bigstorage/Nioxed/awoodownload/public/" + id + ".txt",
				arr.join('\n'),
				function (err) {
					if(err){ callback(false); return; }

					var url = "https://awoo.download/" + id + ".txt"
					callback(true, url)
				}
			);
					
		}
		
	},

	onEvent: function(event, data){

	
	}
	
}