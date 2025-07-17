const Button=document.getElementById("button");
const Text1=document.getElementById("text");
const list=document.getElementById("listcontainer");


Button.addEventListener('click',()=>{

    if(Text1.value === ''){
        alert("you must enter a text");
    }
    else{
        let span=document.createElement("SPAN");
        span.innerHTML= '\u00d7';
    let li=document.createElement("LI");
    li.innerHTML=Text1.value;
    
    list.appendChild(li);
   
    li.appendChild(span);
    updateStorage();
    }

    Text1.value='';
});

function checked(e){

    if(e.target.tagName === "LI")
    {
    let list=e.target;
    list.classList.toggle("checked");
    
 
    }
    if(e.target.tagName === "SPAN"){
        let list=e.target;
        list.parentElement.remove();
    }
    updateStorage();
}

function updateStorage(){
    localStorage.setItem("data",list.innerHTML);
}

function showStorage(){
    list.innerHTML=localStorage.getItem('data');
}



list.addEventListener('click',checked);
showStorage();