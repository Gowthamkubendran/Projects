
const questionsArray=[
    {
        question:"1.which player have a jersey number 7?",
        optionsArray:[ {option:"Virat Kohil"},{
            option:"MS Dhoni"},
            {option:"Gris Gayle"},
           {option:"Baber Azam"}],
        answer:"MS Dhoni"
    },{
        question:"2.which player have a jersey number 18 ?",
        optionsArray:[
            
            {    option:"Jos Buttler"},
            {   option:"MS Dhoni"},
            {   option:"Virat Kohil"},
            {   option:"Baber Azam"}
        ],
        answer:"Virat Kohil"
    },{
        question:"3.who is called as god of cricket ?",
        optionsArray:[
            {    option:"viv richards"},
            {   option:"MS Dhoni"},
            {   option:"Gris Gayle"},
            {   option:"Sachine Tendulkar"}
        ],
        answer:"Sachine Tendulkar"
    },{
        question:"4.who is called as run machine ?",
        optionsArray:[
            {    option:"Rohit Sharma"},
            {   option:"MS Dhoni"},
            {   option:"Gris Gayle"},
            {   option:"Virat Kohil"}
        ],
        answer:"Virat Kohil"
    }

];


let question=document.getElementsByClassName("questions");
let options=document.getElementById("answer-content");
let nextbtn=document.getElementsByClassName("next");
let Button;

let questionno=0;
let score=0;
startQuiz();


function startQuiz(){
   nextbtn[0].innerHTML="Next";
    resetState();
    showQuestions();
   
}
function showQuestions(){
    let currquestion=questionsArray[questionno];
    question[0].innerHTML=currquestion.question;
    currquestion.optionsArray.forEach(element => {
        Button=document.createElement("button");
        Button.innerHTML=element.option;
        Button.classList.add("btn");
        options.appendChild(Button);
        Button.addEventListener("click",verify);
    });
}
function resetState(){

    while(options.firstChild){
        options.removeChild(options.firstChild);
    }
    nextbtn[0].style.display="none";
}


function verify(){
    let currentquestion=questionsArray[questionno];
    let selectedbuttton= this;
    
   if( selectedbuttton.innerText === currentquestion.answer){
        selectedbuttton.style="background-color:green; color:white; border:none; transition:0s;";
        score++;
        let diss=document.getElementsByClassName("btn");
        for(i=0;i<=3;i++){diss[i].disabled= true;}
   }else{
    selectedbuttton.style="background-color:red; color:white; border:none; transition:0s;";
    for(i=0;i<=3;i++){
        if( currentquestion.answer === currentquestion.optionsArray[i].option ){
            const child=options.children[i];
            child.style="background-color:green; opacity:0.4; color:white; border:none; transition:0s;";
        }
        let dis=document.getElementsByClassName("btn");
        dis[i].disabled= true ;
    }
   }
   questionno++;
   nextbtn[0].style="display:block";
   nextbtn[0].addEventListener("click",over);
}





function over(){
    if(questionno < questionsArray.length){
    startQuiz();
}else{
    displayScore();
}
}


function displayScore(){
    resetState();
    question[0].innerHTML="you have scored "+score+"/"+questionsArray.length+"";
    nextbtn[0].style="display:block";
    nextbtn[0].innerHTML="Start Again";
    questionno=0;
    score=0;
}


