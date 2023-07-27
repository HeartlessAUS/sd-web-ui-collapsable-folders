onUiLoaded(() => {
	var refresh = document.getElementById("txt2img_extra_refresh");
	refresh.addEventListener('click', refreshDir);
	refreshDir();
});

function refreshDir(){
	var id = document.querySelectorAll(".extra-network-subdirs");
	var children = [];
	for (i of id) {
	    var current = i.querySelectorAll('.gradio-button');
	    for (e of current){
	        children.push(e);
	    }
    }
    var mainFolders = [];
    var folderVar = [];
    children.forEach(function(child) {
        var text = child.innerText;
        if (!text.includes("/")){
            //console.log("Found Main Folder: " + text);
            mainFolders.push(child);
        } else if (text.includes("/")){
            var textSplit = text.split("/");
            if(mainFolders.indexOf(textSplit[0])){
                //console.log("Found Sub Folder: " + textSplit[1] + ". inside: " + textSplit[0]);
                child.style.display = "none";
                child.nextSibling.style.display = "none";
            }
        }
    });

	for (i of mainFolders) {
	  i.addEventListener('click', function() {
		var folder = this.innerText;
		if (folderVar[i] === 1){
			folderVar[i] = 0;
			//console.log("Folder: " + folder + " is now closed");
		} else {
			folderVar[i] = 1;
			//console.log("Folder: " + folder + " is now open");
		}
		//console.log("Checking: " + folder);
		children.forEach(function(child) {
			var text = child.innerText;
			if (text.includes(folder) && text.includes("/")){
				//console.log("Found Sub Folder: " + text);
				if (folderVar[i] === 1){
					child.style.display = "inline-flex";
					child.style.width = "70%"
					child.style.margin = "0 0 0 20%";
					child.nextSibling.style.display = "inline-flex";
				} else {
					child.style.display = "none";
					child.nextSibling.style.display = "none";
				}
			}
		});
	  });
	}
}