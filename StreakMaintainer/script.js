
var date=new Date().getFullYear();
var month= new Date().getMonth();
const content=document.querySelector(".content");
const front=document.querySelector(".front");
const back=document.querySelector(".back");
const headmonth=document.querySelector(".month");
const btn=document.getElementById("btn");
const ye=document.querySelector(".year");
const currentt= document.querySelector(".current");
const high=document.querySelector(".high");
const reset=document.querySelector(".reset");
var divs={};
var arr=[];
var center;
var currentstreak= parseInt(localStorage.getItem("currentstreak"), 10) || 0;
var highstreak= parseInt(localStorage.getItem("highstreak"), 10) || 0;
const months=["Janauray","February","March","April","May","June","July","Augest","September","October","November","December"];
var propName;
currentt.innerHTML=currentstreak;
high.innerHTML=highstreak;

 

showDivs();



function updateDivs(){
    localStorage.setItem("divs",JSON.stringify(divs));
}
function showDivs(){
    divs=JSON.parse(localStorage.getItem("divs"));
    if(divs === null){
        divs={};
        
    }
    headmonth.innerHTML=months[month];
    ye.innerHTML=date;
    createMonth(date,month);
}


function createMonth(year,mon){
    propName=year+"-"+mon;
    let date=new Date(year,mon,1);
    let date1=new Date(year,mon+1,0);
    let firstday=date.getDay();
    let lastday=date1.getDate();
    let j=1;

    center=document.createElement("div");
    center.classList.add("center");
    for(var i=0;i<=36;i++){

        if(i>=firstday && j<=lastday){
        
        let div=document.createElement("DIV");
        div.classList.add("btn");
        div.innerHTML= j++;
        center.appendChild(div);
       
        div.addEventListener("click",(e)=>{
            let select=e.target;
            select.classList.toggle("rr")
            if(select.classList.contains("rr"))
            { 
                
                arr.push(select.innerHTML.trim());
                if(currentstreak>=highstreak){
                 highstreak++;}
                 currentstreak++;
                currentt.innerHTML=currentstreak;
                high.innerHTML=highstreak;
                localStorage.setItem("currentstreak",currentstreak);
                localStorage.setItem("highstreak",highstreak);

            }else{
               let ind= arr.indexOf(select.innerHTML.trim());
               arr.splice(ind,1);
               if(currentstreak!=0){currentstreak--;}
                currentt.innerHTML=currentstreak;
               localStorage.setItem("currentstreak",currentstreak);
            }
            saveCurrentMonth();
            analysis();
        });

       

    }else{
        let div=document.createElement("DIV");
        div.classList.add("btn");
        center.appendChild(div);
    }
    }
    content.appendChild(center);
    if (divs[propName] !== undefined) {
        arr=divs[propName]// Restore selected dates for the month
        clickeddivs();
    } else {
        arr = []; // Reset for new months
    }
}



front.addEventListener("click",()=>{
    saveCurrentMonth();
    if(month==11){
        month=0;
        date++;
        ye.innerHTML=date;
    }else{ month++;}
   
    headmonth.classList.add("ani");
    headmonth.innerHTML=months[month];
    setTimeout(()=>{
        headmonth.classList.remove("ani");
    },1200);
    content.removeChild(content.firstElementChild);
    createMonth(date,month);
});



back.addEventListener("click",()=>{
    saveCurrentMonth();
    if(month==0){
        month=11;
        date--;
        ye.innerHTML=date;
    }else{ month--;}
    headmonth.classList.add("ani");
    headmonth.innerHTML=months[month];
    setTimeout(()=>{
        headmonth.classList.remove("ani");
    },1500);
    content.removeChild(content.firstElementChild);
    createMonth(date,month);
});

function clickeddivs(){
       var children=center.children;
       let array=divs[propName];
       console.log(propName);
       console.log(array);
       for(let child of children){
        if(array.includes(child.innerHTML.trim())){
            child.classList.add("rr");
        }
       }
    }



 function saveCurrentMonth() {
        divs[propName] = arr; // Save the selected dates for the current month
        updateDivs();
        
    }
    const quotecontent=document.getElementById("quotecontent");
    const author=document.getElementById("author");
    getQuote();
    
 async function getQuote() {
    try{
        
   const response= await fetch("csvjson.json");
    var data=await response.json();
    const lastexe=localStorage.getItem("lastexe") ||0;
    var lastno=localStorage.getItem("lastno") || 0;
    const todayyear=new Date().getFullYear();
    const todaymonth=new Date().getMonth();
    const todayday=new Date().getDate();
    const today=""+todayday+""+todaymonth+""+todayyear;
    if(lastexe != today){
     lastno=Math.floor(Math.random() * data.length);
        localStorage.setItem("lastno",lastno);
        localStorage.setItem("lastexe",today);
    }
    quotecontent.innerHTML=data[lastno].quote;
    author.innerHTML=data[lastno].Author;
    
    
    }catch(err){
        console.error(err);
        
    }

 }

 reset.addEventListener("click",()=>{ 
    currentstreak=0;
    currentt.innerHTML=currentstreak;
    localStorage.setItem("currentstreak",0);

 });

 function analysis(){

    const ca=document.getElementById("ca");
    const pa=document.getElementById("pa");
    const impro=document.getElementById("impro");
    let y=new Date().getFullYear();
    let m=new Date().getMonth();
    let caprop=y+"-"+m;
    console.log(caprop);
    let yy;
    let mm;
    if(0 == m){
        yy=y-1;
        mm=11;
    }else{ yy=y;mm=m-1;}
    let prprop=yy+"-"+mm;
    currentarray=divs[caprop];
    previousarray=divs[prprop];
if(currentarray === undefined){ currentarray=[]}
if(previousarray === undefined){ previousarray=[]}
    ca.innerHTML=currentarray.length;
    pa.innerHTML=previousarray.length;
    let date1=new Date(y,m+1,0).getDate();
    let date2=new Date(yy,mm+1,0).getDate();
    
    let m1=Math.ceil((currentarray.length/date1)*100);
    let m2=Math.ceil((previousarray.length/date2)*100);
    if(m2>=m1){
        if(currentarray.length ==  previousarray.length){
            impro.innerHTML="Good(Same As previous Month)"}
            else{
                impro.innerHTML="Till NO Improvement";}
    }else{
        impro.innerHTML=m1-m2+"%"+"(Excellent)";
    }

}

analysis();

 


