onUiLoaded(() => {
	var id = document.getElementById("txt2img_lora_subdirs");
    var children = id.querySelectorAll('.gradio-button');
    var mainFolders = [];
    var folderVar = [];
    children.forEach(function(child) {
        var text = child.innerText;
        if (!text.includes("/")){
            console.log("Found Main Folder: " + text);
            mainFolders.push(child);
        }
    });
    children.forEach(function(child) {
        var text = child.innerText;
        if (text.includes("/")){
            var textSplit = text.split("/");
            if(mainFolders.indexOf(textSplit[0])){
                console.log("Found Sub Folder: " + textSplit[1] + ". inside: " + textSplit[0]);
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
        console.log("Folder: " + folder + " is now closed");
    } else {
        folderVar[i] = 1;
        console.log("Folder: " + folder + " is now open");
    }
    console.log("Checking: " + folder);
    children.forEach(function(child) {
        var text = child.innerText;
        if (text.includes(folder) && text.includes("/")){
            console.log("Found Sub Folder: " + text);
            if (folderVar[i] === 1){
                child.style.display = "inline-flex";
                child.nextSibling.style.display = "inline-flex";
            } else {
                child.style.display = "none";
                child.nextSibling.style.display = "none";
            }
        }
    });
  });
}
});