const questions=[
    {
        question: "What does HTML stands for",
        answers:[
            {text: "Hyper Text Markup Language", correct: true},
            {text: "Hyper Text Markover Language", correct: false},
            {text: "Hyper Text Makeup Language", correct: false},
            {text: "Hyper Tone Making Language", correct: false},
        ]
    },

    {
        question: "What does CSS stands for",
        answers:[
            {text: "Case Stand Sheet", correct: false},
            {text: "Cascaded Style Sheet", correct: true},
            {text: "Coded Styling Sheet", correct: false},
            {text: "Core Style Sheet", correct: false},
        ]
    },
];

let queElement=document.querySelector("#question");
let ansBtn=document.querySelector(".ans-btns");
let nxtBtn=document.querySelector("#next-btn");
let start=document.querySelector(".start");

let currentQueIndex=0;
let score=0;

function startQuiz(){
    currentQueIndex=0;
    score=0;
    nxtBtn.innerTexts="NEXT";
    showQue();
}

function showQue(){
    //reset the question and answer for the next query
    resetState();

    let currentQue=questions[currentQueIndex];
    let queNo= currentQueIndex +1;
    queElement.innerText=queNo + ". " + currentQue.question;
    
    currentQue.answers.forEach(answer=>{
        const button=document.createElement("button");
        button.innerText=answer.text;
        button.classList.add("btn");
        ansBtn.appendChild(button);
        button.addEventListener("click",selAns);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
    });
}


function resetState(){
    nxtBtn.style.display="none";
    while(ansBtn.firstChild){
        ansBtn.removeChild(ansBtn.firstChild);
    }
}

function selAns(event){
    const seltdBtn=event.target;
    const isCorrect=seltdBtn.dataset.correct==="true";
    if (isCorrect){
        seltdBtn.classList.add("correct");
        score++;
    }else{

        seltdBtn.classList.add("incorrect");
    }

    Array.from(ansBtn.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nxtBtn.style.display="block";
}

function showScore(){
    resetState();
    queElement.innerText=`You Scored ${score} out of ${questions.length}`;
    nxtBtn.innerText="Play Again!";
    nxtBtn.style.display="block";
}

function handleNxtBtn(){
    currentQueIndex++;
    if (currentQueIndex < questions.length){
        showQue();
    }else{
        showScore();
    }
}

nxtBtn.addEventListener("click",()=>{
    if(currentQueIndex < questions.length){
        handleNxtBtn();
    }else{
        startQuiz();
    }
})

startQuiz();