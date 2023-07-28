onUiLoaded(() => {
	
	var refresh = document.getElementById("txt2img_extra_refresh"); // get refresh button
	refresh.addEventListener('click', refreshDir); // add click event to refresh button
	refreshDir();
	
});

function refreshDir(){
	
	var id = document.querySelectorAll(".extra-network-subdirs"); // get all subdir elements available
	//console.log("found subdirs: " + id);
	var children = []; // array for all folder buttons
	
	for (i of id) { // current subdir element
	
	    var current = i.querySelectorAll('.gradio-button'); // get all folders of current subdir element
		
	    for (e of current) { // individial button in current subdir element
		
	        children.push(e); // push individual folder buttons to arrray
			
	    }
		
    }
	
    var mainFolders = [];// array of all main folders
    var folderOpen = [];// array of if folders are open
	
    children.forEach(function(child) { // for each folder
	
        var text = child.innerText; // grab name of folder
		
        if (!text.includes("/")) { // check if folder is not subdirectory
		
            mainFolders.push(child); // push individual main folder to array
			child.classList.add("extra-network-maindirectory");
			//console.log("Found Main Folder: " + text);
			
        } else if (text.includes("/")) { // check if folder is subdirectory
		
            var textSplit = text.split("/"); // split directory and subdirectory names
			
            if(mainFolders.indexOf(textSplit[0])) { // failsafe to check if directory name is inside subdirectory
			
                child.style.display = "none";
				child.classList.add("extra-network-subdirectory");
				//console.log("Found Sub Folder: " + textSplit[1] + ". inside: " + textSplit[0]);
				
            }
			
        }
		
    });

	for (i of mainFolders) { // for each directory
	
		i.addEventListener('click', function() { // add click event
	  
			var folder = this.innerText; // grab name of folder
			
			if (folderOpen[i] === 1) { // if directory is open
			
				folderOpen[i] = 0; // close directory
				//console.log("Folder: " + folder + " is now closed");
				
			} else { // if directory is closed
			
				folderOpen[i] = 1; // open directory
				//console.log("Folder: " + folder + " is now open");
				
			}
			
			//console.log("Checking: " + folder);
			children.forEach(function(child) { // for each directory
			
				var text = child.innerText; // grab name of folder
				
				if (text.includes(folder) && text.includes("/")) { // check if folder is subdirectory and is inside of main directory
				
					//console.log("Found Sub Folder: " + child + ". inside: " + folder);
					
					if (folderOpen[i] === 1) { // if main directory is open
					
						child.style.display = "inline-flex";
						child.style.width = "70%"
						child.style.margin = "0 0 0 20%";
						//console.log("Sub Folder: " + child + " is now open");
						
					} else { // if main directory is closed
					
						child.style.display = "none";
						//console.log("Found Sub Folder: " + child + " is now closed");
						
					}
					
				}
				
			});
		
		});
	  
	}
	
}