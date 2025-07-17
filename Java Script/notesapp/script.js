
const createbtn=document.querySelector(".btn");
const notescontainer=document.querySelector(".notes-container");
function showNotes(){
    notescontainer.innerHTML=localStorage.getItem("notes");

}
showNotes();


function updateStorage(){
    localStorage.setItem("notes",notescontainer.innerHTML);
}



createbtn.addEventListener("click", function(){
    let para=document.createElement("p");
    let image=document.createElement("img");
    image.src="images/delete.png";
    para.className="input-box";
    para.setAttribute( "contenteditable","true");
    para.setAttribute("spellcheck","false");
    notescontainer.appendChild(para).appendChild(image);
});

notescontainer.addEventListener("click",function(event){
    if(event.target.tagName === 'IMG'){
            event.target.parentElement.remove();
            updateStorage();
    }
    else if(event.target.tagName === "P"){
            let notes=document.querySelectorAll(".input-box");
            for (let i = 0; i < notes.length; i++) {
                notes[i].onkeyup = updateStorage;
            }
            
    }
});

notescontainer.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        e.preventDefault(); // Prevent default tab behavior
        document.execCommand('insertText', false, '    '); // Insert 4 spaces
    }else if( e.key === 'Enter'){
        e.preventDefault();
        document.execCommand('insertLineBreak');
    }
});